import http from '../index.js'

/**
 * 获取某一类别的新闻列表
 * @param {String} tag
 * @param {Number} pageSize
 * @param {Number} pageNum
 */
export function getNewsList(userId, tag, pageNum, pageSize) {
  return http.get(String.raw`/news/get/${tag}`, {
    userId,
    page: pageNum,
    size: pageSize
  })
}

/**
 * 初始加载列表
 * @param {*} userId 
 * @param {*} pageNum 
 * @param {*} pageSize 
 */
export function getRandomList(userId, pageNum, pageSize) {
  return http.get('/news/get/random', {
    userId,
    page: pageNum,
    size: pageSize
  })
}

/**
 * 刷新
 * @param {String} articleId
 */
export function getRecommendList(userId, pageNum, pageSize) {
  return http.get('/news/recommend', {
    pageNum,
    pageSize,
    userId
  })
}

/**
 * 点击新闻
 * @param {logEntity} Record
 * logEntity.id {String}
 * logEntity.news_id {String}
 * operate {Number}
 * time {Time}
 * user_id {Number}
 */
export function updateRecord(record) {
  return http.post('/news/log', record)
}

/**
 * 收藏新闻
 * 
 */