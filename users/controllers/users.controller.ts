// we import express to add types to the request/response objects from our controller functions
import express from 'express';

// we import our newly created user services
import usersService from '../services/users.service';

// we import the argon2 library for password hashing
import argon2 from 'argon2';

// we use debug with a custom context as described in Part 1
import debug from 'debug';

import { PatchUserDto } from '../dto/patch.user.dto';
import authController from '../../auth/controllers/auth.controller';

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);

const log: debug.IDebugger = debug('app:users-controller');
class UsersController {
    async listUsers(req: express.Request, res: express.Response) {
        const users = await usersService.list(100, 0);
        res.status(200).send(users);
    }

    async getUserById(req: express.Request, res: express.Response) {
        const user = await usersService.readById(req.body.id);
        res.status(200).send(user);
    }

    async createUser(req: express.Request, res: express.Response) {
        //get the email
        const ticket = await client.verifyIdToken({
            idToken: req.body.googleId,
            audience: process.env.CLIENT_ID,
        });
        const { email, picture } = ticket.getPayload();
        req.body.email = email;
        req.body.picture = picture;
        const userId = await usersService.create(req.body);
        res.status(201).send({ id: userId });
    }

    async patch(req: express.Request, res: express.Response) {
        if (req.body.password) {
            req.body.password = await argon2.hash(req.body.password);
        }
        const existingUser = await usersService.patchById(req.body.id, req.body)
        if(existingUser){
          // @ts-expect-error
          req.body.email = existingUser.email;
          // @ts-expect-error
          req.body.userId = existingUser._id;
          // @ts-expect-error
          req.body.picture = existingUser.picture || ' ';
          // @ts-expect-error
          req.body.permissionFlags = existingUser.permissionFlags
        }
        authController.createJWT(req, res);
    }

    async put(req: express.Request, res: express.Response) {
        req.body.password = await argon2.hash(req.body.password);
        log(await usersService.putById(req.body.id, req.body));
        res.status(204).send();
    }

    async removeUser(req: express.Request, res: express.Response) {
        log(await usersService.deleteById(req.body.id));
        res.status(204).send();
    }

    async updatePermissionFlags(req: express.Request, res: express.Response) {
        const patchUserDto: PatchUserDto = {
            permissionFlags: parseInt(req.params.permissionFlags),
        };
        log(await usersService.patchById(req.body.id, patchUserDto));
        res.status(204).send();
    }
}

export default new UsersController();