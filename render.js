var tweets = [];

/* ---------------------------- RETRIEVES TWEETS FROM SERVER ---------------------------- */

// returns array of tweets from server
const loadTweets = async function () {
    var t = await axios({
        method: 'get',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
        withCredentials: true,
    });
    return t.data;
}

/* ------------------------------------ RENDER TWEETS ------------------------------------ */
// empties newsfeed then loads all tweets in "tweets" into DOM
const renderTweets = async function() {
    $("#newsfeed").empty();

    tweets.forEach(elt => {
        if(elt.isMine == false) {
            var tweet = makeNewTweet(elt);
            $("#newsfeed").append(tweet);
        } else {
            var tweet =  makeMyTweet(elt);
            $("#newsfeed").append(tweet);
        }
    });
}

/* ------------------------------------ LOAD INTO DOM ------------------------------------ */

/* loads tweets from server by calling loadTweets
renders each tweet into DOM
registers the event handlers for the buttons*/
const loadIntoDOM = async function () {

    // loads tweets into global "tweets" variable
    tweets = await loadTweets();

    // renders each tweet in "tweets" in the DOM
    renderTweets();

    // event handlers:
    $(document).on("click", "#newTweet", handleNewTweet);
    $(document).on("click", "#newSubmit", handleNewSubmit);
    $(document).on("click", "#edit", handleEdit);
    $(document).on("click", "#submitButton", handleSubmit);
    $(document).on("click", "#like", handleLike);
    $(document).on("click", "#retweet", handleRetweet);
    $(document).on("click", "#rtButton", handleRTButton);
    $(document).on("click", "#cancel", handleDestroy);
    $(document).on("click", "#reply", handleReply);
    $(document).on("click", "#replyButton", handleReplyButton);
    
}

/* ------------------------------------ HTML RETURNS ------------------------------------ */

const makeNewTweet = function (tweet) {
    if (tweet.isLiked) {
        return `<div class="card" style="height: 220px" id="${tweet.id}">
            <div class="card-content">
                <div class="media">
                    <div class="media-left">
                        <figure class="image is-96x96">
                            <img src="https://cdn1.iconfinder.com/data/icons/pet-me-vol-1/64/meong-02-512.png" alt="Placeholder image">
                        </figure>
                    </div>
                    <div class="media">
                        <div class="content">
                            <p id="name">
                                ${tweet.author}
                            </p>
                            <p>
                                ${tweet.body}
                            </p>
                        </div>
                    </div>
                </div>
                <nav class="level is-mobile">
                    <div class="level is-left">
                        <button name="${tweet.id}" class="level-item" id="reply" aria-label="reply">
                            <span class="icon is-small">
                                <i class="fas fa-reply"></i>
                            </span>
                            <p id="replyCount">
                                ${tweet.replyCount}
                            </p>
                        </button>
                        <button name="${tweet.id}"class="level-item" id="retweet" aria-label="retweet">
                            <span class="icon is-small">
                                <i class="fas fa-retweet"></i>
                            </span>
                            <p id="retweetCount">
                                ${tweet.retweetCount}
                            </p>
                        </button>
                        <button name=" ${tweet.id}" class="level-item" id="like" aria-label="like" style="color:red">
                            <span class="icon is-small">
                                <i class="fas fa-heart"></i>
                            </span>
                            <p id="likeCount">
                                ${tweet.likeCount}
                            </p>
                        </button>
                    </div>
                </nav>
            </div>
        </div>`;
    } else {
        return `<div class="card" id="${tweet.id}">
            <div class="card-content">
                <div class="media">
                    <div class="media-left">
                        <figure class="image is-96x96">
                            <img src="https://cdn0.iconfinder.com/data/icons/orange-cat-emoticon-filled/64/cute_cat_kitten_face_pet-03-512.png" alt="Placeholder image">
                        </figure>
                    </div>
                    <div class="media">
                        <div class="content">
                            <p id="name">
                                ${tweet.author}
                            </p>
                            <p>
                                ${tweet.body}
                            </p>
                        </div>
                    </div>
                </div>
                <nav class="level is-mobile">
                    <div class="level is-left">
                        <button name="${tweet.id}" class="level-item" id="reply" aria-label="reply">
                            <span class="icon is-small">
                                <i class="fas fa-reply"></i>
                            </span>
                            <p id="replyCount">
                                ${tweet.replyCount}
                            </p>
                        </button>
                        <button name="${tweet.id}"class="level-item" id="retweet" aria-label="retweet">
                            <span class="icon is-small">
                                <i class="fas fa-retweet"></i>
                            </span>
                            <p id="retweetCount">
                                ${tweet.retweetCount}
                            </p>
                        </button>
                        <button name="${tweet.id}" class="level-item" id="like" aria-label="like">
                            <span class="icon is-small">
                                <i class="fas fa-heart"></i>
                            </span>
                            <p id="likeCount">
                                ${tweet.likeCount}
                            </p>
                        </button>
                    </div>
                </nav>
            </div>
        </div>`; 
    }

}

