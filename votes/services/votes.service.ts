import VotesDao from '../daos/votes.dao';
import { CRUD } from '../../common/interfaces/crud.interface';
import { CreateVoteDto } from '../dto/create.votes.dto';

class VotesService implements CRUD {
    async create(resource: CreateVoteDto) {
        return VotesDao.create(resource);
    }

    async deleteById(id: string) {
        return VotesDao.removeVoteById(id);
    }

    async list(limit: number, page: number) {
        return VotesDao.getVotes(limit, page);
    }

    async readByUserId(id: string) {
        return VotesDao.checkUser(id);
    }
}

export default new VotesService();