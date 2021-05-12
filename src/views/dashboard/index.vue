<template>
  <div class="dashboard-container">
    <el-row class="card-row" :gutter="10">
      <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
        <card-list :loading="loading" />
      </el-col>
      <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
        <card-list :loading="loading" />
      </el-col>
      <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
        <card-list :loading="loading" />
      </el-col>
      <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
        <card-list :loading="loading" />
      </el-col>
    </el-row>
    <el-card style="margin-top: 12px">
      <el-skeleton v-if="loading" animated />
      <el-tabs v-else v-model="activeName">
        <el-tab-pane label="销售额" name="销售额">
          <tab-pane :title-name="activeName" />
        </el-tab-pane>
        <el-tab-pane label="访问量" name="访问量">
          <tab-pane :title-name="activeName" />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
  import { defineComponent, onMounted, ref } from 'vue';
  import CardList from './components/CardList.vue';
  import TabPane from './components/TabPane.vue';

  export default defineComponent({
    name: 'Dashboard',
    components: {
      CardList,
      TabPane,
    },
    setup() {
      const loading = ref(true);
      const activeName = ref('销售额');

      onMounted(() => {
        setTimeout(() => {
          loading.value = false;
        }, 2000);
      });

      return {
        loading,
        activeName,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .card-row {
    .el-col {
      margin-top: 10px;
    }
  }
</style>
