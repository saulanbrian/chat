import { useQuery } from '@tanstack/react-query'

import api from '../api'

export const useGetMessages = (convoId) => {
  return useQuery({
    queryKey:['messages',convoId],
    queryFn:async() => {
      const res = await api.get(`conversations/${convoId}/`,{
        params:{exclude_user:true}
      })
      return res.data
    },
    staleTime:50000,
    cacheTime:50000
  })
}