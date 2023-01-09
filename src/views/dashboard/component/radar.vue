<template>
  <div ref="radar" class="radar" />
</template>
<script>
export default {
  name: 'APP',
  data() {
    return {
      option: {
        title: {
        },
        legend: {
        //   textStyle: {
        //     color: 'red'
        //   },
          data: ['预算开支(Allocated Budget)', '实际开销(Actual Spending)']
        },
        radar: {
          // shape: 'circle',
          name: {
            textStyle: {
              color: '#fff',
              backgroundColor: '#999',
              borderRadius: 3,
              padding: [3, 5]
            }

          },
          indicator: [
            { name: '工作效率', max: 100 },
            { name: '考勤', max: 100 },
            { name: '积极性', max: 100 },
            { name: '帮助同事', max: 100 },
            { name: '自主学习', max: 100 },
            { name: '正确率', max: 100 }
          ]
        },
        series: [
          {
            name: 'Budget vs spending',
            type: 'radar',
            data: [
              {
                value: [10, 1, 100, 5, 100, 0],
                name: '预算开支(Allocated Budget)'
              },
              {
                value: [50, 50, 50, 50, 50, 10],
                name: '实际开销(Actual Spending)'
              }
            ]
          }
        ]
      }
    }
  },
  created() {
  },
  mounted() {
    this.radarTest()
  },
  methods: {
    radarTest() {
      const chartDom = this.$refs.radar
      const myChart = this.$echarts.init(chartDom)
      myChart.setOption(this.option)
    }
  }
}
</script>
<style lang="scss" scoped>
    .radar {
        width: 400px;
        height: 400px;
    }
</style>
