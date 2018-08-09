import * as express from 'express';
import TweetDatabase from './tweet-database';

class App {
  public app: express.Application;
  private db: TweetDatabase;

  constructor() {
    this.app = express();
    this.db = new TweetDatabase();
    this.run();
  }

  run() {
    this.app.get('/getTweets', (req, res) => {
      console.log('trying api');
      this.db.getTweets(10).then(tweets => {
        res.send(tweets);
      });
    });
  }
}

export default new App().app;
