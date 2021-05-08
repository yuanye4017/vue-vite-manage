import Cookies from 'js-cookie';
import type { RootState } from '../index'
import { ActionContext } from 'vuex';

export type AppState = {
  sidebar: Record<'opened' | 'withoutAnimation', boolean>;
  device: string;
};

type ActionContextType = ActionContext<AppState, RootState>;

const state: AppState = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') === '1' ? false : true,
    withoutAnimation: false,
  },
  device: 'desktop',
};

const mutations = {
  TOGGLE_SIDEBAR: (state: AppState) => {
    state.sidebar.opened = !state.sidebar.opened;
    state.sidebar.withoutAnimation = false;
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', '1');
    } else {
      Cookies.set('sidebarStatus', '0');
    }
  },
  CLOSE_SIDEBAR: (state: AppState, withoutAnimation: boolean) => {
    Cookies.set('sidebarStatus', '0');
    state.sidebar.opened = false;
    state.sidebar.withoutAnimation = withoutAnimation;
  },
  TOGGLE_DEVICE: (state: AppState, device: string) => {
    state.device = device;
  },
};

const actions = {
  toggleSideBar({ commit }: ActionContextType) {
    commit('TOGGLE_SIDEBAR');
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
