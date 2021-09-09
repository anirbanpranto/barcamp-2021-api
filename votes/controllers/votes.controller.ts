import express from 'express';
import votesService from '../services/votes.service';
import debug from 'debug';

class VotesController {
  async listVotes(req: express.Request, res: express.Response) {
    const votes = await votesService.list(1000, 0);
    res.status(200).send(votes);
  }

  async createVote(req: express.Request, res: express.Response) {
    const vote = await votesService.create(req.body);
    res.status(201).send(vote);
  }

  async getVote(req: express.Request, res: express.Response) {
    const vote = await votesService.readByUserId(req.params.userId);
    res.status(200).send(vote);
  }
}

export default new VotesController();