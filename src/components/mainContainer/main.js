import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import {createBrowserHistory} from 'history'
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
      profile: null
    }
    this.handleLoginSuccess = this.handleLoginSuccess.bind(this)
    this.handleLogoutSuccess = this.handleLogoutSuccess.bind(this)
  }

  handleLoginSuccess (profile) {
    this.setState({isLoggedin: true, profile})

    const data = {
      email: profile.getEmail(),
      name: profile.getName(),
      id: profile.getId(),
      image: profile.getImageUrl()
    }

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
  }

  handleLogoutSuccess () {
    this.setState({isLoggedin: false, profile: null})
  }

  render () {
    const {isLoggedin, profile} = this.state
    return (
      <BrowserRouter>
        <div>
          <Header isLoggedin={isLoggedin} onLoginSuccess={this.handleLoginSuccess} onLogoutSuccess={this.handleLogoutSuccess} profile={profile} />
          {/* <Switch> */}
          <Route exact path='/' component={Content} />
          {/* <Route exact path='/admin' component={Login} />
          <Route exact path='/create' component={CreateEvent} />
          <Route exact path='/:id' render={(props) => <EventDetails {...props} isLoggedin={isLoggedin} profile={profile} />} /> */}
          <Route path='/profile' render={() => {
            return (
              <div className='jumbotron'>
                <h1 className='display-3'>Hello, world!</h1>
              </div>
            )
          }} />
          {/* </Switch> */}
        </div>
      </BrowserRouter>
    )
  }
}

export default Main
