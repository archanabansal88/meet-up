import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Content from '../content'
import Header from '../header'
import CreateEvent from '../createEvent'
import EventDetails from '../eventDetails'
import config from '../../config/index'
import Login from '../admin'
import Profile from '../profile'

class Main extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoggedin: false,
      profile: {
        email: null,
        name: null,
        id: null,
        image: null,
        display: true,
        aboutme: null
      },
      first: false
    }
    this.handleLoginSuccess = this.handleLoginSuccess.bind(this)
    this.handleLogoutSuccess = this.handleLogoutSuccess.bind(this)
    this.handleRedirect = this.handleRedirect.bind(this)
  }

  handleLoginSuccess (profile) {
    const data = {
      email: profile.getEmail(),
      name: profile.getName(),
      id: profile.getId(),
      image: profile.getImageUrl(),
      display: true,
      aboutme: ''
    }

    fetch(`${config.url}api/user/get`, {
      body: JSON.stringify(data),
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(response => {
        response.json().then(profileinfo => {
          if (profileinfo === null && window.location.pathname !== '/profile') {
            this.setState({isLoggedin: true, profile: data, first: true}, )
          } else {
            this.setState({isLoggedin: true, profile: profileinfo, first: false})
          }
        })
      })
  }

  handleLogoutSuccess () {
    this.setState({isLoggedin: false,
      profile: {
        email: null,
        name: null,
        id: null,
        image: null,
        display: null,
        aboutme: null
      }
    })
  }

  handleRedirect () {
    this.setState({first: false})
  }

  render () {
    const {isLoggedin, profile, first} = this.state
    console.log(profile, 'in Main')
    return (
      <BrowserRouter>
        <div>
          <Header isLoggedin={isLoggedin} onLoginSuccess={this.handleLoginSuccess}
            onLogoutSuccess={this.handleLogoutSuccess} profile={profile} />
          <Switch>
            <Route exact path='/' render={(props) => <Content {...props} first={first} />} />
            <Route exact path='/profile' render={(props) => <Profile {...props} profile={profile}
              first={first} handleRedirect={this.handleRedirect} isLoggedin={isLoggedin} />} />
            <Route exact path='/admin' component={Login} />
            <Route exact path='/create' component={CreateEvent} profile={profile} />
            <Route exact path='/:id' render={(props) => <EventDetails {...props} isLoggedin={isLoggedin} profile={profile} />} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default Main
