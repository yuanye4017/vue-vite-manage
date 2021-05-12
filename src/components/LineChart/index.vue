<template>
  <div ref="container"></div>
</template>

<script lang="ts">
  import { defineComponent, nextTick, ref } from 'vue';
  import { Column } from '@antv/g2plot';

  const data = [
    { year: '1', value: 3 },
    { year: '2', value: 4 },
    { year: '3', value: 3.5 },
    { year: '4', value: 5 },
    { year: '5', value: 4.9 },
    { year: '6', value: 6 },
    { year: '7', value: 7 },
    { year: '8', value: 9 },
    { year: '9', value: 13 },
    { year: '10', value: 8 },
    { year: '11', value: 13 },
    { year: '12', value: 4.9 },
  ];

  export default defineComponent({
    setup() {
      const container = ref<HTMLElement>(null);

      nextTick(() => {
        const line = new Column(container.value, {
          data,
          color: '#FE740C',
          appendPadding: [12, 0, 0, 0],
          xField: 'year',
          xAxis: {
            label: {
              formatter: (v) => {
                return v + '月';
              },
            },
          },
          yField: 'value',
          tooltip: {
            formatter: (datum) => {
              return { title: datum.year + '月', name: '销售额', value: datum.value };
            },
          },
        });
        line.render();
      });

      return {
        container,
      };
    },
  });
</script>
