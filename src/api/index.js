import axios from 'axios'

import {
  NewInfoResource,
  NewsDateResource,
  NewsIdResource,
  NewsResource,
  SectionIdResource,
  SectionResource,
  TopicIdResource,
  TopicResource
} from './resource'

export default {
  getNews() {
    return axios.get(NewsResource)
  },
  getNewsById(id) {
    return axios.get(NewsIdResource + id)
  },
  getNewsByDate(date) {
    return axios.get(NewsDateResource + date)
  },
  getNewsByInfo(id) {
    return axios.get(NewInfoResource,{
        params:{
            id:id
        }
    })
  },
  getSections() {
    return axios.get(SectionResource)
  },
  getSectionById(id) {
    return axios.get(SectionIdResource,{
        params:{
            sectionid:id
        }
    })
  },
  getTopics() {
    return axios.get(TopicResource)
  },
  getTopicById(id) {
    return axios.get(TopicIdResource + id)
  }

}
