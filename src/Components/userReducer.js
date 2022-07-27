import { createSlice } from '@reduxjs/toolkit'





export const userSlice = createSlice({
  name:"users",
  initialState: {
    currentUser: {}
  },

  reducers: {
    setuser: (state, action) => {
     if (action.payload._id) state.currentUser = action.payload
    },

  },
});


export const { setuser } = userSlice.actions;
export const selectUser = state => state.users.currentUser
export default userSlice.reducer;
