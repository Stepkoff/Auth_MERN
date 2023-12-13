import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface User {
  createdAt: string,
  email: string,
  profilePicture: string,
  updatedAt: string,
  username: string,
  __v: number,
  _id: string,
}

interface InitialState {
  currentUser: null | User,
  isLoading: boolean,
  isError: boolean,
  errorMessage: null | string
}

const initialState: InitialState = {
  currentUser: null,
  isLoading: false,
  isError: false,
  errorMessage: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.currentUser = action.payload;
      state.isError = false;
      state.errorMessage = null;
    },
    setError: (state, action: PayloadAction<{isError: boolean, message: string | null}>) => {
      state.isLoading = false;
      state.isError = action.payload.isError;
      state.errorMessage = action.payload.message;
    }
  }
})


export const {setError, setCurrentUser, setIsLoading} = userSlice.actions;
export const userReducer =  userSlice.reducer


