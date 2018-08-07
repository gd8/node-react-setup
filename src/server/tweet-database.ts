import * as path from 'path';
import { verbose, Database } from 'sqlite3';

export class TweetDatabase {
  private db: Database;
  private dbFile: string;

  constructor() {
    const sqlite3 = verbose();
    this.dbFile = path.resolve(process.cwd(), 'data/tweets.db');
    this.db = new sqlite3.Database(
      this.dbFile,
      sqlite3.OPEN_READWRITE,
      error => {
        console.log('error', error);
      },
    );
  }
}
