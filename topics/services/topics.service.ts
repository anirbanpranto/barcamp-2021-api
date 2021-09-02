import TopicsDao from '../daos/topics.dao';
import { CRUD } from '../../common/interfaces/crud.interface';
import { CreateTopicDto } from '../dto/create.topic.dto';
import { PutTopicDto } from '../dto/put.topic.dto';
import { PatchTopicDto } from '../dto/patch.topic.dto';
import usersService from '../../users/services/users.service';
import topicsDao from '../daos/topics.dao';

class TopicsService implements CRUD {
    async create(resource: CreateTopicDto) {
        return TopicsDao.addTopic(resource);
    }

    async deleteById(id: string) {
        return TopicsDao.removeTopicById(id);
    }

    async list(limit: number, page: number) {
        return TopicsDao.getTopics(limit, page);
    }

    async findUser(userId : string) {
        return topicsDao.checkUser(userId);
    }

    async patchById(id: string, resource: PatchTopicDto) {
        return TopicsDao.updateTopicById(id, resource);
    }

    async readById(id: string) {
        return TopicsDao.getTopicById(id);
    }

    async putById(id: string, resource: PutTopicDto) {
        return TopicsDao.updateTopicById(id, resource);
    }
}

export default new TopicsService();