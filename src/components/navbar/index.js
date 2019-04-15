import React from 'react'
import { Icon } from 'antd'
import './index.css'

class Navbar extends React.Component {
  render() {
    const username = 'user'
    return (
      <div className="nav-bar clearfix">
        <div className="user-wrap">
          <Icon className="icon icon-user" type="user" />
          <span>{username}</span>
        </div>
      </div>
    )
  }
}

export default Navbar
