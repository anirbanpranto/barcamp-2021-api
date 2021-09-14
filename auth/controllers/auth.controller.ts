import express from 'express';
import debug from 'debug';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const log: debug.IDebugger = debug('app:auth-controller');

class AuthController {
    async createJWT(req: express.Request, res: express.Response) {
        try {
            const tokenBody = {
                userId: req.body.userId,
                email: req.body.email,
                picture: req.body.picture,
                permissionFlags: req.body.permissionFlags,
            }
            // @ts-expect-error
            const jwtSecret: string = process.env.JWT_SECRET;
            const tokenExpirationInSeconds = 3600;
            const refreshId = req.body.userId + jwtSecret;
            const salt = crypto.createSecretKey(crypto.randomBytes(16));
            const hash = crypto
                .createHmac('sha512', salt)
                .update(refreshId)
                .digest('base64');
            req.body.refreshKey = salt.export();
            if(jwtSecret){
                const token = jwt.sign(tokenBody, jwtSecret, {
                    expiresIn: tokenExpirationInSeconds,
                });
                return res
                .status(201)
                .send({ accessToken: token, refreshToken: hash });
            }
            else{
                throw ".env JWT_SECRET undefined";
            }
        } catch (err) {
            log('createJWT error: %O', err);
            return res.status(500).send();
        }
    }

    async checkAuth(req: express.Request, res: express.Response) {
      return res.status(200).send();
    }
}

export default new AuthController();