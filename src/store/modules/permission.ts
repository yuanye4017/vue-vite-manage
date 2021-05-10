import { constantRoutes, asyncRoutes } from "@/router/index";
import type { AppRouteModule } from "@/router/types";
import type { RootState } from '../index'
import { ActionContext } from 'vuex';

export type PermissionState = {
  routes: AppRouteModule[];
  addRoutes: AppRouteModule[];
};

type ActionContextType = ActionContext<PermissionState, RootState>;

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles: string[], route: AppRouteModule) {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => route.meta?.roles?.includes(role));
  } else {
    return true;
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes: AppRouteModule[], roles: string[]) {
  const res: any[] = [];

  routes.forEach((route) => {
    const tmp = { ...route };
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      res.push(tmp);
    }
  });

  return res;
}

const state: PermissionState = {
  routes: constantRoutes,
  addRoutes: [],
};

const mutations = {
  SET_ROUTES: (state: PermissionState, routes: AppRouteModule[]) => {
    state.addRoutes = routes;
    state.routes = constantRoutes.concat(routes);
  },
};

const actions = {
  generateRoutes({ commit }: ActionContextType, roles: string[]) {
    return new Promise((resolve) => {
      let accessedRoutes;
      if (roles.includes("admin")) {
        accessedRoutes = asyncRoutes || [];
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
      }
      commit("SET_ROUTES", accessedRoutes);
      resolve(accessedRoutes);
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
