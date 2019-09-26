// 存放文章所有接口模块
import { axios } from './../utils/axios.config'
import API from './../constant/api'
export function getArticles (params) {
  return axios({
    url: API.API_ARTICLES,
    params
  })
}
