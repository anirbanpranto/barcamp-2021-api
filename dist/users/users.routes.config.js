"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRoutes = void 0;
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
            .get(jwt_middleware_1.default.validJWTNeeded, common_permission_middleware_1.default.permissionFlagRequired(common_permissionflag_enum_1.PermissionFlag.ADMIN_PERMISSION), users_controller_1.default.listUsers)
            .post((0, express_validator_1.body)('googleId').isString(), body_validation_middleware_1.default.verifyBodyFieldsErrors, users_middleware_1.default.validateSameEmailDoesntExist, users_controller_1.default.createUser);
        this.app.param(`userId`, users_middleware_1.default.extractUserId);
        this.app
            .route(`/users/:userId`)
            .all(users_middleware_1.default.validateUserExists, jwt_middleware_1.default.validJWTNeeded, common_permission_middleware_1.default.permissionFlagRequired(common_permissionflag_enum_1.PermissionFlag.BASIC_PERMISSION), common_permission_middleware_1.default.onlySameUserOrAdminCanDoThisAction)
            .get(users_controller_1.default.getUserById)
            .delete(users_controller_1.default.removeUser);
        this.app.put(`/users/:userId`, [
            (0, express_validator_1.body)('email').isEmail(),
            (0, express_validator_1.body)('firstName').isString(),
            (0, express_validator_1.body)('lastName').isString(),
            (0, express_validator_1.body)('permissionFlags').isInt(),
            body_validation_middleware_1.default.verifyBodyFieldsErrors,
            users_middleware_1.default.validateSameEmailBelongToSameUser,
            common_permission_middleware_1.default.userCantChangePermission,
            users_controller_1.default.put
        ]);
        this.app.patch(`/users/:userId`, [
            (0, express_validator_1.body)('email').isEmail().optional(),
            (0, express_validator_1.body)('firstName').isString().optional(),
            (0, express_validator_1.body)('permissionFlags').isInt().optional(),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMucm91dGVzLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3VzZXJzL3VzZXJzLnJvdXRlcy5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEseUVBQW9FO0FBQ3BFLHNGQUE2RDtBQUM3RCxxRkFBNEQ7QUFDNUQsaUhBQXVGO0FBQ3ZGLHlEQUF5QztBQUV6Qyx1RkFBOEQ7QUFDOUQscUhBQXFGO0FBQ3JGLGdHQUFpRjtBQUVqRixNQUFhLFdBQVksU0FBUSx5Q0FBa0I7SUFDL0MsWUFBWSxHQUF3QjtRQUNoQyxLQUFLLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRCxlQUFlO1FBQ1gsSUFBSSxDQUFDLEdBQUc7YUFDSCxLQUFLLENBQUMsUUFBUSxDQUFDO2FBQ2YsR0FBRyxDQUNBLHdCQUFhLENBQUMsY0FBYyxFQUM1QixzQ0FBb0IsQ0FBQyxzQkFBc0IsQ0FDdkMsMkNBQWMsQ0FBQyxnQkFBZ0IsQ0FDbEMsRUFDRCwwQkFBZSxDQUFDLFNBQVMsQ0FDNUI7YUFDQSxJQUFJLENBQ0QsSUFBQSx3QkFBSSxFQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUMzQixvQ0FBd0IsQ0FBQyxzQkFBc0IsRUFDL0MsMEJBQWUsQ0FBQyw0QkFBNEIsRUFDNUMsMEJBQWUsQ0FBQyxVQUFVLENBQzdCLENBQUM7UUFFTixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsMEJBQWUsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsR0FBRzthQUNILEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQzthQUN2QixHQUFHLENBQ0EsMEJBQWUsQ0FBQyxrQkFBa0IsRUFDbEMsd0JBQWEsQ0FBQyxjQUFjLEVBQzVCLHNDQUFvQixDQUFDLHNCQUFzQixDQUN6QywyQ0FBYyxDQUFDLGdCQUFnQixDQUNoQyxFQUNELHNDQUFvQixDQUFDLGtDQUFrQyxDQUMxRDthQUNBLEdBQUcsQ0FBQywwQkFBZSxDQUFDLFdBQVcsQ0FBQzthQUNoQyxNQUFNLENBQUMsMEJBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUV4QyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRTtZQUMzQixJQUFBLHdCQUFJLEVBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFO1lBQ3ZCLElBQUEsd0JBQUksRUFBQyxXQUFXLENBQUMsQ0FBQyxRQUFRLEVBQUU7WUFDNUIsSUFBQSx3QkFBSSxFQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsRUFBRTtZQUMzQixJQUFBLHdCQUFJLEVBQUMsaUJBQWlCLENBQUMsQ0FBQyxLQUFLLEVBQUU7WUFDL0Isb0NBQXdCLENBQUMsc0JBQXNCO1lBQy9DLDBCQUFlLENBQUMsaUNBQWlDO1lBQ2pELHNDQUFvQixDQUFDLHdCQUF3QjtZQUM3QywwQkFBZSxDQUFDLEdBQUc7U0FDdEIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEVBQUU7WUFDN0IsSUFBQSx3QkFBSSxFQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRTtZQUNsQyxJQUFBLHdCQUFJLEVBQUMsV0FBVyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFO1lBQ3ZDLElBQUEsd0JBQUksRUFBQyxpQkFBaUIsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLFFBQVEsRUFBRTtZQUMxQyxvQ0FBd0IsQ0FBQyxzQkFBc0I7WUFDL0MsMEJBQWUsQ0FBQyxrQkFBa0I7WUFDbEMsc0NBQW9CLENBQUMsd0JBQXdCO1lBQzdDLDBCQUFlLENBQUMsS0FBSztTQUN4QixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpREFBaUQsRUFBRTtZQUM1RCx3QkFBYSxDQUFDLGNBQWM7WUFDNUIsc0NBQW9CLENBQUMsa0NBQWtDO1lBRXZELDhEQUE4RDtZQUM5RCxxRUFBcUU7WUFDckUsMkRBQTJEO1lBRTNELHNDQUFvQixDQUFDLHNCQUFzQixDQUN2QywyQ0FBYyxDQUFDLGVBQWUsQ0FDakM7WUFDRCwwQkFBZSxDQUFDLHFCQUFxQjtTQUN4QyxDQUFDLENBQUM7UUFFSCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDcEIsQ0FBQztDQUNKO0FBekVELGtDQXlFQyJ9