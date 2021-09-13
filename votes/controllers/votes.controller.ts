import express from 'express';
import votesService from '../services/votes.service';
import debug from 'debug';

const log: debug.IDebugger = debug('app:votes-controller');

class VotesController {
  async listVotes(req: express.Request, res: express.Response) {
    const votes = await votesService.list(1000, 0);
    res.status(200).send(votes);
  }

  async createVote(req: express.Request, res: express.Response) {
    const topicArr = req.body.topicId;
    var sucArr: any = [];

    try {
      await topicArr.forEach(async (topicId: any) => {
        let vote = await votesService.create({
          userId: req.body.userId,
          topicId,
          vote: req.body.vote,
        });
        sucArr.push(vote);
      })
      return res.status(201).send({
        sucArr
      });
    } catch (error) {
      return res.status(500).json({error});
    }
  }

  async getVotesByTopicId(req: express.Request, res: express.Response) {
    const votes = await votesService.getTotalVotesByTopicId(req.body.id);
    res.status(200).send(votes.toString());
  }

  async getVote(req: express.Request, res: express.Response) {
    const vote = await votesService.readByUserId(req.params.userId);
    res.status(200).send(vote);
  }

  async getLeaderboard(req: express.Request, res: express.Response) {
    const leaderboard = await votesService.getLeaderboard();
    res.status(200).send(leaderboard);
  }
}

export default new VotesController();