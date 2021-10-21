import create from 'zustand';
import dayjs from 'dayjs';
import { USER_INFO_SESSION_STORAGE_FIELD } from '../../api/auth/constants';

import { login, register } from '../../api/auth';

const cachedUserInfo = localStorage.getItem(USER_INFO_SESSION_STORAGE_FIELD);
const signedIn = Boolean(localStorage.getItem(USER_INFO_SESSION_STORAGE_FIELD));

const initialState = {
  userInfo: cachedUserInfo ? JSON.parse(cachedUserInfo) : null,
  signedIn,
  isLoading: false,
};

export const useAuthStore = create((set, get) => ({
  ...initialState,
  login: async (username, password) => {
    const { signedIn } = get();
    if (!signedIn) {
      set({ isLoading: true });
      const result = await login(username, password);
      if (typeof result === 'string') {
        set({ isLoading: false });
        return result;
      } else {
        if (result.data) {
          const { email, username, userid } = result.data;
          const userInfo = {
            email,
            username,
            userid,
          };
          localStorage.setItem(
            USER_INFO_SESSION_STORAGE_FIELD,
            JSON.stringify(userInfo)
          );
          set({
            userInfo,
            signedIn: true,
            loginTimeStamp: dayjs(),
            isLoading: false,
          });
          return userInfo;
        }
      }
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
  register: async (email, username, password) => {
    set({ isLoading: true });
    const result = await register(email, username, password);
    set({ isLoading: false });
    if (typeof result === 'string') {
      if (result.includes('400')) {
        return 'A user with that username already exists.';
      } else {
        return result;
      }
    } else {
      return result;
    }
  },
}));