// returns HTML for MY tweet object
const makeMyTweet = function (tweet) {
    return `<div class="card" style="height: 220px" id="${tweet.id}">
        <div class="card-content">
            <div class="media">
                <div class="media-left">
                    <figure class="image is-96x96">
                        <img src="https://cdn1.iconfinder.com/data/icons/pet-me-vol-1/64/meong-02-512.png" alt="Placeholder image">
                    </figure>
                </div>
                <div class="media">
                    <div class="content">
                        <p id="name">
                            ${tweet.author}
                        </p>
                        <p>
                            ${tweet.body}
                        </p>
                    </div>
                </div>
            </div>
            <nav class="level is-mobile">
                <div class="level is-left">
                    <button name="${tweet.id}" class="level-item" id="reply" aria-label="reply">
                        <span class="icon is-small">
                            <i class="fas fa-reply"></i>
                        </span>
                        <p id="replyCount">
                            tweet.replyCount
                        </p>
                    </button>
                    <button name="${tweet.id}"class="level-item" id="retweet" aria-label="retweet">
                        <span class="icon is-small">
                            <i class="fas fa-retweet"></i>
                        </span>
                        <p id="retweetCount">
                            tweet.retweetCount
                        </p>
                    </button>
                    <button name="${tweet.id}" class="level-item" id="like" aria-label="like">
                        <span class="icon is-small">
                            <i class="fas fa-heart"></i>
                        </span>
                        <p id="likeCount">
                            tweet.likeCount
                        </p>
                    </button>
                    <button name="${tweet.id}" class="level-item" id="edit" aria-label="edit">
                        <span class="icon is-small">
                            <i class="fas fa-edit"></i>
                        </span>
                        <p>
                            Edit
                        </p>
                    </button>
                    <button name="${tweet.id}" class="level-item" id="cancel" aria-label="edit" style="float:right">
                        <span class="icon is-small">
                            <i class="fas fa-edit"></i>
                        </span>
                        <p>
                            Cancel
                        </p>
                    </button>
                </div>
            </nav>
        </div>
    </div>`;
}

// returns HTML for an EDIT form to make a new tweet(was in handleNewTweet)
const makeNewTweetForm = function () {
    return `<div class="card" style="height: 220px" id="newEditForm">
        <div class="card-content">
            <div class="media">
                <div class="media-left">
                    <figure class="image is-96x96">
                        <img src="https://cdn1.iconfinder.com/data/icons/pet-me-vol-1/64/meong-02-512.png" alt="Placeholder image">
                    </figure>
                </div>
                <div class="media-content">
                    <textarea class="textarea" id="description">
                        "type new tweet here"
                    </textarea>
                    <div class="container has-text-right">
                        <button class="button is-rounded" type="submit" id="newSubmit" name="${tweet.id}">
                            "Tweet"
                        </button>
                        <button class="button is-rounded" id="cancelButton" name="${tweet.id}>
                            "Cancel"
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
}

// returns HTML for an EDIT form to make a new REtweet (was in handleRetweet)
const makeNewRetweetForm = function (tweet, rtBody) {
    return `<div class="card" style="height: 220px" id="${tweet.id}">
        <div class="card-content">
            <div class="media">
                <div class="media-left">
                    <figure class="image is-96x96">
                        <img src="https://cdn1.iconfinder.com/data/icons/pet-me-vol-1/64/meong-02-512.png" alt="Placeholder image">
                    </figure>
                </div>
                <div class="media-content">
                    <div class="info">
                        <p id="name">
                            ${rtBody}
                        </p>
                        <p>
                        </p>
                    </div>
                    <textarea class="textarea" id="description" placeholder="optional">
                    </textarea>
                    <div class="container has-text-right">
                        <button class="button is-rounded" type="submit" id="rtButton" name="${tweet.id}">
                            Submit
                        </button>
                        <button class="button is-rounded" id="cancelButton" name="${tweet.id}">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
}

