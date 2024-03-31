import { createAsyncThunk } from '@reduxjs/toolkit'

//! ======================== Redux : Async Thunk Actions ============================

/**
 * Api Action
 */
export const apiAction = createAsyncThunk(
    'test/apiAction',
    async (val, thunkAPI) => {
        try {
            // const result = await axiosRequest({
            //   url: '/api_url',
            //   method: 'POST',
            //   data: val,
            // })
            return true
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response ? error.response?.data : error.data
            )
        }
    }
)