import express from 'express';
import usersService from '../../users/services/users.service';
import * as argon2 from 'argon2';
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);

class AuthMiddleware{
    //no middleware
}

export default new AuthMiddleware();