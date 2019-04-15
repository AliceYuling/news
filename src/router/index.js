import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../pages/home'
import Detail from '../pages/detail'

export const MainRoute = () => (
  <Switch>
    <Route exact path='/' component={Home}></Route>
    <Route exact path='/detail/:id' component={Detail}></Route>
  </Switch>
)
