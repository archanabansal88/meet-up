import React from 'react'
import {render} from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Content from './components/content'
import Header from './components/header'
import CreateEvent from './components/createEvent'
import EventDetails from './components/eventDetails'
import Login from './components/admin'
import '../css/style.css'

const RoutePath = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={Content} />
        <Route path='/admin' component={Login} />
        <Route path='/create' component={CreateEvent} />
        <Route path='/:id' component={EventDetails} />
      </Switch>
    </div>
  </BrowserRouter>
)

render(<RoutePath />, document.getElementById('root'))
