import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    routes: []
  },
  mutations: {
    // 定义 mutations
    minusN (state, step) {
      state.count -= step
    },
    initRoutes (state, fmtRoutes) {
      state.routes = fmtRoutes
    }
  },
  actions: {
    minusAsyncN (context, step) {
      setTimeout(() => {
        // 在 actions 中，不能直接修改 state 中的数据：必须通过context.commit()触发 某个 mutations
        context.commit('minusN', step)
      }, 1000)
    }
  },
  getters: {
    showCount (state) {
      return '当前最新的数量是【' + state.count + '】'
    }
  },
  modules: {
  }
})
