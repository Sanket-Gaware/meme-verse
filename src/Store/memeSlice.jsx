import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch memes
export const postMeme = createAsyncThunk(
  "memes/postMeme",
  async (formData, { rejectWithValue }) => {
    const POST_MEME_URL = import.meta.env.VITE_POST_MEME_URL;
    try {
      const response = await axios.post(`${POST_MEME_URL}`, formData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchMemes = createAsyncThunk(
  "memes/fetchMemes",
  async (_, { rejectWithValue }) => {
    const GET_MEME_URL = import.meta.env.VITE_GET_MEME_URL;
    try {
      const response = await axios.get(GET_MEME_URL);
      return response.data.data.memes;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    // console.log("env=>", import.meta.env);
    try {
      const response = await axios.get(`${BASE_URL}api/users/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const memeSlice = createSlice({
  name: "memes",
  initialState: {
    memes: [],
    users: [],
    likedMemes: ["119215120", "322841258", "188390779", "247375501"],
    comments: {
      [221578498]: ["awsome", "Nice one"],
      [252758727]: ["thisone is my fav"],
      [4087833]: ["Die,Die,Die....!"],
    },
    loading: false,
    error: null,
  },
  reducers: {
    likeMeme: (state, action) => {
      const memeId = action.payload;
      if (state.likedMemes.includes(memeId)) {
        // Toggle (unlike)
        state.likedMemes = state.likedMemes.filter((id) => id !== memeId);
      } else {
        state.likedMemes.push(memeId);
      }
    },
    addComment: (state, action) => {
      const { memeId, comment } = action.payload;
      if (!state.comments[memeId]) {
        state.comments[memeId] = [];
      }
      state.comments[memeId].push(comment);
    },
    setMemes: (state, action) => {
      state.memes = action.payload;
    },
    addMeme: (state, action) => {
      state.memes = [action.payload, ...state.memes];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMemes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMemes.fulfilled, (state, action) => {
        state.loading = false;
        state.memes = action.payload;
      })
      .addCase(fetchMemes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { likeMeme, addComment, setMemes, addMeme } = memeSlice.actions;
export default memeSlice.reducer;
