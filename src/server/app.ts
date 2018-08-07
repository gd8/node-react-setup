import * as express from 'express';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.run();
  }

  run() {
    this.app.get('/api', (req, res) => {
      console.log('trying api');
      res.send('Hello World');
    });
  }
}

export default new App().app;
