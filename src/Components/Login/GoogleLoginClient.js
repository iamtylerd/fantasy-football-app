import React, { Component } from "react";
import { GoogleLogin, GoogleLogout } from 'react-google-login';




class GoogleLoginClient extends Component {
    constructor(props) {
        super(props)
        this.state = {
            accessToken: localStorage.getItem("accessToken") || null
        }
        this.responseGoogle = this.responseGoogle.bind(this)
        this.logout = this.logout.bind(this)
    }
    
    responseGoogle(response) {
        this.setState({
            accessToken: response.accessToken
        },
        localStorage.setItem("accessToken", response.accessToken),
        localStorage.setItem("name", response.profileObj.givenName)
        )
    }
    
    logout() {
        this.setState({
            accessToken: null
        },
        localStorage.clear()
        )
    }
    
    render() {
        return (
            <div>
                {this.state.accessToken ? 
                <div>
                    <span>
                        {localStorage.getItem("name")}
                    </span>
                    <button onClick={this.logout}>Logout?</button>
                </div> : 
                <GoogleLogin
                clientId="853351844639-45k4smk77oc6onlpdqqkpstn9rh2hl3h.apps.googleusercontent.com"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                />}
            </div>
        )
    }
}
export default GoogleLoginClient