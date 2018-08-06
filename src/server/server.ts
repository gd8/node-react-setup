import * as express from 'express';
import { verbose } from 'sqlite3';

const app = express();

const dbFile = '/Users/gustav/projects/russian/data/russian_trolls.db';
const sqlite3 = verbose();

let db = new sqlite3.Database(dbFile, sqlite3.OPEN_READWRITE, error => {
  console.log('error', error);
});

console.log('inside server');

app.get('/api', (req, res) => {
  console.log('trying api');
  res.send('Hallo welt');
});

app.listen(8080, () => console.log('Listening on port 8080!'));
