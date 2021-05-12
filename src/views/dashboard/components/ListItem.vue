<template>
  <div class="list-item">
    <div :class="[{ circle: item <= 3 }, 'list-item__sort']">{{ item }}</div>
    <div class="list-item__content"> 工专路 0 号店 </div>
    <div class="list-item__number">{{ getFilterNumber }}</div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, ref } from 'vue';

  export default defineComponent({
    name: 'ListItem',
    props: {
      item: {
        type: Number,
        request: true,
      },
    },
    setup() {
      const num = ref('323234');
      const getFilterNumber = computed(() => {
        return num.value.replace(/\B(?=(?:\d{3})+\b)/g, ',');
      });
      return {
        num,
        getFilterNumber,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;

    &__sort {
      width: 30px;
      height: 30px;
      line-height: 30px;
      text-align: center;
    }

    &__sort.circle {
      background: #fe740c;
      border-radius: 50%;
    }

    &__content {
      flex: 1;
      padding: 0 4px;
    }

    &__number {
      width: auto;
    }
  }
</style>
