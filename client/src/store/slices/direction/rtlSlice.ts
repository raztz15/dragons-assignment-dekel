import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IRtlState {
    direction: 'rtl' | 'ltr'
}

const initialState: IRtlState = {
    direction: 'ltr'
}

const rtlSlice = createSlice({
    name: 'rtl',
    initialState,
    reducers: {
        toggleDirection: (state) => {
            state.direction = state.direction === 'ltr' ? 'rtl' : 'ltr'
        },
        setDirection: (state, action: PayloadAction<'ltr' | 'rtl'>) => {
            state.direction = action.payload
        }
    }
})

export const { toggleDirection, setDirection } = rtlSlice.actions
export const directionsReducer = rtlSlice.reducer;