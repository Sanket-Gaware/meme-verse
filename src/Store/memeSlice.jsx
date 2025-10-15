import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const sendFriendReq = createAsyncThunk(
  "memes/sendfriendreq",
  async (ReciverId, { rejectWithValue }) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const VITE_POST_ACCEPT_REJECT_REQ = import.meta.env
      .VITE_POST_ACCEPT_REJECT_REQ;
    const token = localStorage.getItem("Token");
    // console.log(`=>Bearer ${token}`);
    try {
      const response = await axios.post(
        `${BASE_URL}${VITE_POST_ACCEPT_REJECT_REQ}/${ReciverId}/send-request`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("error redux");
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const rejectFriendReq = createAsyncThunk(
  "memes/acceptfriendreq",
  async (ReciverId, { rejectWithValue }) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const VITE_POST_REJECT_REQ = import.meta.env.VITE_POST_ACCEPT_REJECT_REQ;
    try {
      const response = await axios.post(
        `${BASE_URL}${VITE_POST_REJECT_REQ}/${ReciverId}/reject-request`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      // console.log("error redux");
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const acceptFriendReq = createAsyncThunk(
  "memes/acceptfriendreq",
  async (ReciverId, { rejectWithValue }) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const VITE_POST_ACCEPT_REQ = import.meta.env.VITE_POST_ACCEPT_REJECT_REQ;
    console.log(localStorage.getItem("Token"));

    try {
      const response = await axios.post(
        `${BASE_URL}${VITE_POST_ACCEPT_REQ}/${ReciverId}/accept-request`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      // console.log("error redux");
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getAllFriendReqs = createAsyncThunk(
  "memes/getfriendreqs",
  async (_, { rejectWithValue }) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const VITE_GET_ALL_FRIEND_REQ = import.meta.env.VITE_GET_ALL_FRIEND_REQ;
    try {
      const response = await axios.get(
        `${BASE_URL}${VITE_GET_ALL_FRIEND_REQ}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      // console.log("error redux");
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getAllFriends = createAsyncThunk(
  "memes/getfriends",
  async (_, { rejectWithValue }) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const VITE_GET_ALL_FRIENDS = import.meta.env.VITE_GET_ALL_FRIENDS;
    try {
      const response = await axios.get(`${BASE_URL}${VITE_GET_ALL_FRIENDS}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      // console.log("error redux");
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getAllStories = createAsyncThunk(
  "memes/getstories",
  async (_, { rejectWithValue }) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const VITE_GET_ALL_STORIES = import.meta.env.VITE_GET_ALL_STORIES;
    try {
      const response = await axios.get(`${BASE_URL}${VITE_GET_ALL_STORIES}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.log("error redux");
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const postStoryImage = createAsyncThunk(
  "story/postImage",
  async (formData, { rejectWithValue }) => {
    const POST_MEME_URL = import.meta.env.VITE_POST_MEME_URL;

    try {
      const res = await axios.post(`${POST_MEME_URL}`, formData);
      return res;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const saveStoryToDB = createAsyncThunk(
  "story/saveToDB",
  async (payload, { rejectWithValue }) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    try {
      const { uploadedBy, ...storyData } = payload;

      const res = await axios.post(
        `${BASE_URL}api/memes/addstory/${uploadedBy}`,
        storyData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const sendOtp = createAsyncThunk(
  "auth/sendOtp",
  async (email, { rejectWithValue }) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    if (email === "") {
      return rejectWithValue("Email is required");
    }

    try {
      const response = await axios.post(`${BASE_URL}api/auth/send-otp`, {
        username: email,
      });
      return response;
    } catch (error) {
      const errMsg = error.response?.data?.msg || "Something went wrong!";
      return rejectWithValue(errMsg);
    }
  }
);

export const getLastMessage = createAsyncThunk(
  "auth/lastMessage",
  async (id, { rejectWithValue }) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    try {
      const response = await axios.get(
        `${BASE_URL}api/messages/getlastmessage/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    } catch (error) {
      const errMsg = error.response?.data?.msg || "Something went wrong!";
      return rejectWithValue(errMsg);
    }
  }
);
// setNewPassword Thunk
export const setNewPassword = createAsyncThunk(
  "auth/setNewPassword",
  async ({ email, otp, password }, { rejectWithValue }) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    if (otp === "" || password === "") {
      return rejectWithValue("OTP & Password required");
    }

    try {
      const response = await axios.post(`${BASE_URL}api/auth/reset-password`, {
        email: email,
        otp: otp,
        newPassword: password,
      });
      return response;
    } catch (error) {
      const errMsg = error.response?.data?.msg || "Something went wrong!";
      console.log(error);
      return rejectWithValue(errMsg);
    }
  }
);

//get all memes
export const getAllMemes = createAsyncThunk(
  "memes/getMemes",
  async (_, { rejectWithValue }) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const GET_MEME = import.meta.env.VITE_GET_ALL_MEMES;
    try {
      const response = await axios.get(`${BASE_URL}${GET_MEME}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

//get user memes
export const getUserMemes = createAsyncThunk(
  "memes/getUserMemes",
  async (username, { rejectWithValue }) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const GET_MEME = import.meta.env.VITE_GET_USER_MEMES;
    try {
      const response = await axios.get(`${BASE_URL}${GET_MEME}/${username}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Async thunk to delete a meme by user
export const deleteUserMeme = createAsyncThunk(
  "memes/deleteUserMeme",
  async ({ memeId, userId }, { rejectWithValue }) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const DELETE_MEME_URL = import.meta.env.VITE_DELETE_USER_MEME;
    console.log(memeId);
    try {
      const response = await axios.delete(
        `${BASE_URL}${DELETE_MEME_URL}/${memeId}`,
        {
          data: {
            userId,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Async thunk to post memes to database
export const postMeme2 = createAsyncThunk(
  "memes/postMeme2",
  async ({ title, image, caption, uploadedBy }, { rejectWithValue }) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const POST_MEME_URL2 = import.meta.env.VITE_POST_MEME_URL2;
    try {
      const response = await axios.post(
        `${BASE_URL}${POST_MEME_URL2}`,
        {
          title,
          image,
          caption,
          uploadedBy,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// Async thunk to post memes to imgbb
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

export const signup = createAsyncThunk(
  "users/signup",
  async (
    { profile, fullname, username, gender, password, confirmPassword },
    { rejectWithValue }
  ) => {
    const Base_Url = import.meta.env.VITE_BASE_URL;
    try {
      const response = await axios.post(`${Base_Url}api/auth/signup`, {
        profile,
        fullname,
        username,
        gender,
        password,
        confirmPassword,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const login = createAsyncThunk(
  "users/login",
  async ({ username, password }, { rejectWithValue }) => {
    const Base_Url = import.meta.env.VITE_BASE_URL;
    try {
      const response = await axios.post(`${Base_Url}api/auth/login/`, {
        username,
        password,
      });
      return response;
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
    friends: [],
    friendReq: [],
    userToChat: "",
    unreadUserCounts: [],
    unreadCounts: {},
    userMemes: [],
    allUsersMemes: [],
    allStories: [],
    hasFetchedAllMemes: false,
    lastMessages: {},
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
    setUserToChatR: (state, action) => {
      state.userToChat = action.payload;
    },
    addUnreadUserCounts: (state, action) => {
      const userId = action.payload;
      if (!state.unreadUserCounts.includes(userId)) {
        state.unreadUserCounts.push(userId);
      }
    },
    clearUnreadUserCounts: (state) => {
      state.unreadUserCounts = [];
    },
    incrementUnread: (state, action) => {
      const id = action.payload;
      if (state.unreadCounts[id]) {
        state.unreadCounts[id]++;
      } else {
        state.unreadCounts[id] = 1;
      }
    },
    resetUnread: (state, action) => {
      const id = action.payload;
      state.unreadCounts[id] = 0;
    },
    setLastMessage: (state, action) => {
      const { userId, message } = action.payload;
      state.lastMessages[userId] = message;
    },
    setAllStories: (state, action) => {
      state.allStories = action.payload;
    },
    setAllFriends: (state, action) => {
      state.friends = action.payload;
    },
    setAllFriendReq: (state, action) => {
      state.friendReq = action.payload;
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
      })
      .addCase(getUserMemes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserMemes.fulfilled, (state, action) => {
        state.loading = false;
        state.userMemes = action.payload;
      })
      .addCase(getUserMemes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllMemes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // .addCase(getAllMemes.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.allUsersMemes = action.payload;
      // })
      .addCase(getAllMemes.fulfilled, (state, action) => {
        state.loading = false;
        state.allUsersMemes = action.payload;
        state.hasFetchedAllMemes = true;
      })

      .addCase(getAllMemes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllStories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllStories.fulfilled, (state, action) => {
        state.loading = false;
        state.allStories = action.payload.data;
      })
      .addCase(getAllStories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  likeMeme,
  addComment,
  setMemes,
  setUserToChatR,
  addUnreadUserCounts,
  clearUnreadUserCounts,
  incrementUnread,
  resetUnread,
  setLastMessage,
  setAllStories,
  setAllFriends,
  setAllFriendReq,
} = memeSlice.actions;

export default memeSlice.reducer;
