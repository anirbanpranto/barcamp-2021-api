"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_service_1 = __importDefault(require("../../users/services/users.service"));
const topics_service_1 = __importDefault(require("../../topics/services/topics.service"));
const debug_1 = __importDefault(require("debug"));
const votes_service_1 = __importDefault(require("../services/votes.service"));
const log = (0, debug_1.default)('app:users-controller');
class VotesMiddleware {
    validateUserExistsWithParam(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_service_1.default.readById(req.body.id);
            if (user) {
                res.locals.user = user;
                next();
            }
            else {
                res.status(404).send({
                    error: `User ${req.body.userId} not found`,
                });
            }
        });
    }
    validateUserExistsWithBody(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_service_1.default.readById(req.body.userId);
            if (user) {
                res.locals.user = user;
                next();
            }
            else {
                res.status(404).send({
                    error: `User ${req.body.userId} not found`,
                });
            }
        });
    }
    validateUserIsOwner(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (res.locals.jwt.userId === req.body.userId) {
                next();
            }
            else {
                return res.status(403).send();
            }
        });
    }
    validateTopicExists(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const topicArr = req.body.topicId;
            let errArr = [];
            if (topicArr.length) {
                var checkExist = new Promise((resolve, reject) => {
                    topicArr.forEach((topicId, index, array) => __awaiter(this, void 0, void 0, function* () {
                        const singleTopic = yield topics_service_1.default.readById(topicId);
                        if (!singleTopic) {
                            errArr.push(`${topicId}`);
                        }
                        if (index === array.length - 1)
                            resolve(1);
                    }));
                });
                checkExist
                    .then(() => {
                    if (errArr.length > 0) {
                        return res.status(404).send({
                            error: `Topic Validation Failed`,
                            errArr
                        }).end();
                    }
                    else {
                        next();
                    }
                })
                    .catch(() => {
                    return res.status(500).send({
                        error: `Topic Validation Failed`,
                    });
                });
            }
        });
    }
    validateAlreadyVoted(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield votes_service_1.default.readByUserId(req.body.userId);
            if (user.length === 0) {
                next();
            }
            else {
                return res.status(404).send({
                    error: `User already voted`,
                }).end();
            }
        });
    }
    validateVoteArrDuplicates(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const voteArr = req.body.topicId;
            const toFindDuplicates = (voteArr) => voteArr.filter((item, index) => voteArr.indexOf(item) !== index);
            const duplicateElement = toFindDuplicates(voteArr);
            if (duplicateElement.length > 0) {
                return res.status(404).send({
                    error: `Duplicate vote`,
                    duplicateElement
                }).end();
            }
            else {
                next();
            }
        });
    }
    extractUserId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            req.body.id = req.params.userId;
            next();
        });
    }
}
exports.default = new VotesMiddleware();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidm90ZXMubWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3ZvdGVzL21pZGRsZXdhcmUvdm90ZXMubWlkZGxld2FyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUVBLHVGQUE2RDtBQUM3RCwwRkFBZ0U7QUFDaEUsa0RBQTBCO0FBQzFCLDhFQUFxRDtBQUVyRCxNQUFNLEdBQUcsR0FBb0IsSUFBQSxlQUFLLEVBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUUzRCxNQUFNLGVBQWU7SUFDYiwyQkFBMkIsQ0FDN0IsR0FBb0IsRUFDcEIsR0FBcUIsRUFDckIsSUFBMEI7O1lBRTFCLE1BQU0sSUFBSSxHQUFHLE1BQU0sdUJBQVcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNyRCxJQUFJLElBQUksRUFBRTtnQkFDTixHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7Z0JBQ3ZCLElBQUksRUFBRSxDQUFDO2FBQ1Y7aUJBQU07Z0JBQ0gsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7b0JBQ2pCLEtBQUssRUFBRSxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxZQUFZO2lCQUM3QyxDQUFDLENBQUM7YUFDTjtRQUNMLENBQUM7S0FBQTtJQUVLLDBCQUEwQixDQUM5QixHQUFvQixFQUNwQixHQUFxQixFQUNyQixJQUEwQjs7WUFFeEIsTUFBTSxJQUFJLEdBQUcsTUFBTSx1QkFBVyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3pELElBQUksSUFBSSxFQUFFO2dCQUNOLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztnQkFDdkIsSUFBSSxFQUFFLENBQUM7YUFDVjtpQkFBTTtnQkFDSCxHQUFHLENBQUMsTUFBTSxD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