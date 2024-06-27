import { useQuery } from '@tanstack/react-query'

import api from '../api.jsx'

export default function useSearchUsers(searchKey){
    return useQuery({
        queryKey:['searchResults'],
        queryFn:async() => {
                if ( typeof(searchKey) != 'undefined'){
                    if (searchKey.trim() === ''){
                        return []
                    }
                    const res = await api.get(`user/${searchKey}/`)
                    return res.data
                }else{  
                    return null
                }
            },
        enabled: !!searchKey
        },
    )

}