<template>
  <section class="app-main">
    <router-view :key="key" v-slot="{ Component }">
      <transition appear name="fade-transform" mode="out-in">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </section>
</template>

<script>
  import { computed, defineComponent } from 'vue';
  import { useRoute } from 'vue-router';
  export default defineComponent({
    name: 'AppMain',
    setup() {
      const route = useRoute();
      const key = computed(() => route.path);

      return { key };
    },
  });
</script>

<style scoped>
  .app-main {
    position: relative;
    width: 100%;

    /* 50 = navbar  */
    min-height: 100vh;
    overflow: hidden;
  }

  .fixed-header + .app-main {
    padding: 12px;
    padding-top: 62px;
  }
</style>

<style lang="scss">
  // fix css style bug in open el-dialog
  .el-popup-parent--hidden {
    .fixed-header {
      padding-right: 15px;
    }
  }
</style>
