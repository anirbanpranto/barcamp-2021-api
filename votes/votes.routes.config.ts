import { CommonRoutesConfig } from '../common/common.routes.config';
import VotesController from './controllers/votes.controller';
import VotesMiddleware from './middleware/votes.middleware';
import BodyValidationMiddleware from '../common/middleware/body.validation.middleware';
import { body } from 'express-validator';
import express from 'express';
import jwtMiddleware from '../auth/middleware/jwt.middleware';
import votesMiddleware from './middleware/votes.middleware';
import permissionMiddleware from '../common/middleware/common.permission.middleware';
import { PermissionFlag } from '../common/middleware/common.permissionflag.enum';
import commonDateMiddleware from '../common/middleware/common.date.middleware';

export class VotesRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'UsersRoutes');
  }

  configureRoutes(): express.Application{    
    this.app
      .route('/votes')
      .get(
        jwtMiddleware.validJWTNeeded,         
        permissionMiddleware.permissionFlagRequired(
          PermissionFlag.USER_PERMISSION
        ), 
        VotesController.listVotes
      )
      .post(
        body('userId').isLength({min: 1}).withMessage('Must include userId'), 
        body('topicId').isArray({ min: 5, max: 5 }).withMessage('Must propose exactly 5 topics'),
        body('vote').exists().matches(/^(topic)$/).withMessage('Vote has to be topic'),
        BodyValidationMiddleware.verifyBodyFieldsErrors,  
        jwtMiddleware.validJWTNeeded,
        commonDateMiddleware.validateDateRange('proposeTopic'),
        permissionMiddleware.permissionFlagRequired(
          PermissionFlag.USER_PERMISSION
        ),
        VotesMiddleware.validateUserExistsWithBody,
        VotesMiddleware.validateUserIsOwner,
        VotesMiddleware.validateVoteArrDuplicates,
        VotesMiddleware.validateAlreadyVoted,
        VotesMiddleware.validateTopicExists,
        VotesController.createVote
      );

    this.app
      .route('/votesByTopicId/:topicId')
      .get(
        VotesMiddleware.extractTopicId,
        jwtMiddleware.validJWTNeeded,
        permissionMiddleware.permissionFlagRequired(
          PermissionFlag.USER_PERMISSION
        ),
        VotesMiddleware.validateTopicExistsInVote,
        VotesController.getVotesByTopicId
      )

    this.app
      .route('/votes/leaderboard')
      .get(
        jwtMiddleware.validJWTNeeded,
        permissionMiddleware.permissionFlagRequired(
          PermissionFlag.USER_PERMISSION
        ),
        VotesController.getLeaderboard
      )

    this.app.param('userId', VotesMiddleware.extractUserId);
    this.app
      .route('/votes/:userId')
      .get(
        jwtMiddleware.validJWTNeeded,
        permissionMiddleware.permissionFlagRequired(
          PermissionFlag.USER_PERMISSION
        ),
        jwtMiddleware.validateParamUserIdIsUser,
        votesMiddleware.validateUserExistsWithParam,
        VotesController.getVote
      )
      .delete(
        jwtMiddleware.validJWTNeeded,
        commonDateMiddleware.validateDateRange('proposeTopic'),
        permissionMiddleware.permissionFlagRequired(
          PermissionFlag.USER_PERMISSION
        ),
        jwtMiddleware.validateParamUserIdIsUser,
        votesMiddleware.validateUserExistsWithParam,
        VotesController.deleteVoteByUserId
      )

    return this.app;
  }

}