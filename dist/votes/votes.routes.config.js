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
class VotesRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, 'UsersRoutes');
    }
    configureRoutes() {
        this.app
            .route('/votes')
            .get(jwt_middleware_1.default.validJWTNeeded, votes_controller_1.default.listVotes)
            .post((0, express_validator_1.body)('userId').isLength({ min: 1 }).withMessage('Must include userId'), (0, express_validator_1.body)('topicId').isLength({ min: 1 }).withMessage('Must include topicId'), (0, express_validator_1.body)('vote').exists().matches(/^(speaker|topic)$/).withMessage('Vote needs to exist and value is either speaker or topic'), body_validation_middleware_1.default.verifyBodyFieldsErrors, jwt_middleware_1.default.validJWTNeeded, votes_middleware_1.default.validateUserExists, votes_middleware_1.default.validateTopicExists, votes_middleware_1.default.validateVoteExists, votes_controller_1.default.createVote);
        this.app.param('userId', votes_middleware_1.default.validateUserExists);
        this.app
            .route('/votes/:userId')
            .get(jwt_middleware_1.default.validJWTNeeded, votes_controller_1.default.getVote);
        return this.app;
    }
}
exports.VotesRoutes = VotesRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidm90ZXMucm91dGVzLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3ZvdGVzL3ZvdGVzLnJvdXRlcy5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEseUVBQW9FO0FBQ3BFLHNGQUE2RDtBQUM3RCxxRkFBNEQ7QUFDNUQsaUhBQXVGO0FBQ3ZGLHlEQUF5QztBQUV6Qyx1RkFBOEQ7QUFFOUQsTUFBYSxXQUFZLFNBQVEseUNBQWtCO0lBQ2pELFlBQVksR0FBd0I7UUFDbEMsS0FBSyxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxHQUFHO2FBQ0wsS0FBSyxDQUFDLFFBQVEsQ0FBQzthQUNmLEdBQUcsQ0FBQyx3QkFBYSxDQUFDLGNBQWMsRUFBRSwwQkFBZSxDQUFDLFNBQVMsQ0FBQzthQUM1RCxJQUFJLENBQ0gsSUFBQSx3QkFBSSxFQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsQ0FBQyxFQUNwRSxJQUFBLHdCQUFJLEVBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUMsR0FBRyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsV0FBVyxDQUFDLHNCQUFzQixDQUFDLEVBQ3RFLElBQUEsd0JBQUksRUFBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxXQUFXLENBQUMsMERBQTBELENBQUMsRUFDMUgsb0NBQXdCLENBQUMsc0JBQXNCLEVBQy9DLHdCQUFhLENBQUMsY0FBYyxFQUM1QiwwQkFBZSxDQUFDLGtCQUFrQixFQUNsQywwQkFBZSxDQUFDLG1CQUFtQixFQUNuQywwQkFBZSxDQUFDLGtCQUFrQixFQUNsQywwQkFBZSxDQUFDLFVBQVUsQ0FDM0IsQ0FBQztRQUVKLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSwwQkFBZSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLEdBQUc7YUFDTCxLQUFLLENBQUMsZ0JBQWdCLENBQUM7YUFDdkIsR0FBRyxDQUFDLHdCQUFhLENBQUMsY0FBYyxFQUFFLDBCQUFlLENBQUMsT0FBTyxDQUFDLENBQUE7UUFFN0QsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ2xCLENBQUM7Q0FFRjtBQTdCRCxrQ0E2QkMifQ==