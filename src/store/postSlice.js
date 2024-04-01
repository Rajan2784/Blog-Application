import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    userPosts: [],
    loading: true,
  },
  reducers: {
    setPostInStore: (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    },
    setUserPosts: (state, action) => {
      state.userPosts = action.payload;
      state.loading = false;
    },
  },
});
export const { setPostInStore, setUserPosts } = postSlice.actions;

export default postSlice.reducer;
