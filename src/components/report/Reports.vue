<template>
  <el-card>
    <!-- 1. -->
    <my-bread
      level1="数据统计"
      level2="数据列表"
    ></my-bread>
    <!-- 图表 -->
    <div
      id="main"
      style="height: 350px; width: 600px"
    ></div>
  </el-card>
</template>

<script>
var myEchart = require('echarts')

export default {
  name: 'reports',
  data () {
    return {
      option1: {
        title: {
          text: '堆叠区域图'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        }
      }
    }
  },
  mounted () {
    this.useEchart()
  },
  methods: {
    async useEchart () {
      // 基于准备好的dom，初始化echarts实例
      const myChart = myEchart.init(document.getElementById('main'))
      const res = await this.$http.get('reports/type/1')
      console.log(res)
      const option2 = res.data.data
      // 指定图表的配置项和数据
      const option = {
        option1: this.option1,
        ...option2
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
  }
}
</script>

<style>
#main {
  margin-top: 20px;
}
</style>
