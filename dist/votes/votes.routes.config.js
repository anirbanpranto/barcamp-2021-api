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
            .post((0, express_validator_1.body)('userId').isLength({ min: 1 }).withMessage('Must include userId'), (0, express_validator_1.body)('topicId').isArray({ min: 5, max: 5 }).withMessage('Must propose exactly 5 topics'), (0, express_validator_1.body)('vote').exists().matches(/^(topic)$/).withMessage('Vote has to be topic'), body_validation_middleware_1.default.verifyBodyFieldsErrors, jwt_middleware_1.default.validJWTNeeded, common_permission_middleware_1.default.permissionFlagRequired(common_permissionflag_enum_1.PermissionFlag.USER_PERMISSION), votes_middleware_1.default.validateUserExistsWithBody, votes_middleware_1.default.validateUserIsOwner, votes_middleware_1.default.validateVoteArrDuplicates, votes_middleware_1.default.validateAlreadyVoted, votes_middleware_1.default.validateTopicExists, votes_controller_1.default.createVote);
        this.app
            .route('/votesByTopicId/:topicId')
            .get(votes_middleware_1.default.extractTopicId, jwt_middleware_1.default.validJWTNeeded, common_permission_middleware_1.default.permissionFlagRequired(common_permissionflag_enum_1.PermissionFlag.USER_PERMISSION), votes_middleware_1.default.validateTopicExistsInVote, votes_controller_1.default.getVotesByTopicId);
        this.app
            .route('/votes/leaderboard')
            .get(jwt_middleware_1.default.validJWTNeeded, common_permission_middleware_1.default.permissionFlagRequired(common_permissionflag_enum_1.PermissionFlag.USER_PERMISSION), votes_controller_1.default.getLeaderboard);
        this.app.param('userId', votes_middleware_1.default.extractUserId);
        this.app
            .route('/votes/:userId')
            .get(jwt_middleware_1.default.validJWTNeeded, common_permission_middleware_1.default.permissionFlagRequired(common_permissionflag_enum_1.PermissionFlag.USER_PERMISSION), jwt_middleware_1.default.validateParamUserIdIsUser, votes_middleware_2.default.validateUserExistsWithParam, votes_controller_1.default.getVote)
            .delete(jwt_middleware_1.default.validJWTNeeded, common_permission_middleware_1.default.permissionFlagRequired(common_permissionflag_enum_1.PermissionFlag.USER_PERMISSION), jwt_middleware_1.default.validateParamUserIdIsUser, votes_middleware_2.default.validateUserExistsWithParam, votes_controller_1.default.deleteVoteByUserId);
        return this.app;
    }
}
exports.VotesRoutes = VotesRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidm90ZXMucm91dGVzLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3ZvdGVzL3ZvdGVzLnJvdXRlcy5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEseUVBQW9FO0FBQ3BFLHNGQUE2RDtBQUM3RCxxRkFBNEQ7QUFDNUQsaUhBQXVGO0FBQ3ZGLHlEQUF5QztBQUV6Qyx1RkFBOEQ7QUFDOUQscUZBQTREO0FBQzVELHFIQUFxRjtBQUNyRixnR0FBaUY7QUFFakYsTUFBYSxXQUFZLFNBQVEseUNBQWtCO0lBQ2pELFlBQVksR0FBd0I7UUFDbEMsS0FBSyxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxHQUFHO2FBQ0wsS0FBSyxDQUFDLFFBQVEsQ0FBQzthQUNmLEdBQUcsQ0FDRix3QkFBYSxDQUFDLGNBQWMsRUFDNUIsc0NBQW9CLENBQUMsc0JBQXNCLENBQ3pDLDJDQUFjLENBQUMsZUFBZSxDQUMvQixFQUNELDBCQUFlLENBQUMsU0FBUyxDQUMxQjthQUNBLElBQUksQ0FDSCxJQUFBLHdCQUFJLEVBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUMsR0FBRyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsV0FBVyxDQUFDLHFCQUFxQixDQUFDLEVBQ3BFLElBQUEsd0JBQUksRUFBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQywrQkFBK0IsQ0FBQyxFQUN4RixJQUFBLHdCQUFJLEVBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxzQkFBc0IsQ0FBQyxFQUM5RSxvQ0FBd0IsQ0FBQyxzQkFBc0IsRUFDL0Msd0JBQWEsQ0FBQyxjQUFjLEVBQzVCLHNDQUFvQixDQUFDLHNCQUFzQixDQUN6QywyQ0FBYyxDQUFDLGVBQWUsQ0FDL0IsRUFDRCwwQkFBZSxDQUFDLDBCQUEwQixFQUMxQywwQkFBZSxDQUFDLG1CQUFtQixFQUNuQywwQkFBZSxDQUFDLHlCQUF5QixFQUN6QywwQkFBZSxDQUFDLG9CQUFvQixFQUNwQywwQkFBZSxDQUFDLG1CQUFtQixFQUNuQywwQkFBZSxDQUFDLFVBQVUsQ0FDM0IsQ0FBQztRQUVKLElBQUksQ0FBQyxHQUFHO2FBQ0wsS0FBSyxDQUFDLDBCQUEwQixDQUFDO2FBQ2pDLEdBQUcsQ0FDRiwwQkFBZSxDQUFDLGNBQWMsRUFDOUIsd0JBQWEsQ0FBQyxjQUFjLEVBQzVCLHNDQUFvQixDQUFDLHNCQUFzQixDQUN6QywyQ0FBYyxDQUFDLGVBQWUsQ0FDL0IsRUFDRCwwQkFBZSxDQUFDLHlCQUF5QixFQUN6QywwQkFBZSxDQUFDLGlCQUFpQixDQUNsQyxDQUFBO1FBRUgsSUFBSSxDQUFDLEdBQUc7YUFDTCxLQUFLLENBQUMsb0JBQW9CLENBQUM7YUFDM0IsR0FBRyxDQUNGLHdCQUFhLENBQUMsY0FBYyxFQUM1QixzQ0FBb0IsQ0FBQyxzQkFBc0IsQ0FDekMsMkNBQWMsQ0FBQyxlQUFlLENBQy9CLEVBQ0QsMEJBQWUsQ0FBQyxjQUFjLENBQy9CLENBQUE7UUFFSCxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsMEJBQWUsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsR0FBRzthQUNMLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQzthQUN2QixHQUFHLENBQ0Ysd0JBQWEsQ0FBQyxjQUFjLEVBQzVCLHNDQUFvQixDQUFDLHNCQUFzQixDQUN6QywyQ0FBYyxDQUFDLGVBQWUsQ0FDL0IsRUFDRCx3QkFBYSxDQUFDLHlCQUF5QixFQUN2QywwQkFBZSxDQUFDLDJCQUEyQixFQUMzQywwQkFBZSxDQUFDLE9BQU8sQ0FDeEI7YUFDQSxNQUFNLENBQ0wsd0JBQWEsQ0FBQyxjQUFjLEVBQzVCLHNDQUFvQixDQUFDLHNCQUFzQixDQUN6QywyQ0FBYyxDQUFDLGVBQWUsQ0FDL0IsRUFDRCx3QkFBYSxDQUFDLHlCQUF5QixFQUN2QywwQkFBZSxDQUFDLDJCQUEyQixFQUMzQywwQkFBZSxDQUFDLGtCQUFrQixDQUNuQyxDQUFBO1FBRUgsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ2xCLENBQUM7Q0FFRjtBQS9FRCxrQ0ErRUMifQ==