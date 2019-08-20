import React from 'react'
import { GoogleLogin } from 'react-google-login';

const responseGoogle = (response) => {
    console.log(response)
    console.log(response['profileObj'])
    if(response['profileObj']!=undefined){
        localStorage.setItem("profileObj", JSON.stringify(response['profileObj']))
        localStorage.setItem("tokenObj", JSON.stringify(response['tokenObj']))
        window.location = '/home';
    }
}

class Login extends React.Component {

  constructor(props) {
      super(props);
      var profileObj = localStorage.getItem("profileObj")
      if (profileObj != null){
          profileObj = JSON.parse(profileObj)

          window.location = '/home';
      }
  }

  render() {
    return (
         <div className="App">
          <header className="App-header">
            <h2>LiveStream</h2>
          </header>

          <div style={{marginTop: '20%'}}>
              <GoogleLogin
                    clientId="354360761435-8ll0ocu814qi9mb6umaliveuvqlce5fa.apps.googleusercontent.com"
                    buttonText="Login With Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
              />
          </div>
        </div>
      )
  }
}
export default Login
