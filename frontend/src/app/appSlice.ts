import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import backend from '../services/Backend'


export interface AppState {
    error?: string,
    status: 'signin' | 'signup' | 'loading' | 'files' | 'failed';
    access_token?: string
}
  
const access_token = localStorage.getItem('access_token') as string

const initialState: AppState = {
    error: undefined,
    access_token,
    status: access_token ? 'files' : 'signin',
};
  
export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        signin: (state) => {
            console.log('signin')
            state.status = 'signin'
        },
        signup: (state) => {
            console.log('signup')
            state.status = 'signup'
        },
        accessToken: (state, action) => {
            if (action.payload) {
                state.status = 'files'
                state.access_token = action.payload
                localStorage.setItem('access_token', action.payload)
                setInterval(() => window.location.href = `${backend.url}/file/auth2?token=${action.payload}`)
            }   
        }
    }
});

export const { signin, signup, accessToken } = counterSlice.actions;

export const selectStatus = (state: RootState) => state.app.status;
export const selectError = (state: RootState) => state.app.error;
export const selectToken = (state: RootState) => state.app.access_token;

export default counterSlice.reducer;
