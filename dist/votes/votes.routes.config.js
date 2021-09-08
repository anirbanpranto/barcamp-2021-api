"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
            .post(express_validator_1.body('userId').isLength({ min: 1 }).withMessage('Must include userId'), express_validator_1.body('topicId').isLength({ min: 1 }).withMessage('Must include topicId'), express_validator_1.body('vote').exists().matches(/^(speaker|topic)$/).withMessage('Vote needs to exist and value is either speaker or topic'), body_validation_middleware_1.default.verifyBodyFieldsErrors, jwt_middleware_1.default.validJWTNeeded, votes_middleware_1.default.validateUserExists, votes_middleware_1.default.validateTopicExists, votes_middleware_1.default.validateVoteExists, votes_controller_1.default.createVote);
        this.app.param('userId', votes_middleware_1.default.extractUserId);
        this.app
            .route('/votes/:userId')
            .get(jwt_middleware_1.default.validJWTNeeded, votes_middleware_2.default.validateUserExists, votes_controller_1.default.getVote);
        return this.app;
    }
}
exports.VotesRoutes = VotesRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidm90ZXMucm91dGVzLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3ZvdGVzL3ZvdGVzLnJvdXRlcy5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx5RUFBb0U7QUFDcEUsc0ZBQTZEO0FBQzdELHFGQUE0RDtBQUM1RCxpSEFBdUY7QUFDdkYseURBQXlDO0FBRXpDLHVGQUE4RDtBQUM5RCxxRkFBNEQ7QUFFNUQsTUFBYSxXQUFZLFNBQVEseUNBQWtCO0lBQ2pELFlBQVksR0FBd0I7UUFDbEMsS0FBSyxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxHQUFHO2FBQ0wsS0FBSyxDQUFDLFFBQVEsQ0FBQzthQUNmLEdBQUcsQ0FBQyx3QkFBYSxDQUFDLGNBQWMsRUFBRSwwQkFBZSxDQUFDLFNBQVMsQ0FBQzthQUM1RCxJQUFJLENBQ0gsd0JBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBQyxHQUFHLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMscUJBQXFCLENBQUMsRUFDcEUsd0JBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBQyxHQUFHLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsc0JBQXNCLENBQUMsRUFDdEUsd0JBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxXQUFXLENBQUMsMERBQTBELENBQUMsRUFDMUgsb0NBQXdCLENBQUMsc0JBQXNCLEVBQy9DLHdCQUFhLENBQUMsY0FBYyxFQUM1QiwwQkFBZSxDQUFDLGtCQUFrQixFQUNsQywwQkFBZSxDQUFDLG1CQUFtQixFQUNuQywwQkFBZSxDQUFDLGtCQUFrQixFQUNsQywwQkFBZSxDQUFDLFVBQVUsQ0FDM0IsQ0FBQztRQUVKLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSwwQkFBZSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxHQUFHO2FBQ0wsS0FBSyxDQUFDLGdCQUFnQixDQUFDO2FBQ3ZCLEdBQUcsQ0FDRix3QkFBYSxDQUFDLGNBQWMsRUFDNUIsMEJBQWUsQ0FBQyxrQkFBa0IsRUFDbEMsMEJBQWUsQ0FBQyxPQUFPLENBQ3hCLENBQUE7UUFFSCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDbEIsQ0FBQztDQUVGO0FBakNELGtDQWlDQyJ9