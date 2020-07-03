/*
Vuex module to retrieve a single process json of a pygeoapi instance
*/

import axios from 'axios'

const PYGEOAPI_HOST = process.env.VUE_APP_PYGEOAPI_HOST

// initial state
const state = () => ({
  json: {},
  jsonLoaded: false
})

// getters
const getters = {
  json: (state) => {
    return state.json
  },

  // from json
  id: (state, getters) => {
    if (state.jsonLoaded) {
      return getters.json.id
    } else {
      return null
    }
  },
  title: (state, getters) => {
    if (state.jsonLoaded) {
      return getters.json.title
    } else {
      return null
    }
  },
  version: (state, getters) => {
    if (state.jsonLoaded) {
      return getters.json.version
    } else {
      return null
    }
  },
  description: (state, getters) => {
    if (state.jsonLoaded) {
      return getters.json.description
    } else {
      return null
    }
  },
  keywords: (state, getters) => {
    if (state.jsonLoaded) {
      return getters.json.keywords
    } else {
      return []
    }
  },
  links: (state, getters) => {
    if (state.jsonLoaded) {
      return getters.json.links
    } else {
      return []
    }
  }
}

// mutations
const mutations = {
  setJson(state, { json }) {
    state.json = json
  },
  setLoadedJson(state, status) {
    state.jsonLoaded = status
  }
}

// actions
const actions = {
  getJson({commit, state}, proc) {
    if (state.jsonLoaded) {
      return false // no need to reload if exists
    }
    commit('setLoadedJson', false)
    axios.get(PYGEOAPI_HOST + '/processes/' + proc.id + '?f=json')
      .then((res) => {
        commit('setJson', { json: res.data })
        commit('setLoadedJson', true)
      })
      .catch((error) => {
        console.error(error)
        commit('setJson', { json: {} })
        commit('setLoadedJson', false)
      })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
