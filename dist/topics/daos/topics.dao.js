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
            Theme: String,
            Description: String,
            Contact: String,
            Institute: String,
            Company: String,
            Self_Description: String
        }, { id: false });
        this.Topic = mongoose_service_1.default.getMongoose().model('Topics', this.topicSchema);
        log('Created new instance of TopicsDao');
    }
    addTopic(topicFields) {
        return __awaiter(this, void 0, void 0, function* () {
            const topicId = shortid_1.default.generate();
            const topic = new this.Topic(Object.assign(Object.assign({ _id: topicId }, topicFields), { permissionFlags: 1 }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9waWNzLmRhby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RvcGljcy9kYW9zL3RvcGljcy5kYW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFHQSxzREFBOEI7QUFDOUIsa0RBQTBCO0FBQzFCLDhGQUFxRTtBQUVyRSxNQUFNLEdBQUcsR0FBb0IsSUFBQSxlQUFLLEVBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUVyRCxNQUFNLFNBQVM7SUFpQlg7UUFoQkEsV0FBTSxHQUFHLDBCQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsTUFBTSxDQUFDO1FBRTlDLGdCQUFXLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQzFCLEdBQUcsRUFBRSxNQUFNO1lBQ1gsSUFBSSxFQUFFLE1BQU07WUFDWixJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUU7WUFDcEMsS0FBSyxFQUFFLE1BQU07WUFDYixXQUFXLEVBQUUsTUFBTTtZQUNuQixPQUFPLEVBQUUsTUFBTTtZQUNmLFNBQVMsRUFBRSxNQUFNO1lBQ2pCLE9BQU8sRUFBRyxNQUFNO1lBQ2hCLGdCQUFnQixFQUFHLE1BQU07U0FDNUIsRUFBRSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBRWxCLFVBQUssR0FBRywwQkFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBR3BFLEdBQUcsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFSyxRQUFRLENBQUMsV0FBMkI7O1lBQ3RDLE1BQU0sT0FBTyxHQUFHLGlCQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDbkMsTUFBTSxLQUFLLEdBQUcsSUFBSSxJQUFJLENBQUMsS0FBSywrQkFDeEIsR0FBRyxFQUFFLE9BQU8sSUFDVCxXQUFXLEtBQ2QsZUFBZSxFQUFFLENBQUMsSUFDcEIsQ0FBQztZQUNILE1BQU0sS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ25CLE9BQU8sT0FBTyxDQUFDO1FBQ25CLENBQUM7S0FBQTtJQUVLLFNBQVMsQ0FBQyxNQUFjOztZQUMxQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUMsSUFBSSxFQUFHLE1BQU0sRUFBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdEQsQ0FBQztLQUFBO0lBRUssWUFBWSxDQUFDLE9BQWU7O1lBQzlCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN2RCxDQUFDO0tBQUE7SUFFSyxTQUFTLENBQUMsS0FBSyxHQUFHLEVBQUUsRUFBRSxJQUFJLEdBQUcsQ0FBQzs7WUFDaEMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTtpQkFDbkIsS0FBSyxDQUFDLEtBQUssQ0FBQztpQkFDWixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztpQkFDbEIsUUFBUSxDQUFDLE1BQU0sQ0FBQztpQkFDaEIsSUFBSSxFQUFFLENBQUM7UUFDaEIsQ0FBQztLQUFBO0lBRUssZUFBZSxDQUNqQixPQUFlLEVBQ2YsV0FBd0M7O1lBRXhDLE1BQU0sYUFBYSxHQUFHLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FDbkQsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQ2hCLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUNyQixFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FDaEIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUVULE9BQU8sYUFBYSxDQUFDO1FBQ3pCLENBQUM7S0FBQTtJQUVLLGVBQWUsQ0FBQyxPQUFlOztZQUNqQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDekQsQ0FBQztLQUFBO0NBQ0o7QUFFRCxrQkFBZSxJQUFJLFNBQVMsRUFBRSxDQUFDIn0=