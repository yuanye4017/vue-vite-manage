import type { RootState } from '../index';
import { ActionContext } from 'vuex';

export type AppState = {
  sidebar: Record<'opened' | 'withoutAnimation', boolean>;
  device: string;
};

type ActionContextType = ActionContext<AppState, RootState>;

const state: AppState = {
  sidebar: {
    opened: true,
    withoutAnimation: false,
  },
  device: 'desktop',
};

const mutations = {
  TOGGLE_SIDEBAR: (state: AppState, opened: boolean) => {
    state.sidebar.opened = opened;
    state.sidebar.withoutAnimation = false;
  },
  CLOSE_SIDEBAR: (state: AppState, withoutAnimation: boolean) => {
    state.sidebar.opened = false;
    state.sidebar.withoutAnimation = withoutAnimation;
  },
  TOGGLE_DEVICE: (state: AppState, device: string) => {
    state.device = device;
  },
};

const actions = {
  toggleSideBar({ commit }: ActionContextType, opened: boolean) {
    commit('TOGGLE_SIDEBAR', opened);
  },
  closeSideBar({ commit }: ActionContextType, { withoutAnimation }: AppState['sidebar']) {
    commit('CLOSE_SIDEBAR', withoutAnimation);
  },
  toggleDevice({ commit }: ActionContextType, device: AppState['device']) {
    commit('TOGGLE_DEVICE', device);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
