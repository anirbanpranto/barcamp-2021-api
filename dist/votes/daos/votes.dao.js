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
const shortid_1 = __importDefault(require("shortid"));
const debug_1 = __importDefault(require("debug"));
const mongoose_service_1 = __importDefault(require("../../common/services/mongoose.service"));
const log = (0, debug_1.default)('app:in-memory-dao');
class VotesDao {
    constructor() {
        this.Schema = mongoose_service_1.default.getMongoose().Schema;
        this.voteSchema = new this.Schema({
            _id: String,
            vote: {
                type: String,
                enum: ['topic', 'speaker'],
            },
            userId: {
                type: String,
                ref: 'Users'
            },
            topicId: {
                type: String,
                ref: 'Topics'
            },
        }, { id: false, timestamps: true });
        this.Vote = mongoose_service_1.default.getMongoose().model('Votes', this.voteSchema);
        log('Created new instance of VotesDao');
    }
    create(voteFields) {
        return __awaiter(this, void 0, void 0, function* () {
            const voteId = shortid_1.default.generate();
            const vote = new this.Vote(Object.assign({ _id: shortid_1.default.generate() }, voteFields));
            yield vote.save();
            return voteId;
        });
    }
    getByAllFields(voteFields) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Vote.findOne(Object.assign({}, voteFields)).exec();
        });
    }
    getByTopicId(topicId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Vote.find({ topicId }).exec();
        });
    }
    getTotalVotesByTopicId(topicId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Vote.countDocuments({ topicId });
        });
    }
    getByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.Vote
                .aggregate([
                { $match: { userId } },
                { $group: { _id: "$topicId" } },
                { $lookup: { from: "topics", localField: "_id", foreignField: "_id", as: "topic" } },
                { $lookup: { from: "users", localField: "topic.user", foreignField: "_id", as: "speaker" } },
                { $unset: ["speaker.heard", "speaker.age", "speaker.permissionFlags", "speaker.contactNumber"] },
                { $unwind: "$topic" },
                { $unwind: "$speaker" },
            ]);
        });
    }
    getAll(limit = 25, page = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Vote.find()
                .limit(limit)
                .skip(limit * page)
                .populate('userId')
                .populate('topicId')
                .exec();
        });
    }
    getSortedVotes() {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.Vote
                .aggregate([
                { $match: {} },
                { $group: { _id: "$topicId", count: { $sum: 1 } } },
                { $sort: { count: -1 } },
                { $lookup: { from: "topics", localField: "_id", foreignField: "_id", as: "topic" } },
                { $lookup: { from: "users", localField: "topic.user", foreignField: "_id", as: "user" } },
                { $unset: ["user.heard", "user.age", "user.permissionFlags", "user.contactNumber"] },
                { $unwind: "$topic" },
                { $unwind: "$user" },
            ]);
            result = result.slice(0, result.length <= 15 ? result.length : 15);
            return result;
        });
    }
    removeById(topicId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Vote.deleteOne({ _id: topicId }).exec();
        });
    }
    removeByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Vote.deleteMany({ userId }).exec();
        });
    }
}
exports.default = new VotesDao();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidm90ZXMuZGFvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdm90ZXMvZGFvcy92b3Rlcy5kYW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFDQSxzREFBOEI7QUFDOUIsa0RBQTBCO0FBQzFCLDhGQUFvRTtBQUVwRSxNQUFNLEdBQUcsR0FBb0IsSUFBQSxlQUFLLEVBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUV4RCxNQUFNLFFBQVE7SUFxQlo7UUFwQkEsV0FBTSxHQUFHLDBCQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsTUFBTSxDQUFDO1FBRTlDLGVBQVUsR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDM0IsR0FBRyxFQUFFLE1BQU07WUFDWCxJQUFJLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLE1BQU07Z0JBQ1osSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQzthQUMzQjtZQUNELE1BQU0sRUFBRTtnQkFDTixJQUFJLEVBQUUsTUFBTTtnQkFDWixHQUFHLEVBQUUsT0FBTzthQUNiO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLElBQUksRUFBRSxNQUFNO2dCQUNaLEdBQUcsRUFBRSxRQUFRO2FBQ2Q7U0FDRixFQUFFLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQTtRQUVsQyxTQUFJLEdBQUcsMEJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUduRSxHQUFHLENBQUMsa0NBQWtDLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUssTUFBTSxDQUFDLFVBQXlCOztZQUNwQyxNQUFNLE1BQU0sR0FBRyxpQkFBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2xDLE1BQU0sSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksaUJBQ3hCLEdBQUcsRUFBRSxpQkFBTyxD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