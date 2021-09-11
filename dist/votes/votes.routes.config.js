"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VotesRoutes = void 0;
const common_routes_config_1 = require("../common/common.routes.config");
const votes_controller_1 = __importDefault(require("./controllers/votes.controller"));
const votes_middleware_1 = __importDefault(require("./middleware/votes.middleware"));
const body_validation_middleware_1 = __importDefault(require("../common/middleware/body.validation.middleware"));
const express_validator_1 = require("express-validator");
const jwt_middleware_1 = __importDefault(require("../auth/middleware/jwt.middleware"));
const votes_middleware_2 = __importDefault(require("./middleware/votes.middleware"));
const common_permission_middleware_1 = __importDefault(require("../common/middleware/common.permission.middleware"));
const common_permissionflag_enum_1 = require("../common/middleware/common.permissionflag.enum");
class VotesRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, 'UsersRoutes');
    }
    configureRoutes() {
        this.app
            .route('/votes')
            .get(jwt_middleware_1.default.validJWTNeeded, common_permission_middleware_1.default.permissionFlagRequired(common_permissionflag_enum_1.PermissionFlag.USER_PERMISSION), votes_controller_1.default.listVotes)
            .post((0, express_validator_1.body)('userId').isLength({ min: 1 }).withMessage('Must include userId'), (0, express_validator_1.body)('topicId').isArray({ min: 5, max: 5 }).withMessage('Must propose exactly 5 topics'), (0, express_validator_1.body)('vote').exists().matches(/^(speaker|topic)$/).withMessage('Vote needs to exist and value is either speaker or topic'), body_validation_middleware_1.default.verifyBodyFieldsErrors, jwt_middleware_1.default.validJWTNeeded, common_permission_middleware_1.default.permissionFlagRequired(common_permissionflag_enum_1.PermissionFlag.USER_PERMISSION), votes_middleware_1.default.validateUserExistsWithBody, votes_middleware_1.default.validateUserIsOwner, votes_middleware_1.default.validateVoteArrDuplicates, votes_middleware_1.default.validateAlreadyVoted, votes_middleware_1.default.validateTopicExists, votes_controller_1.default.createVote);
        this.app.param('userId', votes_middleware_1.default.extractUserId);
        this.app
            .route('/votes/:userId')
            .get(jwt_middleware_1.default.validJWTNeeded, common_permission_middleware_1.default.permissionFlagRequired(common_permissionflag_enum_1.PermissionFlag.USER_PERMISSION), jwt_middleware_1.default.validateParamUserIdIsUser, votes_middleware_2.default.validateUserExistsWithParam, votes_controller_1.default.getVote);
        return this.app;
    }
}
exports.VotesRoutes = VotesRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidm90ZXMucm91dGVzLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3ZvdGVzL3ZvdGVzLnJvdXRlcy5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEseUVBQW9FO0FBQ3BFLHNGQUE2RDtBQUM3RCxxRkFBNEQ7QUFDNUQsaUhBQXVGO0FBQ3ZGLHlEQUF5QztBQUV6Qyx1RkFBOEQ7QUFDOUQscUZBQTREO0FBQzVELHFIQUFxRjtBQUNyRixnR0FBaUY7QUFFakYsTUFBYSxXQUFZLFNBQVEseUNBQWtCO0lBQ2pELFlBQVksR0FBd0I7UUFDbEMsS0FBSyxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxHQUFHO2FBQ0wsS0FBSyxDQUFDLFFBQVEsQ0FBQzthQUNmLEdBQUcsQ0FDRix3QkFBYSxDQUFDLGNBQWMsRUFDNUIsc0NBQW9CLENBQUMsc0JBQXNCLENBQ3pDLDJDQUFjLENBQUMsZUFBZSxDQUMvQixFQUNELDBCQUFlLENBQUMsU0FBUyxDQUMxQjthQUNBLElBQUksQ0FDSCxJQUFBLHdCQUFJLEVBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUMsR0FBRyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsV0FBVyxDQUFDLHFCQUFxQixDQUFDLEVBQ3BFLElBQUEsd0JBQUksRUFBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQywrQkFBK0IsQ0FBQyxFQUN4RixJQUFBLHdCQUFJLEVBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUMsV0FBVyxDQUFDLDBEQUEwRCxDQUFDLEVBQzFILG9DQUF3QixDQUFDLHNCQUFzQixFQUMvQyx3QkFBYSxDQUFDLGNBQWMsRUFDNUIsc0NBQW9CLENBQUMsc0JBQXNCLENBQ3pDLDJDQUFjLENBQUMsZUFBZSxDQUMvQixFQUNELDBCQUFlLENBQUMsMEJBQTBCLEVBQzFDLDBCQUFlLENBQUMsbUJBQW1CLEVBQ25DLDBCQUFlLENBQUMseUJBQXlCLEVBQ3pDLDBCQUFlLENBQUMsb0JBQW9CLEVBQ3BDLDBCQUFlLENBQUMsbUJBQW1CLEVBQ25DLDBCQUFlLENBQUMsVUFBVSxDQUMzQixDQUFDO1FBRUosSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLDBCQUFlLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLEdBQUc7YUFDTCxLQUFLLENBQUMsZ0JBQWdCLENBQUM7YUFDdkIsR0FBRyxDQUNGLHdCQUFhLENBQUMsY0FBYyxFQUM1QixzQ0FBb0IsQ0FBQyxzQkFBc0IsQ0FDekMsMkNBQWMsQ0FBQyxlQUFlLENBQy9CLEVBQ0Qsd0JBQWEsQ0FBQyx5QkFBeUIsRUFDdkMsMEJBQWUsQ0FBQywyQkFBMkIsRUFDM0MsMEJBQWUsQ0FBQyxPQUFPLENBQ3hCLENBQUE7UUFFSCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDbEIsQ0FBQztDQUVGO0FBaERELGtDQWdEQyJ9