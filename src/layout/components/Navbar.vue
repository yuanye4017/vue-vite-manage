<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar" />
          <i class="el-icon-caret-bottom"></i>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item>Home</el-dropdown-item>
            </router-link>
            <a target="_blank" href="https://github.com/cereschen/vue3-admin-vite-template">
              <el-dropdown-item>Github</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click="logout">
              <span style="display: block">Log Out</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
  import { useStore } from 'vuex';
  import Breadcrumb from '@/components/Breadcrumb/index.vue';
  import Hamburger from '@/components/Hamburger/index.vue';
  import { computed, defineComponent, unref } from 'vue';
  import { useMapGetters } from '@/utils/store';
  import { useRoute, useRouter } from 'vue-router';

  export default defineComponent({
    components: {
      Breadcrumb,
      Hamburger,
    },
    setup() {
      const store = useStore();
      const route = useRoute();
      const router = useRouter();
      const opened = computed(() => store.getters.sidebar.opened);
      return {
        ...useMapGetters(['sidebar', 'avatar']),
        toggleSideBar() {
          store.dispatch('app/toggleSideBar', !unref(opened));
        },
        async logout() {
          await store.dispatch('user/logout');
          router.push(`/login?redirect=${route.fullPath}`);
        },
      };
    },
  });
</script>

<style lang="scss" scoped>
  .navbar {
    position: relative;
    height: 50px;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

    .hamburger-container {
      float: left;
      height: 100%;
      line-height: 46px;
      cursor: pointer;
      transition: background 0.3s;
      -webkit-tap-highlight-color: transparent;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }

    .breadcrumb-container {
      float: left;
    }

    .right-menu {
      float: right;
      height: 100%;
      line-height: 50px;

      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        height: 100%;
        padding: 0 8px;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background 0.3s;

          &:hover {
            background: rgba(0, 0, 0, 0.025);
          }
        }
      }

      :deep(.avatar-container) {
        margin-right: 30px;

        .avatar-wrapper {
          position: relative;
          margin-top: 5px;

          .user-avatar {
            width: 40px;
            height: 40px;
            cursor: pointer;
            border-radius: 10px;
          }

          .el-icon-caret-bottom {
            position: absolute;
            top: 25px;
            right: -20px;
            font-size: 12px;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
