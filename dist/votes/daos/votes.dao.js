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
            vote: ['topic', 'speaker'],
            userId: {
                type: String,
                ref: "Users"
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
            const vote = new this.Vote(Object.assign(Object.assign({ _id: shortid_1.default.generate() }, voteFields), { permissionFlags: 1 }));
            yield vote.save();
            return voteId;
        });
    }
    checkUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Vote.find({ userId }).exec();
        });
    }
    getVotes(limit = 25, page = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Vote.find()
                .limit(limit)
                .skip(limit * page)
                .populate('topic')
                .exec();
        });
    }
    removeVoteById(topicId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Vote.deleteOne({ _id: topicId }).exec();
        });
    }
}
exports.default = new VotesDao();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidm90ZXMuZGFvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdm90ZXMvZGFvcy92b3Rlcy5kYW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFDQSxzREFBOEI7QUFDOUIsa0RBQTBCO0FBQzFCLDhGQUFvRTtBQUVwRSxNQUFNLEdBQUcsR0FBb0IsSUFBQSxlQUFLLEVBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUV4RCxNQUFNLFFBQVE7SUFrQlo7UUFqQkEsV0FBTSxHQUFHLDBCQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsTUFBTSxDQUFDO1FBRTlDLGVBQVUsR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDM0IsR0FBRyxFQUFFLE1BQU07WUFDWCxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDO1lBQzFCLE1BQU0sRUFBRTtnQkFDTixJQUFJLEVBQUUsTUFBTTtnQkFDWixHQUFHLEVBQUUsT0FBTzthQUNiO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLElBQUksRUFBRSxNQUFNO2dCQUNaLEdBQUcsRUFBRSxRQUFRO2FBQ2Q7U0FDRixFQUFFLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUE7UUFFakIsU0FBSSxHQUFHLDBCQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFHbkUsR0FBRyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVLLE1BQU0sQ0FBQyxVQUF5Qjs7WUFDcEMsTUFBTSxNQUFNLEdBQUcsaUJBQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNsQyxNQUFNLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLCtCQUN4QixHQUFHLEVBQUUsaUJBQU8sQ0FBQyxRQUFRLEVBQUUsSUFDcEIsVUFBVSxLQUNiLGVBQWUsRUFBRSxDQUFDLElBQ2xCLENBQUM7WUFDSCxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUVsQixPQUFPLE1BQU0sQ0FBQTtRQUNmLENBQUM7S0FBQTtJQUVLLFNBQVMsQ0FBQyxNQUFjOztZQUM1QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMzQyxDQUFDO0tBQUE7SUFFTyxRQUFRLENBQUMsS0FBSyxHQUFHLEVBQUUsRUFBRSxJQUFJLEdBQUcsQ0FBQzs7WUFDakMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtpQkFDdEIsS0FBSyxDQUFDLEtBQUssQ0FBQztpQkFDWixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztpQkFDbEIsUUFBUSxDQUFDLE9BQU8sQ0FBQztpQkFDakIsSUFBSSxFQUFFLENBQUM7UUFDVixDQUFDO0tBQUE7SUFFSyxjQUFjLENBQUMsT0FBZTs7WUFDbEMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3hELENBQUM7S0FBQTtDQUNBO0FBRUQsa0JBQWUsSUFBSSxRQUFRLEVBQUUsQ0FBQyJ9