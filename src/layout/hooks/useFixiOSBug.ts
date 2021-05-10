
import { computed , onMounted } from 'vue';
import { useStore } from 'vuex'

export function useFixiOSBug(subMenu: any) {
  const store = useStore();
  const device = computed(() => store.state.app.device);
  function fixBugIniOS() {
    if (subMenu) {
      const handleMouseleave = subMenu.handleMouseleave
      subMenu.handleMouseleave = (e: any) => {
        if (device.value === 'mobile') {
          return
        }
        handleMouseleave(e)
      }
    }
  }
  onMounted(() => {
    fixBugIniOS()
  }) 
  return { fixBugIniOS }
}
