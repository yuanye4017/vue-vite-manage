import { login, logout, getInfo } from '@/api/user';
import type { RootState } from '../index';
import { ActionContext } from 'vuex';
import { getToken, setToken, removeToken } from '@/utils/auth';
import { resetRouter } from '@/router';

export type UserState = {
  token: string | undefined;
  name: string;
  avatar: string;
  roles: string[] | undefined;
};

type UserInfoType = {
  username: string;
  password: string;
};

type ActionContextType = ActionContext<UserState, RootState>;

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
  };
};

const state: UserState = getDefaultState();

const mutations = {
  RESET_STATE: (state: UserState) => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state: UserState, token: string) => {
    state.token = token;
  },
  SET_NAME: (state: UserState, name: string) => {
    state.name = name;
  },
  SET_AVATAR: (state: UserState, avatar: string) => {
    state.avatar = avatar;
  },
  SET_ROLES: (state: UserState, roles: string[]) => {
    state.roles = roles;
  },
};

const actions = {
  // user login
  login({ commit }: ActionContextType, userInfo: UserInfoType) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then((response) => {
          const { data } = response as any;
          commit('SET_TOKEN', data.token);
          setToken(data.token);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // get user info
  getInfo({ commit, state }: ActionContextType) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then((response) => {
          const { data } = response;

          if (!data) {
            return reject('Verification failed, please Login again.');
          }

          const { name, avatar, roles } = data;

          commit('SET_NAME', name);
          commit('SET_AVATAR', avatar);
          commit('SET_ROLES', roles);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit }: ActionContextType) {
    return new Promise((resolve, reject) => {
      logout()
        .then(() => {
          removeToken(); // must remove  token  first
          resetRouter();
          commit('RESET_STATE');
          resolve('');
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // remove token
  resetToken({ commit }: ActionContextType) {
    return new Promise((resolve) => {
      removeToken(); // must remove  token  first
      commit('RESET_STATE');
      resolve('');
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
