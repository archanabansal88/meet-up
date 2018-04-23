import React from 'react'
import {render} from 'react-dom'
import Content from './components/content'
import Header from './components/header'
import CreateEvent from './components/createevent'
import EventDetails from './components/eventdetails'
import { BrowserRouter, Route } from 'react-router-dom'
import Login from './components/admin'
import '../css/style.css'

const RoutePath = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Route exact path='/' component={Content} />
      <Route path='/admin' component={Login} />
      <Route path='/create' component={CreateEvent} />
      <Route path='/details' component={EventDetails} />
    </div>
  </BrowserRouter>
)

render(<RoutePath />, document.getElementById('root'))
