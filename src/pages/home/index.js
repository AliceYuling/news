import React from 'react'
import { List, Icon, Tag } from 'antd'
import './index.css'
import { getNewsList, updateRecord } from '../../service/api/news.js'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      curTag: '体育',
      pageSize: 10,
      curPage: 1,
      total: 0
    }
  }

  componentDidMount() {
    this.getList()
  }

  gotoDetail(id) {
    this.props.history.push(`/detail/${id}`);
  }

  handleTagChange(tag) {
    this.setState({
      curTag: tag
    })
    this.getList()
  }

  getList() {
    getNewsList(this.state.curTag, this.state.curPage, this.state.pageSize).then(res => {
      this.setState({
        list: res.data.list
      })
    })
  }

  handleRecord(news, operate) {
    if (operate === 1) {

    }
    const record = {
      id: '2',
      news_id: news.id,
      operate,
      time: new Date(),
      user_id: 0
    }
    updateRecord(record).then(res => {
      console.log(res.data)
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
            onClick={()=>this.getList()}
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
              this.setState({ curPage: page })
            },
            pageSize: this.state.pageSize,
            current: this.state.curPage
          }}
          renderItem={item => (
            <List.Item extra={
              <div>
                <Icon
                  type="star"
                  theme="twoTone"
                  twoToneColor={item.isStar?"#eb2f96":"#ccc"}
                  onClick={()=>this.handleRecord(item,1)}
                  style={{marginRight: '16px'}} />
                <a href="javascript:void(0)" onClick={()=>this.handleRecord(item, 4)}>不感兴趣</a>
              </div>
            }>
              <List.Item.Meta
                title={<a href={item.source_url} target="_blank">{item.title}</a>}
                description={item.time}
                onClick={()=>this.handleRecord(item,0)}
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
