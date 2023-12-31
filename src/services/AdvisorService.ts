import apiClient from './AxiosClient'
import type { AxiosResponse } from 'axios'
import type { AdvisorItem, RegisterUserItem } from '@/type'


export default {
  getAdvisors(perPage: number, page: number): Promise<AxiosResponse<AdvisorItem[]>> {
    // perPage is limit
    // page is number of pages
    return apiClient.get<AdvisorItem[]>('/advisors?_limit=' + perPage + '&_page=' + page)
  },
  getAllAdvisors() : Promise<AxiosResponse<AdvisorItem[]>> {
    return apiClient.get<AdvisorItem[]>('/AllAdvisors')
  },
  getAdvisorById(id : string) : Promise<AxiosResponse<AdvisorItem>>{
    return apiClient.get<AdvisorItem>('/advisors/'+id.toString())
  },
  getAdvisorByStudent(id :string) : Promise<AxiosResponse<AdvisorItem>> {
    return apiClient.get<AdvisorItem>('/advisorByStudent/'+id.toString())
  },
  getAdvisorrByKeyword(keyword: string, perPage: number, page: number): Promise<AxiosResponse<AdvisorItem[]>>{
    return apiClient.get<AdvisorItem[]>('/advisors?filter=' + keyword + '&_limit=' + perPage + '&_page=' + page)
  },
  addAdvisor(advisor: RegisterUserItem): Promise<AxiosResponse<AdvisorItem>> {
    return apiClient.post<AdvisorItem>("/api/v1/auth/register/advisor", advisor)
  }
  ,
  getAdvisorByKeyword(
    keyword: string,
    perPage: number,
    page: number
  ): Promise<AxiosResponse<AdvisorItem[]>> {
    return apiClient.get<AdvisorItem[]>(
      "/advisors?title=" + keyword + "&_limit=" + perPage + "&_page=" + page
    );
  },
}

