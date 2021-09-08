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
class VotesRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, 'UsersRoutes');
    }
    configureRoutes() {
        this.app
            .route('/votes')
            .get(jwt_middleware_1.default.validJWTNeeded, votes_controller_1.default.listVotes)
            .post(express_validator_1.body('userId').isLength({ min: 1 }).withMessage('Must include userId'), express_validator_1.body('topicId').isLength({ min: 1 }).withMessage('Must include topicId'), express_validator_1.body('vote').exists().matches(/^(speaker|topic)$/).withMessage('Vote needs to exist and value is either speaker or topic'), body_validation_middleware_1.default.verifyBodyFieldsErrors, jwt_middleware_1.default.validJWTNeeded, votes_middleware_1.default.validateUserExists, votes_middleware_1.default.validateTopicExists, votes_middleware_1.default.validateVoteExists, votes_controller_1.default.createVote);
        this.app.param('userId', votes_middleware_1.default.validateUserExists);
        this.app
            .route('/votes/:userId')
            .get(jwt_middleware_1.default.validJWTNeeded, votes_controller_1.default.getVote);
        return this.app;
    }
}
exports.VotesRoutes = VotesRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidm90ZXMucm91dGVzLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3ZvdGVzL3ZvdGVzLnJvdXRlcy5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx5RUFBb0U7QUFDcEUsc0ZBQTZEO0FBQzdELHFGQUE0RDtBQUM1RCxpSEFBdUY7QUFDdkYseURBQXlDO0FBRXpDLHVGQUE4RDtBQUU5RCxNQUFhLFdBQVksU0FBUSx5Q0FBa0I7SUFDakQsWUFBWSxHQUF3QjtRQUNsQyxLQUFLLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLEdBQUc7YUFDTCxLQUFLLENBQUMsUUFBUSxDQUFDO2FBQ2YsR0FBRyxDQUFDLHdCQUFhLENBQUMsY0FBYyxFQUFFLDBCQUFlLENBQUMsU0FBUyxDQUFDO2FBQzVELElBQUksQ0FDSCx3QkFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsQ0FBQyxFQUNwRSx3QkFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxzQkFBc0IsQ0FBQyxFQUN0RSx3QkFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLFdBQVcsQ0FBQywwREFBMEQsQ0FBQyxFQUMxSCxvQ0FBd0IsQ0FBQyxzQkFBc0IsRUFDL0Msd0JBQWEsQ0FBQyxjQUFjLEVBQzVCLDBCQUFlLENBQUMsa0JBQWtCLEVBQ2xDLDBCQUFlLENBQUMsbUJBQW1CLEVBQ25DLDBCQUFlLENBQUMsa0JBQWtCLEVBQ2xDLDBCQUFlLENBQUMsVUFBVSxDQUMzQixDQUFDO1FBRUosSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLDBCQUFlLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsR0FBRzthQUNMLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQzthQUN2QixHQUFHLENBQUMsd0JBQWEsQ0FBQyxjQUFjLEVBQUUsMEJBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUU3RCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDbEIsQ0FBQztDQUVGO0FBN0JELGtDQTZCQyJ9