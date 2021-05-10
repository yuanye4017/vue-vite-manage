import Vuex from 'vuex';
import getters from './getters';
import app, { AppState } from './modules/app';
import settings, { SettingState } from './modules/settings';
import user from './modules/user';

export interface RootState {
  app: AppState;
  settings: SettingState;
}

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
  },
  getters,
});

export default store;
