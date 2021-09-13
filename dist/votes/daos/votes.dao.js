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
        }, { id: false });
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
    // async getAll(limit = 25, page = 0) {
    //   return this.Vote.find()
    //     .limit(limit)
    //     .skip(limit * page)
    //     .populate('userId')
    //     .populate('topicId')
    //     .exec();
    // }
    getAll(limit = 25, page = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.Vote
                .aggregate([
                { $match: {} },
                { $group: { _id: "$topicId" } },
                { $lookup: { from: "topics", localField: "_id", foreignField: "_id", as: "topic" } },
                { $lookup: { from: "users", localField: "topic.user", foreignField: "_id", as: "speaker" } },
                { $unset: ["speaker.heard", "speaker.age", "speaker.permissionFlags", "speaker.contactNumber"] },
                { $unwind: "$topic" },
                { $unwind: "$speaker" },
            ]);
        });
    }
    getSortedVotes() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.Vote
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
            return result;
        });
    }
    removeById(topicId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Vote.deleteOne({ _id: topicId }).exec();
        });
    }
}
exports.default = new VotesDao();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidm90ZXMuZGFvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdm90ZXMvZGFvcy92b3Rlcy5kYW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFDQSxzREFBOEI7QUFDOUIsa0RBQTBCO0FBQzFCLDhGQUFvRTtBQUVwRSxNQUFNLEdBQUcsR0FBb0IsSUFBQSxlQUFLLEVBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUV4RCxNQUFNLFFBQVE7SUFxQlo7UUFwQkEsV0FBTSxHQUFHLDBCQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsTUFBTSxDQUFDO1FBRTlDLGVBQVUsR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDM0IsR0FBRyxFQUFFLE1BQU07WUFDWCxJQUFJLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLE1BQU07Z0JBQ1osSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQzthQUMzQjtZQUNELE1BQU0sRUFBRTtnQkFDTixJQUFJLEVBQUUsTUFBTTtnQkFDWixHQUFHLEVBQUUsT0FBTzthQUNiO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLElBQUksRUFBRSxNQUFNO2dCQUNaLEdBQUcsRUFBRSxRQUFRO2FBQ2Q7U0FDRixFQUFFLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUE7UUFFaEIsU0FBSSxHQUFHLDBCQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFHbkUsR0FBRyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVLLE1BQU0sQ0FBQyxVQUF5Qjs7WUFDcEMsTUFBTSxNQUFNLEdBQUcsaUJBQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNsQyxNQUFNLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLGlCQUN4QixHQUFHLEVBQUUsaUJBQU8sQ0FBQyxRQUFRLEVBQUUsSUFDcEIs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