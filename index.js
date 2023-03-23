import { tweetsData } from '/data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';



// event listeners


document.addEventListener("click", function(e){
    if(e.target.dataset.likes){
        handleLikeClick(e.target.dataset.likes)
    }
    else if(e.target.dataset.retweets){
        handleRetweetClick(e.target.dataset.retweets)
    }
    else if(e.target.dataset.reply){
        handleReplyClick(e.target.dataset.reply)
    }
    else if (e.target.id === 'tweet-btn'){
        handleTweetBtnClick()
    }
})
// like function
function handleLikeClick(tweetId){
const targetTweetObj = tweetsData.filter(function(tweet){
return tweet.uuid === tweetId})[0]
if(targetTweetObj.isLiked){
    targetTweetObj.likes--;
}
else{
    targetTweetObj.likes++;
}
targetTweetObj.isLiked = !targetTweetObj.isLiked;
render()
}
// retweet function 

function handleRetweetClick(tweetId){
    const  targetRetweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]
    if(targetRetweetObj.isRetweeted){
        targetRetweetObj.retweets--;
    }
    else{
        targetRetweetObj.retweets++;
    }
    targetRetweetObj.isRetweeted = !targetRetweetObj.isRetweeted;
    render()
}
//reply function
function handleReplyClick(replyId){
    document.getElementById(`replies-${replyId}`).classList.toggle('hidden')
}

function handleTweetBtnClick(){
    const tweetInput = document.getElementById("tweet-input")
   if(tweetInput.value){ tweetsData.unshift(
        {handle: `@scrimba 💎`,
        profilePic: `images/scrimbalogo.png`,
        likes: 0,
        retweets: 0,
        tweetText: tweetInput.value,
        replies: [],
        isLiked: false,
        isRetweeted: false,
        uuid: uuidv4(),
    }
    )
    render()
    tweetInput.value = ""
}
}

//  get feed
function getFeedHtml(){
    let feedHtml = ``
    tweetsData.forEach(function(tweet) {
        let likeIconClass = ''
        
        if (tweet.isLiked){
            likeIconClass = 'liked'
        }

        let retweetIconClass = ''
        if (tweet.isRetweeted){
            retweetIconClass = "retweeted"
        }
        let repliesHtml = ''
        if(tweet.replies.length > 0){
            tweet.replies.forEach(function(reply){
                repliesHtml += `<div class="tweet-reply">
                <div class="tweet-inner">
                    <img src="${reply.profilePic}" class="profile-pic">
                        <div>
                            <p class="handle">${reply.handle}</p>
                            <p class="tweet-text">${reply.tweetText}</p>
                        </div>
                    </div>
            </div>`
            })
        }
        feedHtml += `<div class="tweet">
        <div class="tweet-inner">
            <img src="${tweet.profilePic}" class="profile-pic">
            <div>
                <p class="handle">${tweet.handle}</p>
                <p class="tweet-text">${tweet.tweetText}</p>
                <div class="tweet-details">
                    <span class="tweet-detail">
                    <i class="fa-regular fa-comment-dots" data-reply="${tweet.uuid}"></i>
                    ${tweet.replies.length}
                    </span>
                    <span class="tweet-detail">
                    <i class="fa-solid fa-heart ${likeIconClass}" data-likes="${tweet.uuid}"></i>
                    ${tweet.likes}
                    </span>
                    <span class="tweet-detail">
                    <i class="fa-solid fa-retweet ${retweetIconClass}" data-retweets="${tweet.uuid}"></i>
                    ${tweet.retweets}
                    </span>
                </div>   
            </div>            
        </div>
        <div id="replies-${tweet.uuid}">
        ${repliesHtml}
    </div>
    </div>
    `
    })
   return feedHtml
}


function render(){
    document.getElementById("feed").innerHTML = getFeedHtml()

}
render()