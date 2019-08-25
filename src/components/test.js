import * as React from 'react';
import './style.css';
import * as API_KEYS from '../constants'

class SimpleComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {livechatId:'', url: '', api_result:[], isLoading: true, message:''};
    let videoUrl = localStorage.getItem('videoId')
    videoUrl = JSON.parse(videoUrl)
    let videoTitle = localStorage.getItem('title')
    videoTitle = JSON.parse(videoTitle)
    this.state = {url: videoUrl,title: videoTitle, isLoading:true};
    this.updateInput = this.updateInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateInput(event){
  this.setState({message : event.target.value})
  }

  getChatdata(videoId_per_video) {


  }


    handleSubmit() {

        (async () => {


            console.log("message = ", this.state.message)
            console.log("this.state.livechatId = ",this.state.livechatId)
        let body = {
                     "snippet": {
                       "liveChatId": this.state.livechatId,
                       "textMessageDetails": {
                         "messageText": this.state.message
                       },
                       "type": "textMessageEvent"
                     }
                    }
        let accessToken = JSON.parse(localStorage.getItem('tokenObj'))['access_token']

          const rawResponse = await fetch('https://www.googleapis.com/youtube/v3/liveChat/messages?part=snippet&liveChatId=' + this.state.livechatId, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer '+accessToken,
              // 'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
              // 'message-body': "{ snippet: { liveChatId:'Cg0KC2hIVzFvWTI2a3hR' ,type: 'textMessageEvent',textMessageDetails: { messageText: 'test message' }}}",
            body: JSON.stringify(body)
          });
          this.setState({message : ''})
          this.setState({'message' : ''})
          this.setState.message ='';
          const content = await rawResponse.json();

          console.log(content);
        })();

    }


  //Send state to the server code




  componentDidMount() {
    let apiKeys = API_KEYS.API_KEYS
    /*Get live chat Section*/

    let videoId_per_video = localStorage.getItem('Video_id_per_user')
    let api_result1 = [];
    if(videoId_per_video != '' ) {
      setInterval(async () => {
        let j = Math.floor(Math.random() * apiKeys.length)
        let apiKey1 = 'AIzaSyANHFKpZhlB4Xs7lXzkuPvZ4kxW1VBBzAs'//apiKeys[j]
        const res = await fetch('https://www.googleapis.com/youtube/v3/videos/?part=snippet,contentDetails,statistics,liveStreamingDetails&key=' + apiKey1 + '&id='+videoId_per_video);
        const result = await res.json();
        let responsetype = result.items[0].liveStreamingDetails.activeLiveChatId;


        if(responsetype != undefined ) {
          let k = Math.floor(Math.random() * apiKeys.length)
          let apiKey2 = apiKeys[k]
          this.setState({
            livechatId:result.items[0].liveStreamingDetails.activeLiveChatId
          });
          const response = await fetch('https://www.googleapis.com/youtube/v3/liveChat/messages?part=snippet,authorDetails&key='+ apiKey2 +'&liveChatId='+result.items[0].liveStreamingDetails.activeLiveChatId)
          const respons = await response.json();
          let chat = respons.items;
          let authorDetails = respons.authorDetails;
          let api_result1 = [];
          if(chat != undefined ) {
            chat.map(function(res) {
              api_result1.push({'message': res.snippet.displayMessage, 'author_name':res.authorDetails.displayName,
                'image_url':res.authorDetails.profileImageUrl});
            })
            this.state = {api_result: api_result1,isLoading: false};
            this.setState({
              api_result1, isLoading:false
            });
          } else {
            let api_result1 = ['Live chat is not available'];
            this.state = {api_result: api_result1,isLoading: false};
            this.setState({
              api_result1, isLoading:false
            });
          }
        } else {
          let api_result1 = ['Live chat is not available'];
          this.state = {api_result: api_result1,isLoading: false};
          this.setState({
            api_result1, isLoading:false
          });
        }
      }, 5000);
    } else {
      this.setState({
         isLoading:true
      });
    }

    /*Get live chat Section end*/
  }

  render() {
     const { isLoading,  api_result1 } = this.state;

    return (
        <div className="video">
        <iframe src={this.state.url}
        title='video'
        width="900"
        height="550"
        />
        <h2>{this.state.title}</h2>
        <div className="chat-box">
        { !isLoading ? (
						this.state.api_result1.map(post => {
						return (
							<div className="blog-block">
                <p><img className="imageG" src={post.image_url} /></p>
                                <p><b className="authorname">{post.author_name}</b></p>
								<p>{post.message}</p>

							</div>
						);
						})
					) : (
						<p>Loading...</p>
					)}
        </div>
        { !isLoading ? (
        <div className="messageArea">
          <label>
            Message:
            <input type="text" className="input" value= {this.state.message}  name="message" onChange={this.updateInput} />
          </label>
            <button className="btn"  value="Submit" onClick={this.handleSubmit}>Send</button>
        </div>
            ):(<p></p>)}
      </div>




    );
  }
}

export default SimpleComponent;
