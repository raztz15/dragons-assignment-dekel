import { Button } from '@mui/material'
import { RootState } from '@src/store'
import { toggleDirection } from '@src/store/slices/direction/rtlSlice'
import { useDispatch, useSelector } from 'react-redux'

export const RtlToggle = () => {

    const dispatch = useDispatch()
    const { direction } = useSelector((state: RootState) => state.directions)

    return (
        <Button variant='contained' onClick={() => dispatch(toggleDirection())}>
            Switch to {direction === 'ltr' ? 'RTL' : 'LTR'}
        </Button>
    )
}
