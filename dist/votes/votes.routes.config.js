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
            .get(votes_controller_1.default.listVotes)
            .post((0, express_validator_1.body)('userId').isLength({ min: 1 }).withMessage('Must include userId'), (0, express_validator_1.body)('topicId').isLength({ min: 1 }).withMessage('Must include topicId'), body_validation_middleware_1.default.verifyBodyFieldsErrors, jwt_middleware_1.default.validJWTNeeded, votes_middleware_1.default.validateUserExists, votes_controller_1.default.createVote);
        this.app.param('userId', votes_middleware_1.default.validateUserExists);
        this.app
            .route('/votes/:userId')
            .get(jwt_middleware_1.default.validJWTNeeded, votes_controller_1.default.getVote);
        return this.app;
    }
}
exports.VotesRoutes = VotesRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidm90ZXMucm91dGVzLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3ZvdGVzL3ZvdGVzLnJvdXRlcy5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEseUVBQW9FO0FBQ3BFLHNGQUE2RDtBQUM3RCxxRkFBNEQ7QUFDNUQsaUhBQXVGO0FBQ3ZGLHlEQUF5QztBQUV6Qyx1RkFBOEQ7QUFFOUQsTUFBYSxXQUFZLFNBQVEseUNBQWtCO0lBQ2pELFlBQVksR0FBd0I7UUFDbEMsS0FBSyxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxHQUFHO2FBQ0wsS0FBSyxDQUFDLFFBQVEsQ0FBQzthQUNmLEdBQUcsQ0FBRSwwQkFBZSxDQUFDLFNBQVMsQ0FBQzthQUMvQixJQUFJLENBQ0gsSUFBQSx3QkFBSSxFQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsQ0FBQyxFQUNwRSxJQUFBLHdCQUFJLEVBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUMsR0FBRyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsV0FBVyxDQUFDLHNCQUFzQixDQUFDLEVBQ3RFLG9DQUF3QixDQUFDLHNCQUFzQixFQUMvQyx3QkFBYSxDQUFDLGNBQWMsRUFDNUIsMEJBQWUsQ0FBQyxrQkFBa0IsRUFDbEMsMEJBQWUsQ0FBQyxVQUFVLENBQzNCLENBQUM7UUFFSixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsMEJBQWUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxHQUFHO2FBQ0wsS0FBSyxDQUFDLGdCQUFnQixDQUFDO2FBQ3ZCLEdBQUcsQ0FBQyx3QkFBYSxDQUFDLGNBQWMsRUFBRSwwQkFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBRTdELE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNsQixDQUFDO0NBRUY7QUExQkQsa0NBMEJDIn0=