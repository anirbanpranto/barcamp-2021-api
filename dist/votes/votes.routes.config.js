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
class VotesRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, 'UsersRoutes');
    }
    configureRoutes() {
        this.app
            .route('/votes')
            .get(jwt_middleware_1.default.validJWTNeeded, votes_controller_1.default.listVotes)
            .post((0, express_validator_1.body)('userId').isLength({ min: 1 }).withMessage('Must include userId'), (0, express_validator_1.body)('topicId').isArray({ min: 5, max: 5 }).withMessage('Must propose exactly 5 topics'), (0, express_validator_1.body)('vote').exists().matches(/^(speaker|topic)$/).withMessage('Vote needs to exist and value is either speaker or topic'), body_validation_middleware_1.default.verifyBodyFieldsErrors, jwt_middleware_1.default.validJWTNeeded, votes_middleware_1.default.validateUserExists, votes_middleware_1.default.validateVoteArrDuplicates, votes_middleware_1.default.validateAlreadyVoted, votes_middleware_1.default.validateTopicExists, votes_controller_1.default.createVote);
        this.app.param('userId', votes_middleware_1.default.extractUserId);
        this.app
            .route('/votes/:userId')
            .get(jwt_middleware_1.default.validJWTNeeded, jwt_middleware_1.default.validateParamUserIdIsUser, votes_middleware_2.default.validateUserExists, votes_controller_1.default.getVote);
        return this.app;
    }
}
exports.VotesRoutes = VotesRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidm90ZXMucm91dGVzLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3ZvdGVzL3ZvdGVzLnJvdXRlcy5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEseUVBQW9FO0FBQ3BFLHNGQUE2RDtBQUM3RCxxRkFBNEQ7QUFDNUQsaUhBQXVGO0FBQ3ZGLHlEQUF5QztBQUV6Qyx1RkFBOEQ7QUFDOUQscUZBQTREO0FBRTVELE1BQWEsV0FBWSxTQUFRLHlDQUFrQjtJQUNqRCxZQUFZLEdBQXdCO1FBQ2xDLEtBQUssQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVELGVBQWU7UUFDYixJQUFJLENBQUMsR0FBRzthQUNMLEtBQUssQ0FBQyxRQUFRLENBQUM7YUFDZixHQUFHLENBQUMsd0JBQWEsQ0FBQyxjQUFjLEVBQUUsMEJBQWUsQ0FBQyxTQUFTLENBQUM7YUFDNUQsSUFBSSxDQUNILElBQUEsd0JBQUksRUFBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBQyxHQUFHLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMscUJBQXFCLENBQUMsRUFDcEUsSUFBQSx3QkFBSSxFQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLCtCQUErQixDQUFDLEVBQ3hGLElBQUEsd0JBQUksRUFBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxXQUFXLENBQUMsMERBQTBELENBQUMsRUFDMUgsb0NBQXdCLENBQUMsc0JBQXNCLEVBQy9DLHdCQUFhLENBQUMsY0FBYyxFQUM1QiwwQkFBZSxDQUFDLGtCQUFrQixFQUNsQywwQkFBZSxDQUFDLHlCQUF5QixFQUN6QywwQkFBZSxDQUFDLG9CQUFvQixFQUNwQywwQkFBZSxDQUFDLG1CQUFtQixFQUNuQywwQkFBZSxDQUFDLFVBQVUsQ0FDM0IsQ0FBQztRQUVKLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSwwQkFBZSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxHQUFHO2FBQ0wsS0FBSyxDQUFDLGdCQUFnQixDQUFDO2FBQ3ZCLEdBQUcsQ0FDRix3QkFBYSxDQUFDLGNBQWMsRUFDNUIsd0JBQWEsQ0FBQyx5QkFBeUIsRUFDdkMsMEJBQWUsQ0FBQyxrQkFBa0IsRUFDbEMsMEJBQWUsQ0FBQyxPQUFPLENBQ3hCLENBQUE7UUFFSCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDbEIsQ0FBQztDQUVGO0FBbkNELGtDQW1DQyJ9