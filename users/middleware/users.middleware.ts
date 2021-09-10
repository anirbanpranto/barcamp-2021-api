import express from 'express';
import userService from '../services/users.service';
import debug from 'debug';
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);

const log: debug.IDebugger = debug('app:users-controller');
class UsersMiddleware {
    
    async validateSameEmailDoesntExist(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
      try {
        const ticket = await client.verifyIdToken({
          idToken: req.body.googleId,
          audience: process.env.CLIENT_ID,
        });
        const { email } = ticket.getPayload();
        const user = await userService.getUserByEmail(email);
        if (user) {
            res.status(400).send({ error: `User email already exists` });
        } else {
            next();
        }
      } catch (error) {
          log(error);
          res.status(500).send({ error: `googleId Incorrect` });
      }
    }

    async validateSameEmailBelongToSameUser(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        if (res.locals.user._id === req.params.userId) {
            next();
        } else {
            res.status(400).send({ error: `Invalid email` });
        }
    }

    validatePatchEmail = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        if (req.body.email) {
            log('Validating email', req.body.email);
    
            this.validateSameEmailBelongToSameUser(req, res, next);
        } else {
            next();
        }
    };
    
    async validateUserExists(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const user = await userService.readById(req.params.userId);
        if (user) {
            res.locals.user = user;
            next();
        } else {
            res.status(404).send({
                error: `User ${req.params.userId} not found!`,
            });
        }
    }

    async extractUserId(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        req.body.id = req.params.userId;
        next();
    }

    async extractUserInfo(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        try {        
          const ticket = await client.verifyIdToken({
            idToken: req.body.googleId,
            audience: process.env.CLIENT_ID,
          });
          const { email } = await ticket.getPayload();
          // console.log(ticket.getPayload());
          const user = await userService.getUserByEmail(email);
          //console.log(user);
          // @ts-expect-error
          req.body.email = user.email;
          // @ts-expect-error
          req.body.userId = user._id;
          // @ts-expect-error
          req.body.permissionFlags = user.permissionFlags
          next();
          
        } catch (error) {
          log(error);
          res.status(500).send({ error: `Token invalid` });
        }
    }

    async createAccountIfNotExists(
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) {
      try {        
        const ticket = await client.verifyIdToken({
          idToken: req.body.googleId,
          audience: process.env.CLIENT_ID,
        });
        const { email, picture } = await ticket.getPayload();
        const user = await userService.getUserByEmail(email);

        if (!user) {
          req.body.email = email;
          req.body.picture = picture;
          const newUser = await userService.create(req.body);

          if(newUser) {
            // @ts-expect-error
            req.body.email = newUser.email;
            // @ts-expect-error
            req.body.userId = newUser._id;
            // @ts-expect-error
            req.body.picture = user.picture || '';
            // @ts-expect-error
            req.body.permissionFlags = newUser.permissionFlags
          }else {
            res.status(404).send({ error: `User does not exists, auto sign up failed` });
          }
        }else{
          // @ts-expect-error
          req.body.email = user.email;
          req.body.userId = user._id;
          // @ts-expect-error
          req.body.picture = user.picture || '';
          // @ts-expect-error
          req.body.permissionFlags = user.permissionFlags
        }

        next();
      } catch (error) {
        log(error);
        res.status(500).send({ error: `Login failure or token invalid` });
      }
    }
}

export default new UsersMiddleware();