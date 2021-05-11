<template>
  <el-card v-if="loading">
    <el-skeleton animated />
  </el-card>
  <el-card v-else class="box-card">
    <!-- 保留原本的插槽功能 -->
    <template #header v-if="isShowSlots('header')">
      <slot name="header"></slot>
    </template>
    <div class="box-card-body">
      <slot></slot>
    </div>
    <div class="box-card-footer" v-if="isShowSlots('footer')">
      <slot name="footer"></slot>
    </div>
  </el-card>
</template>

<script>
  import { defineComponent, ref, unref } from 'vue';
  import { indexOf } from 'lodash-es';

  export default defineComponent({
    name: 'CustCard',
    props: {
      showHeader: {
        type: Boolean,
        default: false,
      },
      loading: {
        type: Boolean,
        default: true,
      },
    },
    setup(_, { slots }) {
      const slotsList = ref(Object.keys(slots));
      const isShowSlots = (slotsName) => {
        return indexOf(unref(slotsList), slotsName) >= 0;
      };

      return {
        slotsList,
        isShowSlots,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .box-card {
    :deep(.el-card__body) {
      padding: 0;
    }

    &-body {
      padding: 20px;
    }

    &-footer {
      padding: 18px 20px;
      border-top: 1px solid #ebeef5;
      box-sizing: border-box;
    }
  }
</style>
