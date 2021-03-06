"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const common_routes_config_1 = require("../common/common.routes.config");
const auth_controller_1 = __importDefault(require("./controllers/auth.controller"));
const body_validation_middleware_1 = __importDefault(require("../common/middleware/body.validation.middleware"));
const express_validator_1 = require("express-validator");
const jwt_middleware_1 = __importDefault(require("./middleware/jwt.middleware"));
const users_middleware_1 = __importDefault(require("../users/middleware/users.middleware"));
class AuthRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, 'AuthRoutes');
    }
    configureRoutes() {
        this.app.get(`/auth/check`, jwt_middleware_1.default.validJWTNeeded, auth_controller_1.default.checkAuth);
        this.app.route(`/auth/`)
            .post((0, express_validator_1.body)('googleId').isString(), body_validation_middleware_1.default.verifyBodyFieldsErrors, users_middleware_1.default.createAccountIfNotExists, auth_controller_1.default.createJWT);
        this.app.post(`/auth/refresh-token`, [
            jwt_middleware_1.default.validJWTNeeded,
            jwt_middleware_1.default.verifyRefreshBodyField,
            jwt_middleware_1.default.validRefreshNeeded,
            auth_controller_1.default.createJWT,
        ]);
        return this.app;
    }
}
exports.AuthRoutes = AuthRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5yb3V0ZXMuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vYXV0aC9hdXRoLnJvdXRlcy5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEseUVBQW9FO0FBQ3BFLG9GQUEyRDtBQUczRCxpSEFBdUY7QUFDdkYseURBQXlDO0FBQ3pDLGlGQUF3RDtBQUN4RCw0RkFBbUU7QUFFbkUsTUFBYSxVQUFXLFNBQVEseUNBQWtCO0lBQzlDLFlBQVksR0FBd0I7UUFDaEMsS0FBSyxDQUFDLEdBQUcsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsZUFBZTtRQUViLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUNSLGFBQWEsRUFDYix3QkFBYSxDQUFDLGNBQWMsRUFDNUIseUJBQWMsQ0FBQyxTQUFTLENBQ3pCLENBQUM7UUFFSixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7YUFDckIsSUFBSSxDQUNILElBQUEsd0JBQUksRUFBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFDM0Isb0NBQXdCLENBQUMsc0JBQXNCLEVBQy9DLDBCQUFlLENBQUMsd0JBQXdCLEVBQ3hDLHlCQUFjLENBQUMsU0FBUyxDQUN6QixDQUFBO1FBRUgsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUU7WUFDbkMsd0JBQWEsQ0FBQyxjQUFjO1lBQzVCLHdCQUFhLENBQUMsc0JBQXNCO1lBQ3BDLHdCQUFhLENBQUMsa0JBQWtCO1lBQ2hDLHlCQUFjLENBQUMsU0FBUztTQUN6QixDQUFDLENBQUM7UUFFSCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDbEIsQ0FBQztDQUNKO0FBOUJELGdDQThCQyJ9