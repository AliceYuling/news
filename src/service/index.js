import axios from 'axios'

const API_URL = process.env.API_URL || 'http://10.8.1.139:8088'

const service = axios.create({
  baseURL: API_URL, // api 的 base_url
  timeout: 5000 // 请求超时时间
})

const http = {
  get: (url, data) => {
    const config = {}
    if (data) Object.assign(config, { params: data })
    return service.get(url, config)
  },
  post: (url, params) => {
    return service.post(url, params)
  }
}

export default http
