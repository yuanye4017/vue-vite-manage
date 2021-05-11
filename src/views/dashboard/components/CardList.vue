<template>
  <cust-card>
    <template #header>总销售额</template>
    <div class="card-body">
      <div class="card-body-header">¥ 126,560</div>
      <div class="card-body-content">
        <el-row>
          <el-col :span="12">
            <div class="grid-content">
              <span> 周同比 12%</span>
              <span style="padding-left: 4px"></span>
              <i class="el-icon-caret-top" style="color: red"></i>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content">
              <span> 日同比 11%</span>
              <span style="padding-left: 4px"></span>
              <i class="el-icon-caret-bottom" style="color: green"></i>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <template #footer>
      <div class="card-footer">
        <span>日销售额</span>
        <span>￥12,423</span>
      </div>
    </template>
  </cust-card>
</template>

<script>
  import { defineComponent } from 'vue';
  import CustCard from '@/components/CustCard/index.vue';

  export default defineComponent({
    name: 'CardList',
    components: {
      CustCard,
    },
    props: {
      loading: {
        type: Boolean,
        default: false,
      },
    },
    props: {},
    setup() {},
  });
</script>

<style lang="scss" scoped>
  .card-body {
    &-header {
      font-size: 20px;
      font-weight: 500;
      line-height: 30px;
    }

    &-content {
      font-size: 14px;
      line-height: 30px;
    }
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
