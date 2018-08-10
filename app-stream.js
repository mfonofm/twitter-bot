//npm twit (twitter) package
const Twit = require("twit");

//twitter api keys and access tokens are in the seperate config.js file
const config = require("./config");
const T = new Twit(config);



const streamParams = {
    follow: ['3377763311', '25073877'],
    //track: '',
    lang: 'en',
    truncated: 'false',
    tweet_mode: tmode
}

const stream = T.stream('statuses/filter', streamParams);

stream.on('tweet', tweetEvent);

var reversedMsg;
var findRT = "TR";
var tmode;

function tweetEvent(eventMsg) {

    if (eventMsg.user.id == 3377763311 || eventMsg.user.id == 25073877) {

        if (eventMsg.text.length >= 140 && eventMsg.extended_tweet['full_text'].length > 140) {
            tmode = 'extended';
            console.log(`This is an ${tmode} tweet, it has ${eventMsg.extended_tweet['full_text'].length} characters`);
            reversedMsg = eventMsg.extended_tweet['full_text'].toLowerCase().split("").reverse().join("");
            if (reversedMsg.indexOf(findRT) < 0) {
                tweetIt(reversedMsg);
            } else {
                console.log("Nothing tweeted. This is a Retweet");
                reversedMsg = null;
            }
        } else {
            tmode = 'compat';
            console.log(`This is a ${tmode} tweet, it has ${eventMsg.text.length} characters`);
            reversedMsg = eventMsg['text'].toLowerCase().split("").reverse().join("");
            if (reversedMsg.indexOf(findRT) < 0) {
                tweetIt(reversedMsg);
            } else {
                console.log("Nothing tweeted. This is a Retweet");
                reversedMsg = null;
            }
        }


    }
};

//post tweet
function tweetIt(txt) {
    const tweetParams = {
        status: txt
    };

    T.post('statuses/update', tweetParams, sentTweet);

    function sentTweet(err, data, response) {
        if (err) {
            console.log("Tweet not sent " + err);
        } else {
            console.log("Tweet Sent!");
        }

    };
}