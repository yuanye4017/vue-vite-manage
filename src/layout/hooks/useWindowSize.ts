import { onMounted, onUnmounted, watch, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { debounce } from 'lodash-es';

type WindowSizeType = {
  device?: string | undefined;
  sidebar?: {
    opened?: boolean;
  };
};

const { body } = document;
const WIDTH = 992; // refer to Bootstrap's responsive design

export function useWindowSize(
  device: WindowSizeType['device'],
  sidebar: WindowSizeType['sidebar']
) {
  const width = ref(0);
  const height = ref(0);
  const route = useRoute();
  const store = useStore();

  const $_isMobile = () => {
    const rect = body.getBoundingClientRect();
    return rect.width - 1 < WIDTH;
  };

  watch(
    () => route.path,
    () => {
      if (device === 'mobile' && sidebar?.opened) {
        store.dispatch('app/closeSideBar', { withoutAnimation: false });
      }
    }
  );

  const onResize = debounce(function () {
    width.value = window.innerWidth;
    height.value = window.innerHeight;
    if (!document.hidden) {
      const isMobile = $_isMobile();
      store.dispatch('app/toggleDevice', isMobile ? 'mobile' : 'desktop');

      if (isMobile) {
        store.dispatch('app/closeSideBar', { withoutAnimation: true });
      }
    }
  }, 150);

  onMounted(() => {
    const isMobile = $_isMobile();
    if (isMobile) {
      store.dispatch('app/toggleDevice', 'mobile');
      store.dispatch('app/closeSideBar', { withoutAnimation: true });
    }
    window.addEventListener('resize', onResize);
    onResize();
  });

  onUnmounted(() => {
    window.removeEventListener('resize', onResize);
  });
  return {
    width,
    height,
  };
}
