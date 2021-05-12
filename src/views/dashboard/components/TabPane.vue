<template>
  <el-row :gutter="10" class="tab-pane">
    <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
      <h4 class="tab-pane__title">{{ titleName }}</h4>
      <line-chart />
    </el-col>
    <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
      <div class="tab-pane__list">
        <h4 class="tab-pane__title">门店{{ titleName }}排名</h4>
        <div class="list">
          <list-item v-for="item in 9" :key="item" :item="item" />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import LineChart from '@/components/LineChart/index.vue';
  import ListItem from './ListItem.vue';

  export default defineComponent({
    name: 'TabPane',
    components: {
      LineChart,
      ListItem,
    },
    props: {
      titleName: {
        type: String,
        require: true,
      },
    },
    setup() {},
  });
</script>

<style lang="scss" scoped>
  .tab-pane {
    .el-col {
      min-height: 400px;
    }

    &__title {
      margin: 16px 0;
    }

    &__list {
      height: 100%;

      .list {
        height: 100%;
      }
    }
  }
</style>
