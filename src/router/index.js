import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../pages/home'
import Register from '../pages/register'
import Login from '../pages/login'

export const MainRoute = () => (
  <Switch>
    <Route exact path='/' component={Register}></Route>
    <Route exact path='/home' component={Home}></Route>
    <Route exact path='/register' component={Register}></Route>
    <Route exact path='/login' component={Login}></Route>
  </Switch>
)
