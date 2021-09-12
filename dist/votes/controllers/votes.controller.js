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
const debug_1 = __importDefault(require("debug"));
const log = (0, debug_1.default)('app:votes-controller');
class VotesController {
    listVotes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const votes = yield votes_service_1.default.list(1000, 0);
            res.status(200).send(votes);
        });
    }
    createVote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const topicArr = req.body.topicId;
            var sucArr = [];
            try {
                yield topicArr.forEach((topicId) => __awaiter(this, void 0, void 0, function* () {
                    let vote = yield votes_service_1.default.create({
                        userId: req.body.userId,
                        topicId,
                        vote: req.body.vote,
                    });
                    sucArr.push(vote);
                }));
                return res.status(201).send({
                    sucArr
                });
            }
            catch (error) {
                return res.status(500).json({ error });
            }
        });
    }
    getVotesByTopicId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const votes = yield votes_service_1.default.getTotalVotesByTopicId(req.body.id);
            res.status(200).send(votes.toString());
        });
    }
    getVote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const vote = yield votes_service_1.default.readByUserId(req.params.userId);
            res.status(200).send(vote);
        });
    }
}
exports.default = new VotesController();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidm90ZXMuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3ZvdGVzL2NvbnRyb2xsZXJzL3ZvdGVzLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFDQSw4RUFBcUQ7QUFDckQsa0RBQTBCO0FBRTFCLE1BQU0sR0FBRyxHQUFvQixJQUFBLGVBQUssRUFBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBRTNELE1BQU0sZUFBZTtJQUNiLFNBQVMsQ0FBQyxHQUFvQixFQUFFLEdBQXFCOztZQUN6RCxNQUFNLEtBQUssR0FBRyxNQUFNLHVCQUFZLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMvQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QixDQUFDO0tBQUE7SUFFSyxVQUFVLENBQUMsR0FBb0IsRUFBRSxHQUFxQjs7WUFDMUQsTUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDbEMsSUFBSSxNQUFNLEdBQVEsRUFBRSxDQUFDO1lBRXJCLElBQUk7Z0JBQ0YsTUFBTSxRQUFRLENBQUMsT0FBTyxDQUFDLENBQU8sT0FBWSxFQUFFLEVBQUU7b0JBQzVDLElBQUksSUFBSSxHQUFHLE1BQU0sdUJBQVksQ0FBQyxNQUFNLENBQUM7d0JBQ25DLE1BQU0sRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU07d0JBQ3ZCLE9BQU87d0JBQ1AsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSTtxQkFDcEIsQ0FBQyxDQUFDO29CQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3BCLENBQUMsQ0FBQSxDQUFDLENBQUE7Z0JBQ0YsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztvQkFDMUIsTUFBTTtpQkFDUCxDQUFDLENBQUM7YUFDSjtZQUFDLE9BQU8sS0FBSyxFQUFFO2dCQUNkLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDO2FBQ3RDO1FBQ0gsQ0FBQztLQUFBO0lBRUssaUJBQWlCLENBQUMsR0FBb0IsRUFBRSxHQUFxQjs7WUFDakUsTUFBTSxLQUFLLEdBQUcsTUFBTSx1QkFBWSxDQUFDLHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDckUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDekMsQ0FBQztLQUFBO0lBRUssT0FBTyxDQUFDLEdBQW9CLEVBQUUsR0FBcUI7O1lBQ3ZELE1BQU0sSUFBSSxHQUFHLE1BQU0sdUJBQVksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNoRSxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QixDQUFDO0tBQUE7Q0FDRjtBQUVELGtCQUFlLElBQUksZUFBZSxFQUFFLENBQUMifQ==