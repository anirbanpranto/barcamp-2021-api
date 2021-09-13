import express from 'express';
import userService from '../../users/services/users.service'
import topicService from '../services/topics.service';
import debug from 'debug';

const log: debug.IDebugger = debug('app:topics-controller');
class TopicsMiddleware {
    async validateUserDoesntHaveTopic(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const user = await topicService.findByUser(req.body.user);
        console.log(user);
        if (user) {
            res.status(400).send({ error: `A topic for this user already exists` });
        } else {
            next();
        }
    }
    
    async validateUserExists(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const user = await userService.readById(req.body.user);
        if (user) {
            res.locals.user = user;
            next();
        } else {
            res.status(404).send({
                error: `User ${req.body.user} not found`,
            });
        }
    }

    async validateTopicExists(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const topic = await topicService.readById(req.params.topicId);
        if (topic) {
            res.locals.topic = topic;
            next();
        } else {
            res.status(404).send({
                error: `Topic ${req.params.topicId} not found`,
            });
        }
    }

    async validateUserIsOwner(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        if (res.locals.jwt.userId === req.body.user) {
            next();
        } else {
            return res.status(403).send({
              error: `You do not have access to this`,
            });
        }
    }

    async extractTopicId(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        req.body.id = req.params.topicId;
        next();
    }

    async extractUserId(
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) {
        req.body.id = req.params.userId;
        next();
    }
    
}

export default new TopicsMiddleware();