import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
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
      profile: null,
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
      image: profile.getImageUrl()
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
          if (profileinfo !== null && window.location.pathname !== '/profile') {
            this.setState({isLoggedin: true, profile: profileinfo, first: true})
          } else {
            fetch(`${config.url}api/user/login`, {
              body: JSON.stringify(data),
              method: 'POST',
              credentials: 'same-origin',
              headers: {
                'content-type': 'application/json'
              }
            })
              .then((response) => {
                if (response.status === 200) {
                  console.log('success', response)
                }
              })
            this.setState({isLoggedin: true, profile})
          }
        })
      })
  }

  handleLogoutSuccess () {
    this.setState({isLoggedin: false, profile: null})
  }

  handleRedirect () {
    this.setState({first: false})
  }

  render () {
    const {isLoggedin, profile, first} = this.state
    return (
      <BrowserRouter>
        <div>
          <Header isLoggedin={isLoggedin} onLoginSuccess={this.handleLoginSuccess}
            onLogoutSuccess={this.handleLogoutSuccess} profile={profile} />
          <Switch>
            <Route exact path='/' render={(props) => <Content {...props} first={first} handleRedirect={this.handleRedirect} />}  />
            <Route exact path='/profile' component={Profile} profile={profile} />
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
