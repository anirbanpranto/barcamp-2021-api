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
const log = debug_1.default('app:topics-dao');
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
            return this.Topic.findOne({ user: userId }).exec();
        });
    }
    getTopicById(topicId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Topic.findOne({ _id: topicId }).exec();
        });
    }
    getTopics(limit = 25, page = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Topic.find()
                .limit(limit)
                .skip(limit * page)
                .populate('user')
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9waWNzLmRhby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RvcGljcy9kYW9zL3RvcGljcy5kYW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFHQSxzREFBOEI7QUFDOUIsa0RBQTBCO0FBQzFCLDhGQUFxRTtBQUVyRSxNQUFNLEdBQUcsR0FBb0IsZUFBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFFckQsTUFBTSxTQUFTO0lBaUJYO1FBaEJBLFdBQU0sR0FBRywwQkFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLE1BQU0sQ0FBQztRQUU5QyxnQkFBVyxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUMxQixHQUFHLEVBQUUsTUFBTTtZQUNYLElBQUksRUFBRSxNQUFNO1lBQ1osSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFO1lBQ3BDLEtBQUssRUFBRSxNQUFNO1lBQ2IsV0FBVyxFQUFFLE1BQU07WUFDbkIsT0FBTyxFQUFFLE1BQU07WUFDZixTQUFTLEVBQUUsTUFBTTtZQUNqQixPQUFPLEVBQUcsTUFBTTtZQUNoQixnQkFBZ0IsRUFBRyxNQUFNO1NBQzVCLEVBQUUsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUVsQixVQUFLLEdBQUcsMEJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUdwRSxHQUFHLENBQUMsbUNBQW1DLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUssUUFBUSxDQUFDLFdBQTJCOztZQUN0QyxNQUFNLE9BQU8sR0FBRyxpQkFBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ25DLE1BQU0sS0FBSyxHQUFHLElBQUksSUFBSSxDQUFDLEtBQUssaUJBQ3hCLEdBQUcsRUFBRSxPQUFPLElBQ1QsV0FBVyxFQUNoQixDQUFDO1lBQ0gsTUFBTSxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDbkIsT0FBTyxPQUFPLENBQUM7UUFDbkIsQ0FBQztLQUFBO0lBRUssU0FBUyxDQUFDLE1BQWM7O1lBQzFCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBQyxJQUFJLEVBQUcsTUFBTSxFQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN0RCxDQUFDO0tBQUE7SUFFSyxZQUFZLENBQUMsT0FBZTs7WUFDOUIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZELENBQUM7S0FBQTtJQUVLLFNBQVMsQ0FBQyxLQUFLLEdBQUcsRUFBRSxFQUFFLElBQUksR0FBRyxDQUFDOztZQUNoQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFO2lCQUNuQixLQUFLLENBQUMsS0FBSyxDQUFDO2lCQUNaLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO2lCQUNsQixRQUFRLENBQUMsTUFBTSxDQUFDO2lCQUNoQixJQUFJLEVBQUUsQ0FBQztRQUNoQixDQUFDO0tBQUE7SUFFSyxlQUFlLENBQ2pCLE9BQWUsRUFDZixXQUF3Qzs7WUFFeEMsTUFBTSxhQUFhLEdBQUcsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUNuRCxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFDaEIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxDQUNoQixDQUFDLElBQUksRUFBRSxDQUFDO1lBRVQsT0FBTyxhQUFhLENBQUM7UUFDekIsQ0FBQztLQUFBO0lBRUssZUFBZSxDQUFDLE9BQWU7O1lBQ2pDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN6RCxDQUFDO0tBQUE7Q0FDSjtBQUVELGtCQUFlLElBQUksU0FBUyxFQUFFLENBQUMifQ==