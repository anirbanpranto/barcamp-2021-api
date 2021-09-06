import { CreateVoteDto } from '../dto/create.votes.dto';
import shortid from 'shortid';
import debug from 'debug';
import mongooseService from '../../common/services/mongoose.service'

const log: debug.IDebugger = debug('app:in-memory-dao');

class VotesDao {
  Schema = mongooseService.getMongoose().Schema;

  voteSchema = new this.Schema({
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
  }, { id: false })

  Vote = mongooseService.getMongoose().model('Votes', this.voteSchema);

  constructor() {
    log('Created new instance of VotesDao'); 
  }

  async create(voteFields: CreateVoteDto): Promise<any> {
    const voteId = shortid.generate();
    const vote = new this.Vote({
      _id: shortid.generate(),
      ...voteFields,
      permissionFlags: 1,
    });
    await vote.save();

    return voteId
  }

  async checkUser(userId: string){
    return this.Vote.find({userId}).exec();
}

  async getVotes(limit = 25, page = 0) {
    return this.Vote.find()
    .limit(limit)
    .skip(limit * page)
    .populate('topic')
    .exec();
  }

  async removeVoteById(topicId: string) {
    return this.Vote.deleteOne({ _id: topicId }).exec();
}
}

export default new VotesDao();