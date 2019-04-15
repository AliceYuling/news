import http from '../index.js'
/**
 * 获取新闻列表
 * @param {String} tag
 * @param {Number} pageSize
 * @param {Number} pageNum
 */
export function getNewsList(tag, pageNum, pageSize) {
  return http.get(String.raw`/news/get/${tag}`, {
    page: pageNum,
    size: pageSize
  })
}

/**
 * 刷新
 * @param {String} articleId
 */
export function getRecomendList(pageNum, pageSize) {
  return http.get('/news/recommend', {
    page: pageNum,
    size: pageSize
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
