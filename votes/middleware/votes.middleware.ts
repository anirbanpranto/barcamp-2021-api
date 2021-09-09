import express from 'express';
import voteService from '../services/votes.service';
import userService from '../../users/services/users.service';
import topicService from '../../topics/services/topics.service';
import debug from 'debug';
import votesService from '../services/votes.service';

const log: debug.IDebugger = debug('app:users-controller');

class VotesMiddleware {
  async validateUserExists(
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
  ) {
      const user = await userService.readById(req.body.userId);
      if (user) {
          res.locals.user = user;
          next();
      } else {
          res.status(404).send({
              error: `User ${req.body.userId} not found`,
          });
      }
  }

  async validateTopicExists(
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
  ) {
    const topic = await topicService.readById(req.body.topicId);
    if (topic) {
        next();
    } else {
        res.status(404).send({
            error: `Topic ${req.body.topicId} not found`,
        });
    }
  }

  async validateVoteExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const vote = await voteService.getByAllFields(req.body);
    if (vote) {
      res.status(404).send({
        error: `Already voted`,
      });
      
    } else {
      next();
    }
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

export default new VotesMiddleware();