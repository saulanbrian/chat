import { useQuery } from '@tanstack/react-query'

import api from '../api.jsx'

export default function useSearchUsers(searchKey){
    return useQuery({
        queryKey:['searchResults',searchKey],
        queryFn:async() => {
            if (searchKey.trim() === '') return null
            const res = await api.get(`user/${searchKey}`)
            if (res.data?.length > 1) return res.data  
            else return {'error':'couldnt find a user with the given name'}         
        },
    })

}