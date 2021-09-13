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
const log = (0, debug_1.default)('app:topics-dao');
class TopicsDao {
    constructor() {
        this.Schema = mongoose_service_1.default.getMongoose().Schema;
        this.topicSchema = new this.Schema({
            _id: String,
            name: String,
            user: { type: String, ref: 'Users' },
            theme: String,
            description: String,
            contact: String,
            institute: String,
            company: String,
            self_description: String
        }, { id: false });
        this.Topic = mongoose_service_1.default.getMongoose().model('Topics', this.topicSchema);
        log('Created new instance of TopicsDao');
    }
    addTopic(topicFields) {
        return __awaiter(this, void 0, void 0, function* () {
            const topicId = shortid_1.default.generate();
            const topic = new this.Topic(Object.assign({ _id: topicId }, topicFields));
            yield topic.save();
            return topicId;
        });
    }
    checkUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Topic.findOne({ user: userId })
                .populate('user', 'email picture age fullName companyOrInstitution')
                .exec();
        });
    }
    getTopicById(topicId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Topic.findOne({ _id: topicId })
                .populate('user', 'email picture age fullName companyOrInstitution')
                .exec();
        });
    }
    getTopics(limit = 25, page = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Topic.find()
                .limit(limit)
                .skip(limit * page)
                .populate('user', 'email picture age fullName companyOrInstitution')
                .exec();
        });
    }
    updateTopicById(topicId, topicFields) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingTopic = yield this.Topic.findOneAndUpdate({ _id: topicId }, { $set: topicFields }, { new: true }).exec();
            return existingTopic;
        });
    }
    removeTopicById(topicId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Topic.deleteOne({ _id: topicId }).exec();
        });
    }
}
exports.default = new TopicsDao();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9waWNzLmRhby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RvcGljcy9kYW9zL3RvcGljcy5kYW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFHQSxzREFBOEI7QUFDOUIsa0RBQTBCO0FBQzFCLDhGQUFxRTtBQUVyRSxNQUFNLEdBQUcsR0FBb0IsSUFBQSxlQUFLLEVBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUVyRCxNQUFNLFNBQVM7SUFpQlg7UUFoQkEsV0FBTSxHQUFHLDBCQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsTUFBTSxDQUFDO1FBRTlDLGdCQUFXLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQzFCLEdBQUcsRUFBRSxNQUFNO1lBQ1gsSUFBSSxFQUFFLE1BQU07WUFDWixJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUU7WUFDcEMsS0FBSyxFQUFFLE1BQU07WUFDYixXQUFXLEVBQUUsTUFBTTtZQUNuQixPQUFPLEVBQUUsTUFBTTtZQUNmLFNBQVMsRUFBRSxNQUFNO1lBQ2pCLE9BQU8sRUFBRyxNQUFNO1lBQ2hCLGdCQUFnQixFQUFHLE1BQU07U0FDNUIsRUFBRSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBRWxCLFVBQUssR0FBRywwQkFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBR3BFLEdBQUcsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFSyxRQUFRLENBQUMsV0FBMkI7O1lBQ3RDLE1BQU0sT0FBTyxHQUFHLGlCQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDbkMsTUFBTSxLQUFLLEdBQUcsSUFBSSxJQUFJLENBQUMsS0FBSyxpQkFDeEIsR0FBRyxFQUFFLE9BQU8sSUFDVCxXQUFXLEVBQ2hCLENBQUM7WUFDSCxNQUFNLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNuQixPQUFPLE9BQU8sQ0FBQztRQUNuQixDQUFDO0tBQUE7SUFFSyxTQUFTLENBQUMsTUFBYzs7WUFDMUIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFDLElBQUksRUFBRyxNQUFNLEVBQUMsQ0FBQztpQkFDbkMsUUFBUSxDQUFDLE1BQU0sRUFBRSxpREFBaUQsQ0FBQztpQkFDbkUsSUFBSSxFQUFFLENBQUM7UUFDbEIsQ0FBQztLQUFBO0lBRUssWUFBWSxDQUFDLE9BQWU7O1lBQzlCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLENBQUM7aUJBQ3BDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsaURBQWlELENBQUM7aUJBQ25FLElBQUksRUFBRSxDQUFDO1FBQ2xCLENBQUM7S0FBQTtJQUVLLFNBQVMsQ0FBQyxLQUFLLEdBQUcsRUFBRSxFQUFFLElBQUksR0FBRyxDQUFDOztZQUNoQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFO2lCQUNuQixLQUFLLENBQUMsS0FBSyxDQUFDO2lCQUNaLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO2lCQUNsQixRQUFRLENBQUMsTUFBTSxFQUFFLGlEQUFpRCxDQUFDO2lCQUNuRSxJQUFJLEVBQUUsQ0FBQztRQUNoQixDQUFDO0tBQUE7SUFFSyxlQUFlLENBQ2pCLE9BQWUsRUFDZixXQUF3Qzs7WUFFeEMsTUFBTSxhQUFhLEdBQUcsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUNuRCxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFDaEIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxDQUNoQixDQUFDLElBQUksRUFBRSxDQUFDO1lBRVQsT0FBTyxhQUFhLENBQUM7UUFDekIsQ0FBQztLQUFBO0lBRUssZUFBZSxDQUFDLE9BQWU7O1lBQ2pDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN6RCxDQUFDO0tBQUE7Q0FDSjtBQUVELGtCQUFlLElBQUksU0FBUyxFQUFFLENBQUMifQ==