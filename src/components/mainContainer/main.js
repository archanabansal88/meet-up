import React, {Component} from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Content from '../content'
import Header from '../header'
import CreateEvent from '../createEvent'
import EventDetails from '../eventDetails'
import config from '../../config/index'
import http from '../../helper/http'
import Login from '../admin'
import Profile from '../profile'

class Main extends Component {
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
      first: false,
      redirect: []
    }
    this.handleLoginSuccess = this.handleLoginSuccess.bind(this)
    this.handleLogoutSuccess = this.handleLogoutSuccess.bind(this)
    this.handleFirst = this.handleFirst.bind(this)
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
    http.post(`${config.url}api/user/get`, JSON.stringify(data))
      .then(response => {
        response.json().then(profileinfo => {
          if (profileinfo === null) {
            this.setState({isLoggedin: true, profile: data, first: true})
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

  handleFirst () {
    this.setState({first: false})
  }

  handleRedirect (link) {
    let array = this.state.redirect
    array.push(link)
    this.setState({redirect: array})
  }

  render () {
    const {isLoggedin, profile, first, redirect} = this.state
    return (
      <BrowserRouter>
        <div>
          <Header isLoggedin={isLoggedin} onLoginSuccess={this.handleLoginSuccess}
            onLogoutSuccess={this.handleLogoutSuccess} profile={profile} handleFirst={this.handleFirst} first={first}
            handleRedirect={this.handleRedirect} />
          <Switch>
            <Route exact path='/' render={(props) => <Content {...props} first={first} handleRedirect={this.handleRedirect} />} />
            <Route exact path='/profile' render={(props) => <Profile {...props} profile={profile}
              first={first} handleFirst={this.handleFirst} isLoggedin={isLoggedin} handleRedirect={this.handleRedirect} 
              redirect={redirect} />} />
            <Route exact path='/admin' component={Login} />
            <Route exact path='/create' component={CreateEvent} />
            <Route exact path='/:id' render={(props) => <EventDetails {...props} onLoginSuccess={this.handleLoginSuccess}
              isLoggedin={isLoggedin} profile={profile} first={first} handleFirst={this.handleFirst} handleRedirect={this.handleRedirect} />} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default Main
