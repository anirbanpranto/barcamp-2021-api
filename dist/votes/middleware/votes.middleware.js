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
const votes_service_1 = __importDefault(require("../services/votes.service"));
const users_service_1 = __importDefault(require("../../users/services/users.service"));
const topics_service_1 = __importDefault(require("../../topics/services/topics.service"));
const debug_1 = __importDefault(require("debug"));
const votes_service_2 = __importDefault(require("../services/votes.service"));
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
                return res.status(403).send({
                    error: `You do not have access to this`,
                });
            }
        });
    }
    validateTopicExistsInVote(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const topicExistsInVote = yield votes_service_1.default.readByTopicId(req.body.id);
            if (topicExistsInVote.length > 0) {
                return next();
            }
            else {
                return res.status(404).send({
                    error: `Topic not found in vote`,
                }).end();
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
            const user = yield votes_service_2.default.readByUserId(req.body.userId);
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
    extractTopicId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            log('extractTopicId');
            req.body.id = req.params.topicId;
            next();
        });
    }
}
exports.default = new VotesMiddleware();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidm90ZXMubWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3ZvdGVzL21pZGRsZXdhcmUvdm90ZXMubWlkZGxld2FyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUNBLDhFQUFvRDtBQUNwRCx1RkFBNkQ7QUFDN0QsMEZBQWdFO0FBQ2hFLGtEQUEwQjtBQUMxQiw4RUFBcUQ7QUFFckQsTUFBTSxHQUFHLEdBQW9CLElBQUEsZUFBSyxFQUFDLHNCQUFzQixDQUFDLENBQUM7QUFFM0QsTUFBTSxlQUFlO0lBQ2IsMkJBQTJCLENBQzdCLEdBQW9CLEVBQ3BCLEdBQXFCLEVBQ3JCLElBQTBCOztZQUUxQixNQUFNLElBQUksR0FBRyxNQUFNLHVCQUFXLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDckQsSUFBSSxJQUFJLEVBQUU7Z0JBQ04sR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO2dCQUN2QixJQUFJLEVBQUUsQ0FBQzthQUNWO2lCQUFNO2dCQUNILEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO29CQUNqQixLQUFLLEVBQUUsUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sWUFBWTtpQkFDN0MsQ0FBQyxDQUFDO2FBQ047UUFDTCxDQUFDO0tBQUE7SUFFSywwQkFBMEIsQ0FDOUIsR0FBb0IsRUFDcEIsR0FBcUIsRUFDckIsSUFBMEI7O1lBRXhCLE1BQU0sSUFBSSxHQUFHLE1BQU0sdUJBQVcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN6RCxJQUFJLElBQUksRUFBRTtnQkFDTixHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7Z0JBQ3ZCLElBQUksRUFBRSxDQUFDO2FBQ1Y7aUJBQU07Z0JBQ0gsR0FB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