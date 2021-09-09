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
class TopicsRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, 'TopicsRoutes');
    }
    configureRoutes() {
        this.app
            .route(`/topics`)
            .get(jwt_middleware_1.default.validJWTNeeded, common_permission_middleware_1.default.permissionFlagRequired(common_permissionflag_enum_1.PermissionFlag.USER_PERMISSION), topics_controller_1.default.listTopics)
            .post((0, express_validator_1.body)('name').isString(), (0, express_validator_1.body)('user').isString(), (0, express_validator_1.body)('theme').isString().matches(/^(non-tech|tech|nonsense)$/).withMessage('Topic theme has to be either non-tech, tech or nonsense'), (0, express_validator_1.body)('description').isString(), (0, express_validator_1.body)('contact').isString(), (0, express_validator_1.body)('institute').isString().optional(), (0, express_validator_1.body)('company').isString().optional(), (0, express_validator_1.body)('self_description').isString(), body_validation_middleware_1.default.verifyBodyFieldsErrors, topics_middleware_1.default.validateUserExists, topics_middleware_1.default.validateUserDoesntHaveTopic, topics_controller_1.default.createTopic);
        this.app.param(`topicId`, topics_middleware_1.default.extractTopicId);
        this.app
            .route(`/topics/:topicId`)
            .all(topics_middleware_1.default.validateTopicExists, jwt_middleware_1.default.validJWTNeeded)
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
            common_permission_middleware_1.default.permissionFlagRequired(common_permissionflag_enum_1.PermissionFlag.USER_PERMISSION),
            topics_controller_1.default.patch
        ]);
        return this.app;
    }
}
exports.TopicsRoutes = TopicsRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9waWNzLnJvdXRlcy5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90b3BpY3MvdG9waWNzLnJvdXRlcy5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEseUVBQW9FO0FBQ3BFLHdGQUErRDtBQUMvRCx1RkFBOEQ7QUFDOUQsaUhBQXVGO0FBQ3ZGLHlEQUF5QztBQUV6Qyx1RkFBOEQ7QUFDOUQscUhBQXFGO0FBQ3JGLGdHQUFpRjtBQUVqRixNQUFhLFlBQWEsU0FBUSx5Q0FBa0I7SUFDaEQsWUFBWSxHQUF3QjtRQUNoQyxLQUFLLENBQUMsR0FBRyxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxlQUFlO1FBQ1gsSUFBSSxDQUFDLEdBQUc7YUFDSCxLQUFLLENBQUMsU0FBUyxDQUFDO2FBQ2hCLEdBQUcsQ0FDQSx3QkFBYSxDQUFDLGNBQWMsRUFDNUIsc0NBQW9CLENBQUMsc0JBQXNCLENBQ3ZDLDJDQUFjLENBQUMsZUFBZSxDQUNqQyxFQUNELDJCQUFnQixDQUFDLFVBQVUsQ0FDOUI7YUFDQSxJQUFJLENBQ0QsSUFBQSx3QkFBSSxFQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUN2QixJQUFBLHdCQUFJLEVBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQ3ZCLElBQUEsd0JBQUksRUFBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxXQUFXLENBQUMseURBQXlELENBQUMsRUFDckksSUFBQSx3QkFBSSxFQUFDLGFBQWEsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUM5QixJQUFBLHdCQUFJLEVBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQzFCLElBQUEsd0JBQUksRUFBQyxXQUFXLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFDdkMsSUFBQSx3QkFBSSxFQUFDLFNBQVMsQ0FB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