# twitter-bot
Twitter bot created using Node.js, twit npm, Twitter API and deployed using heroku.

Uses the Twitter Streaming API to listen for activity from a specified user. 

If the tweet is not a retweet the bot will reverse the text in the message and use the Twitter Post API to post a tweet from the connected twitter account.
