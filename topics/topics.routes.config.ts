import { CommonRoutesConfig } from '../common/common.routes.config';
import TopicsController from './controllers/topics.controller';
import TopicsMiddleware from './middleware/topics.middleware';
import BodyValidationMiddleware from '../common/middleware/body.validation.middleware';
import { body } from 'express-validator';
import express from 'express';
import jwtMiddleware from '../auth/middleware/jwt.middleware';
import permissionMiddleware from '../common/middleware/common.permission.middleware';
import { PermissionFlag } from '../common/middleware/common.permissionflag.enum';

export class TopicsRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'TopicsRoutes');
    }

    configureRoutes(): express.Application {
        this.app
            .route(`/topics`)
            .get(
                jwtMiddleware.validJWTNeeded,
                permissionMiddleware.permissionFlagRequired(
                    PermissionFlag.USER_PERMISSION
                ),
                TopicsController.listTopics
            )
            .post(
                body('name').isString(),
                body('user').isString(),
                body('theme').isString().matches(/^(non-tech|tech|nonsense)$/).withMessage('Topic theme has to be either non-tech, tech or nonsense'),
                body('description').isString(),
                body('self_description').isString(),
                body('contact').isString().optional(),
                body('institute').isString().optional(),
                body('company').isString().optional(),
                BodyValidationMiddleware.verifyBodyFieldsErrors,
                jwtMiddleware.validJWTNeeded,
                permissionMiddleware.permissionFlagRequired(
                  PermissionFlag.USER_PERMISSION
                ),
                TopicsMiddleware.validateUserIsOwner,
                TopicsMiddleware.validateUserExists,
                TopicsMiddleware.validateUserDoesntHaveTopic,
                TopicsController.createTopic
            );

        this.app.param(`topicId`, TopicsMiddleware.extractTopicId);
        this.app
            .route(`/topics/:topicId`)
            .all(
                TopicsMiddleware.validateTopicExists,
                jwtMiddleware.validJWTNeeded,
                permissionMiddleware.permissionFlagRequired(
                  PermissionFlag.USER_PERMISSION
                ),
            )
            .get(TopicsController.getTopicById)
            .delete(TopicsController.removeTopic);

        this.app.put(`/topics/:topicId`, [
            body('name').isString(),
            body('user').isString(),
            body('theme').isString(),
            body('description').isString(),
            body('contact').isString(),
            body('institute').isString().optional(),
            body('company').isString().optional(),
            body('self_description').isString(),
            BodyValidationMiddleware.verifyBodyFieldsErrors,
            permissionMiddleware.permissionFlagRequired(
                PermissionFlag.USER_PERMISSION
            ),
            TopicsController.put
        ]);

        this.app.patch(`/topics/:topicId`, [
            body('name').isString().optional(),
            body('user').isString().optional(),
            body('theme').isString().optional(),
            body('description').isString().optional(),
            body('contact').isString().optional(),
            body('institute').isString().optional(),
            body('company').isString().optional(),
            body('self_description').isString().optional(),
            BodyValidationMiddleware.verifyBodyFieldsErrors,
            TopicsController.patch
        ]);

        this.app.get(
          `/topicsByUser/:userId`, 
          jwtMiddleware.validJWTNeeded, 
          permissionMiddleware.permissionFlagRequired(
            PermissionFlag.USER_PERMISSION
          ),
          jwtMiddleware.validateParamUserIdIsUser,
          TopicsMiddleware.extractUserId, 
          TopicsController.getTopicByUser
        );

        return this.app;
    }
}