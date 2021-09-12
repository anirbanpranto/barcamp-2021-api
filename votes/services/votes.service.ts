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

    async list(limit: number, page: number) {
        return VotesDao.getAll(limit, page);
    }

    async readByUserId(id: string) {
        return VotesDao.checkUser(id);
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
}

export default new VotesService();