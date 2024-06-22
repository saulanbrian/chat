import {Box} from '@mui/material'

import { useRef, useEffect} from 'react'

export default function AutoScrollBox({children,sx}){
    
    const boxRef = useRef(null)

    useEffect(() => {
        const box = boxRef.current;

        if(box){
            box.scrollTop = box.scrollHeight;
        }

    },[children])

    return (
    <Box sx={sx} ref={boxRef}>
        { children }
    </Box>
    )
}