import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Content from '../content'
import Header from '../header'
import CreateEvent from '../createEvent'
import EventDetails from '../eventDetails'
import config from '../../config/index'
import Login from '../admin'

class Main extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoggedin: false
    }
    this.handleLoginSuccess = this.handleLoginSuccess.bind(this)
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
          console.log('success')
        }
      })
  }

  render () {
    const {isLoggedin, profile} = this.state
    return (
      <BrowserRouter>
        <div>
          <Header isLoggedin={isLoggedin} onLoginSuccess={this.handleLoginSuccess} profile={profile} />
          <Switch>
            <Route exact path='/' component={Content} />
            <Route path='/admin' component={Login} />
            <Route path='/create' component={CreateEvent} />
            <Route path='/:id' render={(props) => <EventDetails {...props} isLoggedin={isLoggedin} profile={profile} />} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default Main
