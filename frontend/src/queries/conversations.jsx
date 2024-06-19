import { useQuery, useMutation } from '@tanstack/react-query'

import api from '../api'

export const useGetConversations = () => {
  return useQuery({
    queryKey:['conversations'],
    queryFn:async() => {
      const res = await api.get('conversations')
      return res.data
    },
  })
}