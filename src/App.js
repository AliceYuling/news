import React, { Component } from 'react'
import { Layout } from 'antd'
import './App.css';
import { MainRoute } from './router'
import Navbar from './components/navbar'

const { Header, Content } = Layout

class App extends Component {
  render() {
    return (
      <Layout className="App">
        <Header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1, width: '100%' }}>
          <Navbar />
        </Header>
        <Content className="app-content" style={{ padding: '64px', marginTop: 64 }}>
          <MainRoute />
        </Content>
      </Layout>
    );
  }
}

export default App;
