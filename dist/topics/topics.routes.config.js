"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopicsRoutes = void 0;
const common_routes_config_1 = require("../common/common.routes.config");
const topics_controller_1 = __importDefault(require("./controllers/topics.controller"));
const topics_middleware_1 = __importDefault(require("./middleware/topics.middleware"));
const body_validation_middleware_1 = __importDefault(require("../common/middleware/body.validation.middleware"));
const express_validator_1 = require("express-validator");
const jwt_middleware_1 = __importDefault(require("../auth/middleware/jwt.middleware"));
const common_permission_middleware_1 = __importDefault(require("../common/middleware/common.permission.middleware"));
const common_permissionflag_enum_1 = require("../common/middleware/common.permissionflag.enum");
const common_date_middleware_1 = __importDefault(require("../common/middleware/common.date.middleware"));
class TopicsRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, 'TopicsRoutes');
    }
    configureRoutes() {
        this.app
            .route(`/topics`)
            .get(common_date_middleware_1.default.validateDateRange('proposeTopic'), jwt_middleware_1.default.validJWTNeeded, common_permission_middleware_1.default.permissionFlagRequired(common_permissionflag_enum_1.PermissionFlag.USER_PERMISSION), topics_controller_1.default.listTopics)
            .post((0, express_validator_1.body)('name').isString(), (0, express_validator_1.body)('user').isString(), (0, express_validator_1.body)('theme').isString().matches(/^(non-tech|tech|nonsense)$/).withMessage('Topic theme has to be either non-tech, tech or nonsense'), (0, express_validator_1.body)('description').isString(), (0, express_validator_1.body)('self_description').isString(), (0, express_validator_1.body)('contact').isString().optional(), (0, express_validator_1.body)('institute').isString().optional(), (0, express_validator_1.body)('company').isString().optional(), body_validation_middleware_1.default.verifyBodyFieldsErrors, jwt_middleware_1.default.validJWTNeeded, common_permission_middleware_1.default.permissionFlagRequired(common_permissionflag_enum_1.PermissionFlag.USER_PERMISSION), topics_middleware_1.default.validateUserIsOwner, topics_middleware_1.default.validateUserExists, topics_middleware_1.default.validateUserDoesntHaveTopic, topics_controller_1.default.createTopic);
        this.app.param(`topicId`, topics_middleware_1.default.extractTopicId);
        this.app
            .route(`/topics/:topicId`)
            .all(topics_middleware_1.default.validateTopicExists, jwt_middleware_1.default.validJWTNeeded, common_permission_middleware_1.default.permissionFlagRequired(common_permissionflag_enum_1.PermissionFlag.USER_PERMISSION))
            .get(topics_controller_1.default.getTopicById)
            .delete(topics_controller_1.default.removeTopic);
        this.app.put(`/topics/:topicId`, [
            (0, express_validator_1.body)('name').isString(),
            (0, express_validator_1.body)('user').isString(),
            (0, express_validator_1.body)('theme').isString(),
            (0, express_validator_1.body)('description').isString(),
            (0, express_validator_1.body)('contact').isString(),
            (0, express_validator_1.body)('institute').isString().optional(),
            (0, express_validator_1.body)('company').isString().optional(),
            (0, express_validator_1.body)('self_description').isString(),
            body_validation_middleware_1.default.verifyBodyFieldsErrors,
            common_permission_middleware_1.default.permissionFlagRequired(common_permissionflag_enum_1.PermissionFlag.USER_PERMISSION),
            topics_controller_1.default.put
        ]);
        this.app.patch(`/topics/:topicId`, [
            (0, express_validator_1.body)('name').isString().optional(),
            (0, express_validator_1.body)('user').isString().optional(),
            (0, express_validator_1.body)('theme').isString().optional(),
            (0, express_validator_1.body)('description').isString().optional(),
            (0, express_validator_1.body)('contact').isString().optional(),
            (0, express_validator_1.body)('institute').isString().optional(),
            (0, express_validator_1.body)('company').isString().optional(),
            (0, express_validator_1.body)('self_description').isString().optional(),
            body_validation_middleware_1.default.verifyBodyFieldsErrors,
            topics_controller_1.default.patch
        ]);
        this.app.get(`/topicsByUser/:userId`, jwt_middleware_1.default.validJWTNeeded, common_permission_middleware_1.default.permissionFlagRequired(common_permissionflag_enum_1.PermissionFlag.USER_PERMISSION), jwt_middleware_1.default.validateParamUserIdIsUser, topics_middleware_1.default.extractUserId, topics_controller_1.default.getTopicByUser);
        return this.app;
    }
}
exports.TopicsRoutes = TopicsRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9waWNzLnJvdXRlcy5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90b3BpY3MvdG9waWNzLnJvdXRlcy5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEseUVBQW9FO0FBQ3BFLHdGQUErRDtBQUMvRCx1RkFBOEQ7QUFDOUQsaUhBQXVGO0FBQ3ZGLHlEQUF5QztBQUV6Qyx1RkFBOEQ7QUFDOUQscUhBQXFGO0FBQ3JGLGdHQUFpRjtBQUNqRix5R0FBeUU7QUFFekUsTUFBYSxZQUFhLFNBQVEseUNBQWtCO0lBQ2hELFlBQVksR0FBd0I7UUFDaEMsS0FBSyxDQUFDLEdBQUcsRUFBRSxjQUFjLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsZUFBZTtRQUNYLElBQUksQ0FBQyxHQUFHO2FBQ0gsS0FBSyxDQUFDLFNBQVMsQ0FBQzthQUNoQixHQUFHLENBQ0EsZ0NBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsRUFDaEQsd0JBQWEsQ0FBQyxjQUFjLEVBQzVCLHNDQUFvQixDQUFDLHNCQUFzQixDQUN2QywyQ0FBYyxDQUFDLGVBQWUsQ0FDakMsRUFDRCwyQkFBZ0IsQ0FBQyxVQUFVLENBQzlCO2FBQ0EsSUFBSSxDQUNELElBQUEsd0JBQUksRUFBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFDdkIsSUFBQSx3QkFBSSxFQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUN2QixJQUFBLHdCQUFJLEVBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxDQUFDLDRCQUE0QixDQUFDLENBQUMsV0FBVyxDQUFDLHlEQUF5RCxDQUFDLEVBQ3JJLElBQUEsd0JBQUksRUFBQyxhQUFhLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFDOUIsSUFBQSx3QkFBSSxFQUFDLGtCQUFrQixDQUFDLENBQUMsUUFBUSxFQUFFLEVBQ25DLElBQUEsd0JBQUksRUFBQyxTQUFTLENBQUMsQ0FBQyxR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