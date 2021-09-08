"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_routes_config_1 = require("../common/common.routes.config");
const topics_controller_1 = __importDefault(require("./controllers/topics.controller"));
const topics_middleware_1 = __importDefault(require("./middleware/topics.middleware"));
const body_validation_middleware_1 = __importDefault(require("../common/middleware/body.validation.middleware"));
const express_validator_1 = require("express-validator");
const jwt_middleware_1 = __importDefault(require("../auth/middleware/jwt.middleware"));
const common_permission_middleware_1 = __importDefault(require("../common/middleware/common.permission.middleware"));
const common_permissionflag_enum_1 = require("../common/middleware/common.permissionflag.enum");
class TopicsRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, 'TopicsRoutes');
    }
    configureRoutes() {
        this.app
            .route(`/topics`)
            .get(jwt_middleware_1.default.validJWTNeeded, common_permission_middleware_1.default.permissionFlagRequired(common_permissionflag_enum_1.PermissionFlag.USER_PERMISSION), topics_controller_1.default.listTopics)
            .post(express_validator_1.body('name').isString(), express_validator_1.body('user').isString(), express_validator_1.body('theme').isString(), express_validator_1.body('description').isString(), express_validator_1.body('contact').isString(), express_validator_1.body('institute').isString().optional(), express_validator_1.body('company').isString().optional(), express_validator_1.body('self_description').isString(), body_validation_middleware_1.default.verifyBodyFieldsErrors, topics_middleware_1.default.validateUserDoesntHaveTopic, topics_controller_1.default.createTopic);
        this.app.param(`topicId`, topics_middleware_1.default.extractTopicId);
        this.app
            .route(`/topics/:topicId`)
            .all(topics_middleware_1.default.validateTopicExists, jwt_middleware_1.default.validJWTNeeded)
            .get(topics_controller_1.default.getTopicById)
            .delete(topics_controller_1.default.removeTopic);
        this.app.put(`/topics/:topicId`, [
            express_validator_1.body('name').isString(),
            express_validator_1.body('user').isString(),
            express_validator_1.body('theme').isString(),
            express_validator_1.body('description').isString(),
            express_validator_1.body('contact').isString(),
            express_validator_1.body('institute').isString().optional(),
            express_validator_1.body('company').isString().optional(),
            express_validator_1.body('self_description').isString(),
            body_validation_middleware_1.default.verifyBodyFieldsErrors,
            common_permission_middleware_1.default.permissionFlagRequired(common_permissionflag_enum_1.PermissionFlag.USER_PERMISSION),
            topics_controller_1.default.put
        ]);
        this.app.patch(`/topics/:topicId`, [
            express_validator_1.body('name').isString().optional(),
            express_validator_1.body('user').isString().optional(),
            express_validator_1.body('theme').isString().optional(),
            express_validator_1.body('description').isString().optional(),
            express_validator_1.body('contact').isString().optional(),
            express_validator_1.body('institute').isString().optional(),
            express_validator_1.body('company').isString().optional(),
            express_validator_1.body('self_description').isString().optional(),
            body_validation_middleware_1.default.verifyBodyFieldsErrors,
            common_permission_middleware_1.default.permissionFlagRequired(common_permissionflag_enum_1.PermissionFlag.USER_PERMISSION),
            topics_controller_1.default.patch
        ]);
        return this.app;
    }
}
exports.TopicsRoutes = TopicsRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9waWNzLnJvdXRlcy5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90b3BpY3MvdG9waWNzLnJvdXRlcy5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx5RUFBb0U7QUFDcEUsd0ZBQStEO0FBQy9ELHVGQUE4RDtBQUM5RCxpSEFBdUY7QUFDdkYseURBQXlDO0FBRXpDLHVGQUE4RDtBQUM5RCxxSEFBcUY7QUFDckYsZ0dBQWlGO0FBRWpGLE1BQWEsWUFBYSxTQUFRLHlDQUFrQjtJQUNoRCxZQUFZLEdBQXdCO1FBQ2hDLEtBQUssQ0FBQyxHQUFHLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVELGVBQWU7UUFDWCxJQUFJLENBQUMsR0FBRzthQUNILEtBQUssQ0FBQyxTQUFTLENBQUM7YUFDaEIsR0FBRyxDQUNBLHdCQUFhLENBQUMsY0FBYyxFQUM1QixzQ0FBb0IsQ0FBQyxzQkFBc0IsQ0FDdkMsMkNBQWMsQ0FBQyxlQUFlLENBQ2pDLEVBQ0QsMkJBQWdCLENBQUMsVUFBVSxDQUM5QjthQUNBLElBQUksQ0FDRCx3QkFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUN2Qix3QkFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUN2Qix3QkFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUN4Qix3QkFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUM5Qix3QkFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUMxQix3QkFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUN2Qyx3QkFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUNyQyx3QkFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsUUFBUSxFQUFFLEVBQ25DLG9DQUF3QixD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