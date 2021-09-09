import { CommonRoutesConfig } from '../common/common.routes.config';
import VotesController from './controllers/votes.controller';
import VotesMiddleware from './middleware/votes.middleware';
import BodyValidationMiddleware from '../common/middleware/body.validation.middleware';
import { body } from 'express-validator';
import express from 'express';
import jwtMiddleware from '../auth/middleware/jwt.middleware';
import votesMiddleware from './middleware/votes.middleware';

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
        body('topicId').isArray({ min: 5, max: 5 }).withMessage('Must propose exactly 5 topics'),
        body('vote').exists().matches(/^(speaker|topic)$/).withMessage('Vote needs to exist and value is either speaker or topic'),
        BodyValidationMiddleware.verifyBodyFieldsErrors,  
        jwtMiddleware.validJWTNeeded, 
        VotesMiddleware.validateUserExists,  
        VotesMiddleware.validateVoteArrDuplicates,
        VotesMiddleware.validateAlreadyVoted,
        VotesMiddleware.validateTopicExists,
        VotesController.createVote
      );

    this.app.param('userId', VotesMiddleware.extractUserId);
    this.app
      .route('/votes/:userId')
      .get(
        jwtMiddleware.validJWTNeeded,
        votesMiddleware.validateUserExists,
        VotesController.getVote
      )

    return this.app;
  }

}