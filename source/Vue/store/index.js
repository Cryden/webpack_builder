import axios from 'axios'

export default {
  state: {
    sections: []
  },
  actions: {
    loadConfig ({ commit }) {
      axios
        .get('/config.json')
        .then(r => r.data)
        .then(data => {
          commit('setItem', data)
        })
    }
  },
  mutations: {
    setItem (state, payload) {
      state.sections = payload
    },
    checkSections (state, payload) {
      if (payload.check === true) {
        payload.check = false
      } else { payload.check = true }

      state.sections[payload.index].check = payload.check
    },
    checkCards (state, payload) {
      if (payload.check === true) {
        payload.check = false
      } else { payload.check = true }

      state.sections[payload.section].cards[payload.card].check = payload.check
    }
  }
}