const makeNewReplyForm = function (tweet, rtBody) {
    return `<div class="card" style="height: 220px" id="${tweet.id}">
        <div class="card-content">
            <div class="media">
                <div class="media-left">
                    <figure class="image is-96x96">
                        <img src="https://cdn1.iconfinder.com/data/icons/pet-me-vol-1/64/meong-02-512.png" alt="Placeholder image">
                    </figure>
                </div>
                <div class="media-content">
                    <div class="info">
                        <p id="name">
                            ${rtBody}
                        </p>
                        <p>
                        </p>
                    </div>
                    <textarea class="textarea" id="description" placeholder="optional">
                    </textarea>
                    <div class="container has-text-right">
                        <button class="button is-rounded" type="submit" id="replyButton" name="${tweet.id}">
                            Submit
                        </button>
                        <button class="button is-rounded" id="cancelButton" name="${tweet.id}">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
}

// returns HTML for an edit form to edit a tweet (was in renderEditForm)
const makeNewEditForm = function (tweet) {
    return `<div class="card" id="${tweet.id}">
        <div class="card-content">
            <div class="media">
                <div class="media-left">
                    <figure class="image is-96x96">
                        <img src="https://cdn1.iconfinder.com/data/icons/pet-me-vol-1/64/meong-02-512.png" alt="Placeholder image">
                    </figure>
                </div>
                <div class="media-content">
                    <div class="info">
                        <p id="name">
                            ${tweet.author}
                        </p>
                    </div>
                    <textarea class="textarea" id="description">
                        ${tweet.body}
                    </textarea>
                    <div class="container has-text-right">
                        <button class="button is-rounded" type="submit" id="submitButton" name="${tweet.id}">
                            Submit
                        </button>
                        <button class="button is-rounded" id="cancelButton" name="${tweet.id}">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
}

/* ------------------------------------ SERVER UPDATES ------------------------------------ */

/* updates server with new tweet
returns new tweet object */
const updateNewTweet = async function (newBody) {
    const result = await axios({
        method: 'post',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
        withCredentials: true,
        data: {
            body: newBody
        },
    });
    return result.data;
}

/* updates server when retweet button is pressed 
returns new tweet object (the retweet) */
const updateRetweet = async function (id, newBody) {
    const result = await axios({
        method: 'post',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
        withCredentials: true,
        data: {
            "type": "retweet",
            "parent": id,
            "body": newBody
        }
    });
    return result.data;
}

/* updates server with new body of edited tweet
returns edited tweet object */
const updateBody = async function (tweet) {
    var toRender = await axios({
        method: 'put',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets/' + tweet.id,
        withCredentials: true,
        data: {
            body: tweet.body
        },
    });
    return toRender;
}

// updates server to make a tweet LIKED (returns nothing)
const updateLike = async function (tweet) {
    const result = await axios({
        method: 'put',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets/' + tweet.id + '/like',
        withCredentials: true,
    });
}

// updates server to make a tweet UNLIKED (returns nothing)
const updateUnlike = async function (tweet) {
    const result = await axios({
        method: 'put',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets/' + tweet.id + '/unlike',
        withCredentials: true,
    });
}

const updateDelete = async function (id) {
    const result = await axios({
        method: 'delete',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets/' + tweet.id,
        withCredentials: true,
    });
}
    
const updateReply = async function (id) {
    const result = await axios({
        method: 'post',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
        withCredentials: true,
        data: {
        "type": "reply",
        "parent": id,
        "body": "Great shot, kid! That was one in a million!"
        },
    });
    return result.data;
}
 
/* ------------------------------------ NEW TWEET ------------------------------------ */

/* when newTweet button is pressed
loads form into DOM to make new tweet */
const handleNewTweet = function (event) {
    let form = makeNewTweetForm(); 
    $("#newsfeed").empty();
    $("#newsfeed").append(form);
    $("#newsfeed").css("background-color", "white");

}

