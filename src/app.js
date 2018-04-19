import React from 'react'
import {render} from 'react-dom'
import Container from './components/maincontainer'
import Header from './components/header/header'
import CreateEvent from './components/createevent/createevent'
import '../css/style.css'
import { BrowserRouter, Route } from 'react-router-dom'
import Login from './components/admin/login'

const AdminRoute = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Route exact path='/' component={Container} />
      <Route path='/admin' component={Login} />
      <Route path='/create' component={CreateEvent} />
    </div>
  </BrowserRouter>
)

render(<AdminRoute />, document.getElementById('root'))
