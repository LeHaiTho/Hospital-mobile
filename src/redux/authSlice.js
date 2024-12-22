import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
import axiosConfig from "../apis/axiosConfig";
import { initializeSocket, socket } from "../utils/socket";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null, // Đảm bảo token là null ban đầu
  },

  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      // Lưu token như một chuỗi (nếu chưa phải)
      state.token = action.payload.token; // Đảm bảo action.payload.token là chuỗi
      AsyncStorage.setItem("token", action.payload.token); // Lưu vào localStorage

      if (action.payload.token) {
        initializeSocket(action.payload.token);
      }
    },
    setUserInfo: (state, action) => {
      state.user = action.payload;
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.token = null; // Xóa token khi logout
      AsyncStorage.removeItem("token"); // Xóa token trong localStorage
      AsyncStorage.removeItem("expoPushToken");
      GoogleSignin.signOut();
      if (socket) {
        socket.disconnect();
        console.log("disconnect socket");
      }
    },
  },
});

// Xuất các action và reducer
export const { login, setUserInfo, logoutSuccess } = authSlice.actions;

export const logout = () => {
  return async (dispatch, getState) => {
    const { user } = getState().auth;
    const expoPushToken = await AsyncStorage.getItem("expoPushToken");
    if (expoPushToken) {
      const response = await axiosConfig.post("/push-tokens/delete", {
        user_id: user?.id,
      });
      console.log("response", response);
    }
    dispatch(logoutSuccess());
  };
};
export default authSlice.reducer;
