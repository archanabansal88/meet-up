import React from 'react'
import {render} from 'react-dom'
import Content from './components/content'
import Header from './components/header'
import CreateEvent from './components/createevent'
import '../css/style.css'
import { BrowserRouter, Route } from 'react-router-dom'
import Login from './components/admin'

const AdminRoute = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Route exact path='/' component={Content} />
      <Route path='/admin' component={Login} />
      <Route path='/create' component={CreateEvent} />
    </div>
  </BrowserRouter>
)

render(<AdminRoute />, document.getElementById('root'))
