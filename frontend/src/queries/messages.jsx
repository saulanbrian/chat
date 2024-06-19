import { useQuery } from '@tanstack/react-query'

import api from '../api'

export const useGetMessages = (convoId) => {
  return useQuery({
    queryKey:['messages',convoId],
    queryFn:async() => {
      const res = await api.get(`conversations/${convoId}/messages/`,{exclude_user:true})
      return res.data
    },
    staleTime:5000,
    cacheTime:5000
  })
}