import express from 'express';
import usersService from '../../users/services/users.service';
import * as argon2 from 'argon2';
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);

class AuthMiddleware{
    async verifyUserGoogleId(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        //get gmail here
        const ticket = await client.verifyIdToken({
            idToken: req.body.googleId,
            audience: process.env.CLIENT_ID,
        });
        const { email } = ticket.getPayload();
        const user: any = await usersService.getUserByEmailWithGoogleId(
            email
        );
        if (user) {
            const googleHash = user.googleId;
            if (await argon2.verify(googleHash, req.body.googleId)) {
                req.body = {
                    userId: user._id,
                    email: user.email,
                    permissionFlags: user.permissionFlags,
                };
                return next();
            }
        }
        // Giving the same message in both cases
        // helps protect against cracking attempts:
        res.status(400).send({ errors: ['Invalid email and/or password'] });
    }
}

export default new AuthMiddleware();