import apiClient from './AxiosClient'
import type { AxiosResponse } from 'axios'
import type { AdvisorItem } from '@/type'

export default {
  getAdvisorrs(perPage: number, page: number): Promise<AxiosResponse<AdvisorItem[]>> {
    // perPage is limit
    // page is number of pages
    return apiClient.get<AdvisorItem[]>('/advisor?_limit=' + perPage + '&_page=' + page)
  },
  getAllAdvisors() : Promise<AxiosResponse<AdvisorItem[]>> {
    return apiClient.get<AdvisorItem[]>('/AllAdvisors')
  },
  getAdvisorById(id : string) : Promise<AxiosResponse<AdvisorItem>>{
    return apiClient.get<AdvisorItem>('/advisors/'+id.toString())
  }
}