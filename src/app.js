import React from 'react'
import {render} from 'react-dom'
import Container from './components/maincontainer'
import Header from './components/header/header'
import '../css/style.css'

import { BrowserRouter, Route } from 'react-router-dom'
import FormContainer from './components/admin/login'

const AdminRoute = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Route exact path='/' component={Container} />
      <Route path='/admin' component={FormContainer} />
    </div>
  </BrowserRouter>
)

render(<AdminRoute />, document.getElementById('root'))
