import { CommonRoutesConfig } from '../common/common.routes.config';
import VotesController from './controllers/votes.controller';
import VotesMiddleware from './middleware/votes.middleware';
import BodyValidationMiddleware from '../common/middleware/body.validation.middleware';
import { body } from 'express-validator';
import express from 'express';
import jwtMiddleware from '../auth/middleware/jwt.middleware';

export class VotesRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'UsersRoutes');
  }

  configureRoutes(): express.Application{
    this.app
      .route('/votes')
      .get(jwtMiddleware.validJWTNeeded, VotesController.listVotes)
      .post(
        body('userId').isLength({min: 1}).withMessage('Must include userId'), 
        body('topicId').isLength({min: 1}).withMessage('Must include topicId'), 
        BodyValidationMiddleware.verifyBodyFieldsErrors,  
        jwtMiddleware.validJWTNeeded, 
        VotesMiddleware.validateUserExists,  
        VotesController.createVote
      );

    this.app.param('userId', VotesMiddleware.validateUserExists);
    this.app
      .route('/votes/:userId')
      .get(jwtMiddleware.validJWTNeeded, VotesController.getVote)

    return this.app;
  }

}