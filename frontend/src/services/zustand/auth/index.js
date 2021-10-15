import create from 'zustand';
// import dayjs from 'dayjs';
import { USER_INFO_SESSION_STORAGE_FIELD } from '../../api/auth/constants';

import { login, signUp } from '../../api/auth';

const cachedUserInfo = localStorage.getItem(USER_INFO_SESSION_STORAGE_FIELD);
const signedIn = Boolean(cachedUserInfo);

const initialState = {
  userInfo: null,
  signedIn,
  isLoading: false,
};

export const useAuthStore = create((set, get) => ({
  ...initialState,
  login: async (email, password) => {
    const { signedIn } = get();
    if (!signedIn) {
      set({ isLoading: true });
      // const result =
      await login(email, password);
      // if (result.data) {
      //   const { email, userName, userId } = result.data;
      //   const userInfo = {
      //     email,
      //     userName,
      //     userId,
      //   };
      //   localStorage.setItem(USER_INFO_SESSION_STORAGE_FIELD, userInfo);
      //   set({
      //     userInfo,
      //     signedIn: true,
      //     loginTimeStamp: dayjs(),
      //     isLoading: false,
      //   });
      // }
      set({ signedIn: true, isLoading: false });
    }
  },
  logout: async () => {
    try {
      localStorage.removeItem(USER_INFO_SESSION_STORAGE_FIELD);
      localStorage.clear();
    } catch {
      // Empty
    }
    set({ signedIn: false });
  },
  signUp: async (userName, email, password) => {
    await signUp(userName, email, password);
  },
}));
