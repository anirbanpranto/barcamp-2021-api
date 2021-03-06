import express from 'express';
import voteService from '../services/votes.service';
import userService from '../../users/services/users.service';
import topicService from '../../topics/services/topics.service';
import debug from 'debug';
import votesService from '../services/votes.service';

const log: debug.IDebugger = debug('app:users-controller');

class VotesMiddleware {
  async validateUserExistsWithParam(
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
  ) {
      const user = await userService.readById(req.body.id);
      if (user) {
          res.locals.user = user;
          next();
      } else {
          res.status(404).send({
              error: `User ${req.body.userId} not found`,
          });
      }
  }

  async validateUserExistsWithBody(
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

  async validateUserIsOwner(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
      if (res.locals.jwt.userId === req.body.userId) {
          next();
      } else {
          return res.status(403).send({
            error: `You do not have access to this`,
          });
      }
  }

  async validateTopicExistsInVote(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const topicExistsInVote = await voteService.readByTopicId(req.body.id);

    if (topicExistsInVote.length > 0) {
      return next();
    }else{
      return res.status(404).send({
        error: `Topic not found in vote`,
      }).end();
    }
  }

  async validateTopicExists(
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
  ) {
    const topicArr = req.body.topicId
    let errArr: Array<String> = [];
    if(topicArr.length){
      var checkExist = new Promise((resolve, reject) => {
          topicArr.forEach(async (topicId: string, index: number, array: any) => {
            const singleTopic = await topicService.readById(topicId);
    
            if (!singleTopic) {
              errArr.push(`${topicId}`)
            }

            if (index === array.length -1) resolve(1);
          });
      });

      checkExist
        .then(() => {
          if (errArr.length > 0) {
            return res.status(404).send({
              error: `Topic Validation Failed`,
              errArr
            }).end();
          }else{
            next();
          }
        })
        .catch(() => {
          return res.status(500).send({
            error: `Topic Validation Failed`,
          });
        })
    }
  }

  async validateAlreadyVoted(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const user = await votesService.readByUserId(req.body.userId);
    if (user.length === 0) {
      next();
    }else{
      return res.status(404).send({
        error: `User already voted`,
      }).end();
    }
  }

  async validateVoteArrDuplicates(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const voteArr: Array<String> = req.body.topicId

    const toFindDuplicates = (voteArr: any) => voteArr.filter((item: any, index: any) => voteArr.indexOf(item) !== index)
    const duplicateElement = toFindDuplicates(voteArr);

    if (duplicateElement.length > 0) {
      return res.status(404).send({
        error: `Duplicate vote`,
        duplicateElement
      }).end();
    }else{
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

  async extractTopicId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    log('extractTopicId')
    req.body.id = req.params.topicId;
    next();
  }
}

export default new VotesMiddleware();