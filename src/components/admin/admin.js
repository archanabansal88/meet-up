import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom'
import DashBoard from './dashboard'
import EventForm from '../eventForm'

class Admin extends Component {
  constructor (props) {
    super(props)
    this.state = {
      event: false
    }
    this.handleEventClick = this.handleEventClick.bind(this)
  }

  handleEventClick (event) {
    this.setState({event})
  }
  render () {
    const {event} = this.state
    return (
      <div>
        {event && <Redirect to={`/admin/edit`} />}
        <Route exact path='/admin' render={() => <h2> Please login as admin</h2>} />
        <Route exact path='/admin/dashboard' render={() => <DashBoard onEventClick={this.handleEventClick} />} />
        <Route exact path='/admin/create' component={EventForm} />
        <Route exact path='/admin/edit' render={() => <EventForm {...event} isEditMode />} />
      </div>
    )
  }
}

export default Admin
