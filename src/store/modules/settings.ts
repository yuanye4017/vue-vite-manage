import defaultSettings from '@/settings';
import type { RootState } from '../index';
import { ActionContext } from 'vuex';

export type SettingState = {
  showSettings?: boolean;
  fixedHeader?: boolean;
  sidebarLogo?: boolean;
  [propName: string]: any;
};

type ActionContextType = ActionContext<SettingState, RootState>;

const { showSettings, fixedHeader, sidebarLogo } = defaultSettings;

const state: SettingState = {
  showSettings: showSettings,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
};

const mutations = {
  CHANGE_SETTING: (state: SettingState, { key, value }: { key: string; value: boolean }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value;
    }
  },
};

const actions = {
  changeSetting({ commit }: ActionContextType, data: { key: string; value: boolean }) {
    commit('CHANGE_SETTING', data);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
