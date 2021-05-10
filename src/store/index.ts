import Vuex from 'vuex';
import getters from './getters';
import app, { AppState } from './modules/app';
import settings, { SettingState } from './modules/settings';
import user, { UserState } from './modules/user';
import permission, { PermissionState } from './modules/permission';
export interface RootState {
  app: AppState;
  settings: SettingState;
  user: UserState;
  permission: PermissionState;
}

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    permission,
  },
  getters,
});

export default store;
