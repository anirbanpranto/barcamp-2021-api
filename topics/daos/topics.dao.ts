import { CreateTopicDto } from '../dto/create.topic.dto';
import { PatchTopicDto } from '../dto/patch.topic.dto';
import { PutTopicDto } from '../dto/put.topic.dto';
import shortid from 'shortid';
import debug from 'debug';
import mongooseService from '../../common/services/mongoose.service';

const log: debug.IDebugger = debug('app:topics-dao');

class TopicsDao {
    Schema = mongooseService.getMongoose().Schema;

    topicSchema = new this.Schema({
        _id: String,
        name: String,
        user: { type: String, ref: 'Users' },
        Theme: String,
        Description: String,
        Contact: String,
        Institute: String,
        Company : String,
        Self_Description : String
    }, { id: false });

    Topic = mongooseService.getMongoose().model('Topics', this.topicSchema);

    constructor() {
        log('Created new instance of TopicsDao');
    }

    async addTopic(topicFields: CreateTopicDto) {
        const topicId = shortid.generate();
        const topic = new this.Topic({
            _id: topicId,
            ...topicFields,
            permissionFlags: 1,
        });
        await topic.save();
        return topicId;
    }

    async checkUser(userId: string){
        return this.Topic.findOne({user : userId}).exec();
    }
    
    async getTopicById(topicId: string) {
        return this.Topic.findOne({ _id: topicId }).exec();
    }
    
    async getTopics(limit = 25, page = 0) {
        return this.Topic.find()
            .limit(limit)
            .skip(limit * page)
            .populate('user')
            .exec();
    }

    async updateTopicById(
        topicId: string,
        topicFields: PatchTopicDto | PutTopicDto
    ) {
        const existingTopic = await this.Topic.findOneAndUpdate(
            { _id: topicId },
            { $set: topicFields },
            { new: true }
        ).exec();
    
        return existingTopic;
    }

    async removeTopicById(topicId: string) {
        return this.Topic.deleteOne({ _id: topicId }).exec();
    }
}

export default new TopicsDao();