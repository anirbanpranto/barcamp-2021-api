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
    validateUserExists(req, res, next) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidm90ZXMubWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3ZvdGVzL21pZGRsZXdhcmUvdm90ZXMubWlkZGxld2FyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUVBLHVGQUE2RDtBQUM3RCwwRkFBZ0U7QUFDaEUsa0RBQTBCO0FBQzFCLDhFQUFxRDtBQUVyRCxNQUFNLEdBQUcsR0FBb0IsSUFBQSxlQUFLLEVBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUUzRCxNQUFNLGVBQWU7SUFDYixrQkFBa0IsQ0FDcEIsR0FBb0IsRUFDcEIsR0FBcUIsRUFDckIsSUFBMEI7O1lBRTFCLE1BQU0sSUFBSSxHQUFHLE1BQU0sdUJBQVcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNyRCxJQUFJLElBQUksRUFBRTtnQkFDTixHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7Z0JBQ3ZCLElBQUksRUFBRSxDQUFDO2FBQ1Y7aUJBQU07Z0JBQ0gsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7b0JBQ2pCLEtBQUssRUFBRSxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxZQUFZO2lCQUM3QyxDQUFDLENBQUM7YUFDTjtRQUNMLENBQUM7S0FBQTtJQUVLLG1CQUFtQixDQUNyQixHQUFvQixFQUNwQixHQUFxQixFQUNyQixJQUEwQjs7WUFFNUIsTUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUE7WUFDakMsSUFBSSxNQUFNLEdBQWtCLEVBQUUsQ0FBQztZQUMvQixJQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUM7Z0JBQ2pCLElBQUksVUFBVSxHQUFHLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO29CQUM3QyxRQUFRLENBQUMsT0FBTyxD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