/* when submit form on edit form is pressed
loads new tweet into DOM
*/
const handleNewSubmit = async function (event) {
    let newBody = $("#description").val();
    let newTweet = await updateNewTweet(newBody);
    newTweet.isMine = true;

    // adds new tweet to start of "tweets"
    tweets.unshift(newTweet);
    renderTweets();
}

/* ------------------------------------ EDIT A TWEET ------------------------------------ */


const handleEdit = function (event) {
    let tweetID = event.target.name;
    let tweet = tweets.find(element => element.id == tweetID);

    let form = makeNewEditForm(tweet);
    $("#" + tweetID).replaceWith(form);

}

const handleSubmit = function (event) {
    var tweetID = event.target.name;

    let tweet = tweets.find(element => element.id == tweetID);

    tweet.body = $("#description").val();

    // updates server with tweet
    updateBody(tweet);

    let edited = makeMyTweet(tweet);

    $("#" + tweetID).replaceWith(edited);
}

/* ------------------------------------ LIKE A TWEET ------------------------------------ */

const handleLike = async function (event) {
    let tweetID = event.target.name;
    let tweet = tweets.find(element => element.id == tweetID);


    // new button name = id of tweet
    // has updated likeCount
    if (!tweet.isLiked) {
        tweet.isLiked = true;
        tweet.likeCount++;

        // updates server
        updateLike(tweet);

        let updated = makeNewTweet(tweet);
        $("#" + tweetID).replaceWith(updated);
    } else {
        tweet.isLiked = false;
        tweet.likeCount--;

        // updates server
        updateUnlike(tweet);

        let updated = makeNewTweet(tweet);
        $("#" + tweetID).replaceWith(updated);
    }

}

/* ----------------------------------- DESTROY A TWEET ---------------------------------- */

const handleDestroy = function(event) {
    let tweetID = event.target.name;
    let toDelete = $("#" + tweetID);
    toDelete.remove();

    let a = [];
    tweets.forEach(function(elt) {
        if (elt.id == tweetID) {
            a.push(elt);
        }
    });

    tweets = a;
    
    updateDelete(tweetID);
}


/* ----------------------------------- RETWEET A TWEET ---------------------------------- */

const handleRetweet = function (tweet) {
    let tweetID = event.target.name;
    let toRetweet = tweets.find(element => element.id == tweetID);

    let rtBody = "Retweet @ " + toRetweet.author + " : " + toRetweet.body;

    let form = makeNewRetweetForm(toRetweet, rtBody);

    $("#newsfeed").empty();
    $("#newsfeed").append(form);
    $("#newsfeed").css("background-color", "white");
}

const handleRTButton = async function (event) {
    let tweetID = event.target.name;
    let newBody = $("#description").val();

    // update retweet count in global "tweets"
    let tweet = tweets.find(element => element.id == tweetID);
    tweet.retweetCount++;

    // update server;
    let rt = await updateRetweet(tweetID, newBody);

    tweets.unshift(rt);
    tweets[0].body = "RT @ " + rt.parent.author + ": " + rt.parent.body + "<br>" + newBody;
    
    renderTweets();
}

/* ---------------------------------- REPLY TO A TWEET ---------------------------------- */

const handleReply = function (event) {
    let tweetID = event.target.name;

    let toReply = tweets.find(element => element.id == tweetID);

    let replyBody = "Reply to @ " + toReply.author + " : " + toReply.body;

    let form = makeNewReplyForm(toReply, replyBody);

    $("#newsfeed").empty();
    $("#newsfeed").append(form);
    $("#newsfeed").css("background-color", "white");

}

const handleReplyButton = async function (event) {
    let tweetID = event.target.name;
    let newBody = $("#description").val();

    // update retweet count in global "tweets"
    let tweet = tweets.find(element => element.id == tweetID);
    tweet.replyCount++;

    // update server;
    let rt = await updateReply(tweetID, newBody);

    tweets.unshift(rt);
    tweets[0].body = "Reply to @ " + rt.parent.author + ": " + rt.parent.body + "<br>" + newBody;
    
    renderTweets();
}

/* ------------------------------------ DOCUMENT.READY ------------------------------------ */
$(document).ready(function () {
    loadIntoDOM();
});


