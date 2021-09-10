import express from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { Jwt } from '../../common/types/jwt';
import usersService from '../../users/services/users.service';

class JwtMiddleware {
    verifyRefreshBodyField(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        if (req.body && req.body.refreshToken) {
            return next();
        } else {
            return res
                .status(400)
                .send({ errors: ['Missing required field: refreshToken'] });
        }
    }

    async validRefreshNeeded(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const user: any = await usersService.getUserByEmail(
            res.locals.jwt.email
        );
        const salt = crypto.createSecretKey(
            Buffer.from(res.locals.jwt.refreshKey.data)
        );
        const jwtSecret = process.env.JWT_SECRET;
        if(jwtSecret){
            const hash = crypto
            .createHmac('sha512', salt)
            .update(res.locals.jwt.userId + jwtSecret)
            .digest('base64');
            if (hash === req.body.refreshToken) {
                req.body = {
                    userId: user._id,
                    email: user.email,
                    permissionFlags: user.permissionFlags,
                };
                return next();
            } else {
                return res.status(400).send({ errors: ['Invalid refresh token'] });
            }
        }
    }

    validJWTNeeded(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        if (req.headers['authorization']) {
            try {
                const authorization = req.headers['authorization'].split(' ');
                if (authorization[0] !== 'Bearer') {
                    return res.status(401).send();
                } else {
                    const jwtSecret = process.env.JWT_SECRET;
                    if(jwtSecret){
                        res.locals.jwt = jwt.verify(
                            authorization[1],
                            jwtSecret
                        ) as Jwt;
                        next();
                    }
                    else{
                        throw "JWT_SECRET .env undefined"
                    }
                }
            } catch (err) {
                console.log(err);
                return res.status(403).send();
            }
        } else {
            return res.status(401).send();
        }
    }

    async validateParamUserIdIsUser(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ){
      try {
        let token = req.headers['Authorization'] || req.headers.authorization;
        // @ts-expect-error
        token = token.split(' ')[1];

        // @ts-expect-error
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
          if (err) {
            return res
              .status(401)
              .json({ status: false, error: 'Token is not valid' });
          }

          // @ts-expect-error
          if (decoded.userId !== req.params.userId) {
            return res
              .status(401)
              .json({ status: false, error: "You don't have access to this user" });
          }

          // @ts-expect-error
          req.decoded = decoded;
          next();
        });
      } catch (error) {
        return res.status(500).send();
      }

    }
}

export default new JwtMiddleware();