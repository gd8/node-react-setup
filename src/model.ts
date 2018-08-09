export default class Tweet {
  external_author_id: string;
  author: string;
  content: string;
  region: string;
  language: string;
  publish_date: string;
  harvested_date: string;
  following: number;
  followers: number;
  updates: number;
  post_type: '' | 'RETWEET' | 'QUOTE_TWEET';
  account_type: string;
  new_june_2018: boolean;
  retweet: boolean;
  account_category: string;

  constructor(init?) {
    Object.assign(this, init);
  }
}

/*
  Account categories:
    RightTroll
    NonEnglish
    Fearmonger
    LeftTroll
    Unknown
    HashtagGamer
    NewsFeed
    Commercial
*/
