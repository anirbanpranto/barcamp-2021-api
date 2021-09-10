// we import express to add types to the request/response objects from our controller functions
import express from 'express';

import topicsService from '../services/topics.service';

// we use debug with a custom context as described in Part 1
import debug from 'debug';

const log: debug.IDebugger = debug('app:topics-controller');
class TopicsController {
    async listTopics(req: express.Request, res: express.Response) {
        const topics = await topicsService.list(100, 0);
        res.status(200).send(topics);
    }

    async getTopicById(req: express.Request, res: express.Response) {
        const topic = await topicsService.readById(req.body.id);
        res.status(200).send(topic);
    }

    async getTopicByUser(req: express.Request, res: express.Response) {
      log(req.body);
      const topic = await topicsService.findByUser(req.body.id);
      res.status(200).send(topic);
  }

    async createTopic(req: express.Request, res: express.Response) {
        const topicId = await topicsService.create(req.body);
        res.status(201).send({ id: topicId });
    }

    async patch(req: express.Request, res: express.Response) {
        log(await topicsService.patchById(req.body.id, req.body));
        res.status(204).send();
    }

    async put(req: express.Request, res: express.Response) {
        log(await topicsService.putById(req.body.id, req.body));
        res.status(204).send();
    }

    async removeTopic(req: express.Request, res: express.Response) {
        log(await topicsService.deleteById(req.body.id));
        res.status(204).send();
    }
}

export default new TopicsController();