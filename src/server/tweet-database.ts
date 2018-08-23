import * as path from 'path';
import { verbose, sqlite3, Database } from 'sqlite3';
import Tweet from '../model';

export default class TweetDatabase {
  private db: Database;
  private dbFile: string;
  private sqlite3: sqlite3;

  private TWEET_TABLE = 'tweets';

  constructor() {
    this.sqlite3 = verbose();
    this.dbFile = path.resolve(process.cwd(), 'data/tweets.db');
  }

  private doQuery(query: string): Promise<Tweet[]> {
    this.db = new this.sqlite3.Database(
      this.dbFile,
      this.sqlite3.OPEN_READWRITE,
      error => {
        console.log('error', error);
      },
    );

    return new Promise((resolve, reject) => {
      this.db.all(query, [], (error, rows) => {
        if (error) {
          reject(error);
        }
        resolve(rows);
      });
    });
  }

  public getTweets(offset = 0, limit = 10): Promise<Tweet[]> {
    if (isNaN(offset) || isNaN(limit)) {
      return Promise.reject(
        new Error(
          `Supplied query params must be integers. Offset: ${offset}, Limit: ${limit}`,
        ),
      );
    }
    const query = `SELECT * FROM ${
      this.TWEET_TABLE
    } LIMIT ${limit} OFFSET ${offset}`;

    return this.doQuery(query).then(
      result => {
        return result.map(row => new Tweet(row));
      },
      error => {
        return Promise.reject(new Error(error));
      },
    );
  }
}
