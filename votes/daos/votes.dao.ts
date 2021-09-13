import { CreateVoteDto } from '../dto/create.votes.dto';
import shortid from 'shortid';
import debug from 'debug';
import mongooseService from '../../common/services/mongoose.service'

const log: debug.IDebugger = debug('app:in-memory-dao');

class VotesDao {
  Schema = mongooseService.getMongoose().Schema;

  voteSchema = new this.Schema({
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
  }, { id: false})

  Vote = mongooseService.getMongoose().model('Votes', this.voteSchema);

  constructor() {
    log('Created new instance of VotesDao'); 
  }

  async create(voteFields: CreateVoteDto): Promise<any> {
    const voteId = shortid.generate();
    const vote = new this.Vote({
      _id: shortid.generate(),
      ...voteFields
    });
    await vote.save();

    return voteId
  }

  async getByAllFields(voteFields: CreateVoteDto) {
    return this.Vote.findOne({...voteFields}).exec();
  }

  async getByTopicId(topicId: string) {
    return this.Vote.find({topicId}).exec();
  }

  async getTotalVotesByTopicId(topicId: string) {
    return this.Vote.countDocuments({ topicId });
  }

  async getByUserId(userId: string){
    return await this.Vote  
      .aggregate([
        { $match  : { userId }  },
        { $group  : { _id: "$topicId"} },
        { $lookup : { from: "topics", localField: "_id", foreignField: "_id", as: "topic" } },
        { $lookup : { from: "users", localField: "topic.user", foreignField: "_id", as: "speaker" } },
        { $unset: ["speaker.heard", "speaker.age", "speaker.permissionFlags", "speaker.contactNumber"] },
        { $unwind : "$topic" },
        { $unwind : "$speaker" },
      ])
  }

  async getAll(limit = 25, page = 0) {
    return this.Vote.find()
      .limit(limit)
      .skip(limit * page)
      .populate('userId')
      .populate('topicId')
      .exec();
  }

  async getSortedVotes () {
    const result = await this.Vote
      .aggregate([
        { $match  : {}  },
        { $group  : { _id: "$topicId", count: {$sum: 1} } },
        { $sort   : { count : -1 } },
        { $lookup : { from: "topics", localField: "_id", foreignField: "_id", as: "topic" } },
        { $lookup : { from: "users", localField: "topic.user", foreignField: "_id", as: "user" } },
        { $unset: ["user.heard", "user.age", "user.permissionFlags", "user.contactNumber"] },
        { $unwind : "$topic" },
        { $unwind : "$user" },
      ])

    return result;
  }

  async removeById(topicId: string) {
    return this.Vote.deleteOne({ _id: topicId }).exec();
  }
}

export default new VotesDao();