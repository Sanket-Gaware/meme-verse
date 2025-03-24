import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch memes
export const fetchMemes = createAsyncThunk(
  "memes/fetchMemes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("https://api.imgflip.com/get_memes");
      return response.data.data.memes; // Adjust based on your API response structure
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://node-js-view-point.onrender.com/api/users/",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
            "Content-Type": "application/json",
          },
        }
      );
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
