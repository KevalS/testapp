import React from 'react'
import { GoogleLogout } from 'react-google-login';
import './style.css';
import * as API_KEYS from '../constants'


const logout = (response) => {

    localStorage.clear();
    window.location = '/login';
}
let peopleLis=[]
class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {url: '', name_: '', email: '', apiResp: [], data: [], nextPageToken: ''};
        this.getYoutubeData = this.getYoutubeData.bind(this);

        var data = localStorage.getItem('profileObj')

        data = JSON.parse(data)
        var image = data['imageUrl']
        var name = data['name']

        var email = data['email']


        this.setState.url = image
        this.setState.name_ = name
        this.setState.email = email

        let apiKeys = API_KEYS.API_KEYS
        let j = Math.floor(Math.random() * apiKeys.length)

        fetch("https://www.googleapis.com/youtube/v3/search?part=snippet&eventType=live&maxResults=50&type=video&key=" + apiKeys[j])
            .then(res => res.json())
            .then((result) => {

                this.setState.apiResp = result.items

                let data = []

                if (!result.error) {
                    this.setState({
                        nextPageToken: result.nextPageToken
                    });

                    for (var i = 0; i < this.setState.apiResp.length; i++) {

                        let dict = {
                            'title': this.setState.apiResp[i].snippet.title,
                            'description': this.setState.apiResp[i].snippet.description,
                            'id': this.setState.apiResp[i].id.videoId
                        }
                        data.push(dict)
                        peopleLis.push(
                            <li className="liclass col-sm-12" onClick={() => this.handleClick(dict)}>

                                <img className="imgclass" src={this.setState.apiResp[i].snippet.thumbnails.high.url}/>
                                <div>
                                    <h2 className="title">{this.setState.apiResp[i].snippet.title}</h2>
                                    <h3 className="channelName">{this.setState.apiResp[i].snippet.channelTitle}</h3>
                                    <h4 className="desc">{this.setState.apiResp[i].snippet.description}</h4>
                                </div>
                            </li>
                        )

                    }
                } else {
                    peopleLis.push(<li className="liclass">{result.error.message}</li>)
                }

                this.setState({
                    data: peopleLis
                });

            })
    }





    getYoutubeData(){

         fetch("https://www.googleapis.com/youtube/v3/search?pageToken=" + this.state.nextPageToken + "&part=snippet&eventType=live&maxResults=50&type=video&key=AIzaSyAyH0YlJHqOQ5TXQLtloq4gh60n6HBOwzo")
          .then(res => res.json())
          .then((result) => {
            this.setState.apiResp = result.items
            let data=[]
            if(!result.error) {
                for (var i = 0; i < this.setState.apiResp.length; i++) {
                    let dict = {
                        'title': this.setState.apiResp[i].snippet.title,
                        'description': this.setState.apiResp[i].snippet.description,
                        'id': this.setState.apiResp[i].id.videoId
                    }
                    data.push(dict)
                    peopleLis.push(
                        <li className="liclass" onClick={() => this.handleClick(dict)}>

                            <img className="imgclass" src={this.setState.apiResp[i].snippet.thumbnails.high.url}/>
                            <div>
                                <h2 className="title">{this.setState.apiResp[i].snippet.title}</h2>
                                <h3 className="channelName">{this.setState.apiResp[i].snippet.channelTitle}</h3>
                                <h4 className="desc">{this.setState.apiResp[i].snippet.description}</h4>
                            </div>
                        </li>
                    )

                }
            }

            this.setState({
              data: peopleLis,
              nextPageToken:result.nextPageToken
            });





      })
    }


    handleClick(param){

        let videoId = param.id
        localStorage.setItem('Video_id_per_user', videoId);
        videoId = 'https://www.youtube.com/embed/' + videoId
        localStorage.setItem("videoId", JSON.stringify(videoId))
        localStorage.setItem("title", JSON.stringify(param.title))
        window.location = '/video';
    }




  render() {
    return (
        <div>
         <header className="App-header">
                <h2>LiveStream</h2>
          </header>
         <div className="Button">
             <GoogleLogout
              clientId="354360761435-8ll0ocu814qi9mb6umaliveuvqlce5fa.apps.googleusercontent.com"
              buttonText="Logout"
              onLogoutSuccess={logout}>
             </GoogleLogout>

         </div>

         <div className="Info">

             <img className='image' src={this.setState.url} />

             <h1 className="name">{this.setState.name_}</h1>
             <span>{this.setState.email}</span>

         </div>

        <div className='New'>


            <ul>

                {this.state.data}
            </ul>
        </div>

        <div className="btndiv">
            <div className="divCenter">
                <button  className="btn" type="button" onClick={this.getYoutubeData}>
                Load more
                </button>
            </div>

        </div>

        </div>


      )
  }
}
export default Home
