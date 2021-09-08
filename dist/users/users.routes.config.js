"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_routes_config_1 = require("../common/common.routes.config");
const users_controller_1 = __importDefault(require("./controllers/users.controller"));
const users_middleware_1 = __importDefault(require("./middleware/users.middleware"));
const body_validation_middleware_1 = __importDefault(require("../common/middleware/body.validation.middleware"));
const express_validator_1 = require("express-validator");
const jwt_middleware_1 = __importDefault(require("../auth/middleware/jwt.middleware"));
const common_permission_middleware_1 = __importDefault(require("../common/middleware/common.permission.middleware"));
const common_permissionflag_enum_1 = require("../common/middleware/common.permissionflag.enum");
class UsersRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, 'UsersRoutes');
    }
    configureRoutes() {
        this.app
            .route(`/users`)
            .get(
        // jwtMiddleware.validJWTNeeded,
        // permissionMiddleware.permissionFlagRequired(
        //     PermissionFlag.ADMIN_PERMISSION
        // ),
        users_controller_1.default.listUsers)
            .post(express_validator_1.body('googleId').isString(), body_validation_middleware_1.default.verifyBodyFieldsErrors, users_middleware_1.default.validateSameEmailDoesntExist, users_controller_1.default.createUser);
        this.app.param(`userId`, users_middleware_1.default.extractUserId);
        this.app
            .route(`/users/:userId`)
            .all(users_middleware_1.default.validateUserExists, jwt_middleware_1.default.validJWTNeeded, common_permission_middleware_1.default.onlySameUserOrAdminCanDoThisAction)
            .get(users_controller_1.default.getUserById)
            .delete(users_controller_1.default.removeUser);
        this.app.put(`/users/:userId`, [
            express_validator_1.body('email').isEmail(),
            express_validator_1.body('firstName').isString(),
            express_validator_1.body('lastName').isString(),
            express_validator_1.body('permissionFlags').isInt(),
            body_validation_middleware_1.default.verifyBodyFieldsErrors,
            users_middleware_1.default.validateSameEmailBelongToSameUser,
            common_permission_middleware_1.default.userCantChangePermission,
            users_controller_1.default.put
        ]);
        this.app.patch(`/users/:userId`, [
            express_validator_1.body('email').isEmail().optional(),
            express_validator_1.body('firstName').isString().optional(),
            express_validator_1.body('permissionFlags').isInt().optional(),
            body_validation_middleware_1.default.verifyBodyFieldsErrors,
            users_middleware_1.default.validatePatchEmail,
            common_permission_middleware_1.default.userCantChangePermission,
            users_controller_1.default.patch,
        ]);
        this.app.put(`/users/:userId/permissionFlags/:permissionFlags`, [
            jwt_middleware_1.default.validJWTNeeded,
            common_permission_middleware_1.default.onlySameUserOrAdminCanDoThisAction,
            // Note: The above two pieces of middleware are needed despite
            // the reference to them in the .all() call, because that only covers
            // /users/:userId, not anything beneath it in the hierarchy
            common_permission_middleware_1.default.permissionFlagRequired(common_permissionflag_enum_1.PermissionFlag.USER_PERMISSION),
            users_controller_1.default.updatePermissionFlags,
        ]);
        return this.app;
    }
}
exports.UsersRoutes = UsersRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMucm91dGVzLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3VzZXJzL3VzZXJzLnJvdXRlcy5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx5RUFBb0U7QUFDcEUsc0ZBQTZEO0FBQzdELHFGQUE0RDtBQUM1RCxpSEFBdUY7QUFDdkYseURBQXlDO0FBRXpDLHVGQUE4RDtBQUM5RCxxSEFBcUY7QUFDckYsZ0dBQWlGO0FBRWpGLE1BQWEsV0FBWSxTQUFRLHlDQUFrQjtJQUMvQyxZQUFZLEdBQXdCO1FBQ2hDLEtBQUssQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVELGVBQWU7UUFDWCxJQUFJLENBQUMsR0FBRzthQUNILEtBQUssQ0FBQyxRQUFRLENBQUM7YUFDZixHQUFHO1FBQ0EsZ0NBQWdDO1FBQ2hDLCtDQUErQztRQUMvQyxzQ0FBc0M7UUFDdEMsS0FBSztRQUNMLDBCQUFlLENBQUMsU0FBUyxDQUM1QjthQUNBLElBQUksQ0FDRCx3QkFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUMzQixvQ0FBd0IsQ0FBQyxzQkFBc0IsRUFDL0MsMEJBQWUsQ0FBQyw0QkFBNEIsRUFDNUMsMEJBQWUsQ0FBQyxVQUFVLENBQzdCLENBQUM7UUFFTixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsMEJBQWUsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsR0FBRzthQUNILEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQzthQUN2QixHQUFHLENBQ0EsMEJBQWUsQ0FBQyxrQkFBa0IsRUFDbEMsd0JBQWEsQ0FBQyxjQUFjLEVBQzVCLHNDQUFvQixDQUFDLGtDQUFrQyxDQUMxRDthQUNBLEdBQUcsQ0FBQywwQkFBZSxDQUFDLFdBQVcsQ0FBQzthQUNoQyxNQUFNLENBQUMsMEJBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUV4QyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRTtZQUMzQix3QkFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRTtZQUN2Qix3QkFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFFBQVEsRUFBRTtZQUM1Qix3QkFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsRUFBRTtZQUMzQix3QkFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsS0FBSyxFQUFFO1lBQy9CLG9DQUF3QixDQUFDLHNCQUFzQjtZQUMvQywwQkFBZSxDQUFDLGlDQUFpQztZQUNqRCxzQ0FBb0IsQ0FBQyx3QkFBd0I7WUFDN0MsMEJBQWUsQ0FBQyxHQUFHO1NBQ3RCLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLGdCQUFnQixFQUFFO1lBQzdCLHdCQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFO1lBQ2xDLHdCQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFO1lBQ3ZDLHdCQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxRQUFRLEVBQUU7WUFDMUMsb0NBQXdCLENBQUMsc0JBQXNCO1lBQy9DLDBCQUFlLENBQUMsa0JBQWtCO1lBQ2xDLHNDQUFvQixDQUFDLHdCQUF3QjtZQUM3QywwQkFBZSxDQUFDLEtBQUs7U0FDeEIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsaURBQWlELEVBQUU7WUFDNUQsd0JBQWEsQ0FBQyxjQUFjO1lBQzVCLHNDQUFvQixDQUFDLGtDQUFrQztZQUV2RCw4REFBOEQ7WUFDOUQscUVBQXFFO1lBQ3JFLDJEQUEyRDtZQUUzRCxzQ0FBb0IsQ0FBQyxzQkFBc0IsQ0FDdkMsMkNBQWMsQ0FBQyxlQUFlLENBQ2pDO1lBQ0QsMEJBQWUsQ0FBQyxxQkFBcUI7U0FDeEMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ3BCLENBQUM7Q0FDSjtBQXRFRCxrQ0FzRUMifQ==