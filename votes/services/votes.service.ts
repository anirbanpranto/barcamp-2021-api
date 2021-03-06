import VotesDao from '../daos/votes.dao';
import { CRUD } from '../../common/interfaces/crud.interface';
import { CreateVoteDto } from '../dto/create.votes.dto';

class VotesService implements CRUD {
    async create(resource: CreateVoteDto) {
        return VotesDao.create(resource);
    }

    async deleteById(id: string) {
        return VotesDao.removeById(id);
    }

    async deleteByUserId(id: string) {
        return VotesDao.removeByUserId(id);
    }

    async list(limit: number, page: number) {
        return VotesDao.getAll(limit, page);
    }

    async readByUserId(id: string) {
        return VotesDao.getByUserId(id);
    }

    async readByTopicId(id: string) {
      return VotesDao.getByTopicId(id);
    }

    async getTotalVotesByTopicId(id: string) {
      return VotesDao.getTotalVotesByTopicId(id);
    }

    async getByAllFields( resource: CreateVoteDto) {
      return VotesDao.getByAllFields(resource);
    }

    async getLeaderboard() {
      return VotesDao.getSortedVotes();
    }
}

export default new VotesService();