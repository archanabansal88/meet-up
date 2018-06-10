import React, {Component} from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Content from '../content'
import Header from '../header'
import EventDetails from '../eventDetails'
import config from '../../config/index'
import http from '../../helper/http'
import Admin from '../admin'
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
      yes: false
    }
    this.handleLoginSuccess = this.handleLoginSuccess.bind(this)
    this.handleLogoutSuccess = this.handleLogoutSuccess.bind(this)
    this.handleFirst = this.handleFirst.bind(this)
    this.handleYes = this.handleYes.bind(this)
    this.handleEventClick = this.handleEventClick.bind(this)
  }

  handleLoginSuccess (profile, cb) {
    const data = {
      email: profile.getEmail(),
      name: profile.getName(),
      id: profile.getId(),
      image: profile.getImageUrl(),
      display: true,
      aboutme: ''
    }
    http.post(`${config.url}api/user/get`, data)
      .then(response => {
        response.json().then(profileinfo => {
          if (profileinfo === null) {
            this.setState({isLoggedin: true, profile: data, first: true}, cb
              ? cb() : null)
          } else {
            this.setState({isLoggedin: true, profile: profileinfo, first: false}, cb
              ? cb() : null)
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
        display: true,
        aboutme: null
      }
    })
  }

  handleFirst () {
    this.setState({first: false})
  }

  handleYes (bool) {
    this.setState({yes: bool})
  }

  handleEventClick (history, event) {
    history.push(`/${event.id}`)
  }

  render () {
    const {isLoggedin, profile, first, yes} = this.state
    return (
      <BrowserRouter>
        <div>
          <Header isLoggedin={isLoggedin} onLoginSuccess={this.handleLoginSuccess}
            onLogoutSuccess={this.handleLogoutSuccess} profile={profile} handleFirst={this.handleFirst} first={first}
          />
          <Switch>
            <Route exact path='/' render={(props) => <Content {...props} first={first} onEventClick={this.handleEventClick.bind(null, props.history)} />} />
            <Route exact path='/profile' render={(props) => <Profile {...props} profile={profile}
              first={first} handleFirst={this.handleFirst} isLoggedin={isLoggedin}
            />} />
            <Route exact path='/create' component={CreateEvent} />
            <Route exact path='/:id' render={(props) => <EventDetails {...props} isLoggedin={isLoggedin} profile={profile} first={first} yes={yes}
              onLoginSuccess={this.handleLoginSuccess} handleFirst={this.handleFirst} handleYes={this.handleYes} />} />
            <Route path='/admin' component={Login} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default Main
