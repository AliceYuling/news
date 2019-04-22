import React from 'react'
import { Icon } from 'antd'
import './index.css'
import { withRouter } from 'react-router-dom'
import { NavLink } from "react-router-dom"

class Navbar extends React.Component {
  state = {
    user: ''
  }

  componentDidMount() {
    const user = window.localStorage.getItem('user')
    this.setState({ user })
  }

  render() {
    return (
      <div className="nav-bar clearfix">
      {this.props.location.pathname ==='/home' ? (
        <div className="user-wrap">
          <NavLink to='/login'>切换用户</NavLink>
          <Icon className="icon icon-user" type="user" />
          <span>{window.localStorage.getItem('user')}</span>
        </div>
      ): null}
      </div>
    )
  }
}

export default withRouter(Navbar)
