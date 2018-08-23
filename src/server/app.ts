import * as express from 'express';
import { Application, Request, Response, RequestHandler } from 'express';
import TweetDatabase from './tweet-database';

class App {
  public app: Application;
  private db: TweetDatabase;

  constructor() {
    this.app = express();
    this.db = new TweetDatabase();
    this.run();
  }

  run() {
    this.app.get(
      '/getTweets',
      (req: Request, res: Response, next: RequestHandler) => {
        const queryParams = req.query;
        const page = findIntegerQueryParam(queryParams, 'page', 1);
        const limit = findIntegerQueryParam(queryParams, 'limit', 10);
        const offset = page - 1;

        this.db.getTweets(offset, limit).then(
          tweets => {
            res.send(tweets);
          },
          error => {
            console.log('Error:', error);
            res.sendStatus(500);
          },
        );
      },
    );
  }
}

export const findIntegerQueryParam = (
  queryParams: any,
  name: string,
  defaultValue: number,
): number => {
  let value = parseInt(queryParams[name]);
  return !isNaN(value) ? value : defaultValue;
};

export default new App().app;
