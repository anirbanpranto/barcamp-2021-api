import express from 'express';
import voteService from '../services/votes.service';
import userService from '../../users/services/users.service';
import debug from 'debug';

const log: debug.IDebugger = debug('app:users-controller');

class VotesMiddleware {
  async validateUserExists(
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
  ) {
      const user = await userService.readById(req.params.userId);
      if (user) {
          res.locals.user = user;
          next();
      } else {
          res.status(404).send({
              error: `User ${req.params.userId} not found`,
          });
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