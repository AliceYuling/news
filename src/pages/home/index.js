import React from 'react'
import { List, Icon, Tag } from 'antd'
import './index.css'
import { getNewsList, updateRecord, getRecommendList, getRandomList } from '../../service/api/news.js'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: '1',
      list: [],
      curTag: '体育',
      pageSize: 10,
      curPage: 1,
      total: 0,
      firstLoad: true
    }
  }

  componentDidMount() {
    this.getList()
    const userId = window.localStorage.getItem('userId')
    if (userId) {
      this.setState({
        userId
      })
    }
  }

  gotoDetail(id) {
    this.props.history.push(`/detail/${id}`);
  }

  handleTagChange(tag) {
    this.setState({
      curPage: 1
    })
    this.setState({
      firstLoad: false,
      curTag: tag
    }, () => this.getFilteredList())
  }

  // 页码改变
  handlePageChange(page) {
    this.setState({ curPage: page }, () => {
      this.state.firstLoad ? this.getList() : this.getFilteredList()
    })
  }

  // 获取某一类型的列表
  getFilteredList() {
    getNewsList(this.state.userId, this.state.curTag, this.state.curPage, this.state.pageSize).then(res => {
      this.setState({
        list: res.data.list
      })
    })
  }

  // 获取列表
  getList() {
    getRandomList(this.state.userId, this.state.curPage, this.state.pageSize).then(res => {
      this.setState({
        list: res.data.list
      })
    })
  }

  // 刷新，获取推荐列表
  refreshList() {
    getRecommendList(this.state.userId, this.state.curPage, this.state.pageSize).then(res => {
      this.setState({
        list: res.data.list
      })
    })
  }
  
  // 点击、收藏时调用接口记录
  // 1. 不感兴趣
  // 2. 点击
  // 3. 浏览
  // 4. 收藏
  // 5. 分享
  handleRecord(news, operate) {
    const record = {
      id: '2',
      news_id: news.id,
      operate,
      time: new Date(),
      user_id: this.state.userId
    }
    updateRecord(record).then(res => {
      console.log(this.state.firstLoad)
      this.state.firstLoad ? this.getList() : this.getFilteredList()
    })
  }

  render() {
    const tags = [{
      name: '科技',
      color: 'magenta'
    }, {
      name: '社会',
      color: 'purple'
    }, {
      name: '娱乐',
      color: 'green'
    }, {
      name: '国际',
      color: 'orange'
    }, {
      name: '美食',
      color: 'blue'
    }, {
      name: '其他',
      color: 'lime'
    }]

    return (
      <div className="news-list">
        <div className="news-list-header">
          <h2>新闻推荐</h2>
          <Icon
            onClick={()=>this.refreshList()}
            type="reload"
            className="icon refresh-icon"/>
        </div>
        <div className="tag new-tags">
          {tags.map(item => (
            <Tag
              key={item.color}
              color={item.color}
              onClick={()=>this.handleTagChange(item.name)}>{item.name}</Tag>
          ))}
        </div>
        <List
          itemLayout="vertical"
          size="large"
          dataSource={this.state.list}
          pagination={{
            onChange: (page) => {
              this.handlePageChange(page)
            },
            total: 50,
            simple: true,
            pageSize: this.state.pageSize,
            current: this.state.curPage
          }}
          renderItem={item => (
            <List.Item extra={
              <div>
                <Icon
                  type="star"
                  theme="twoTone"
                  twoToneColor={item.is_collected?"#eb2f96":"#ccc"}
                  onClick={()=>this.handleRecord(item,4)}
                  style={{marginRight: '16px'}} />
              </div>
            }>
              <List.Item.Meta
                title={<a href={item.source_url} target="_blank">{item.title}</a>}
                description={item.time}
                onClick={()=>this.handleRecord(item,2)}
              />
              {item.abstract_info}
            </List.Item>
          )}
        />
      </div>
    )
  }
}

export default Home
