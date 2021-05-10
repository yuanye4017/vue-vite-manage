import { onMounted, onUnmounted, watch } from 'vue';
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
const WIDTH_MOBILE = 992; // modile
const WIDTH_MIX = 1440; // min width

export function useWindowSize(
  device: WindowSizeType['device'],
  sidebar: WindowSizeType['sidebar']
) {
  const route = useRoute();
  const store = useStore();

  const $_windowInfo = () => {
    const rect = body.getBoundingClientRect();
    const winWidth = rect.width * 1;
    const isMobile = winWidth - 1 < WIDTH_MOBILE;
    return [isMobile, winWidth];
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
    if (!document.hidden) {
      const [isMobile, winWidth] = $_windowInfo();
      store.dispatch('app/toggleDevice', isMobile ? 'mobile' : 'desktop');

      if (isMobile) {
        store.dispatch('app/closeSideBar', { withoutAnimation: true });
      } else {
        if (winWidth < WIDTH_MIX) {
          store.dispatch('app/toggleSideBar', false);
        } else {
          store.dispatch('app/toggleSideBar', true);
        }
      }
    }
  }, 150);

  onMounted(() => {
    const [isMobile] = $_windowInfo();
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
    onResize,
  };
}
