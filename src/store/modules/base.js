/*
Vuex module to retrieve the root (base) json and jsonld of a pygeoapi instance
*/

import axios from 'axios'

const PYGEOAPI_HOST = process.env.VUE_APP_PYGEOAPI_HOST

// initial state
const state = {
  json: {},
  jsonld: {},
  jsonLoaded: false,
  jsonldLoaded: false,
}

// getters
const getters = {
  baseJson: (state) => {
    return state.json
  },
  baseJsonld: (state) => {
    return state.jsonld
  },

  // from json
  links: (state, getters) => {
    if (state.jsonLoaded) {
      return getters.baseJson.links
    } else {
      return {}
    }
  },

  // from jsonld
  keywords: (state, getters) => {
    if (state.jsonldLoaded) {
      return getters.baseJsonld.keywords
    } else {
      return {}
    }
  },
  provider: (state, getters) => {
    if (state.jsonldLoaded) {
      return getters.baseJsonld.provider
    } else {
      return {}
    }
  },
  contactPoint: (state, getters) => {
    if (state.jsonldLoaded) {
      return getters.provider.contactPoint
    } else {
      return {}
    }
  },
  address: (state, getters) => {
    if (state.jsonldLoaded) {
      return getters.provider.address
    } else {
      return {}
    }
  },
  hoursAvailable: (state, getters) => {
    if (state.jsonldLoaded) {
      return getters.contactPoint.hoursAvailable
    } else {
      return {}
    }
  }
}

// mutations
const mutations = {
  setJson(state, { json }) {
    state.json = json
  },
  setJsonld(state, { jsonld }) {
    state.jsonld = jsonld
  },
  setLoadedJson(state, status) {
    state.jsonLoaded = status
  },
  setLoadedJsonld(state, status) {
    state.jsonldLoaded = status
  }
}

// actions
const actions = {
  getJson({commit, state}) {
    if (state.jsonLoaded) {
      return false // no need to reload if exists
    }
    axios.get(PYGEOAPI_HOST + '?f=json')
      .then((res) => {
        commit('setJson', { json: res.data })
        commit('setLoadedJson', true)
      })
      .catch((error) => {
        console.error(error)
        commit('setJson', { json: {} })
        commit('setLoadedJson', false)
      })
  },
  getJsonld({commit, state}) {
    if (state.jsonldLoaded) {
      return false // no need to reload if exists
    }
    axios.get(PYGEOAPI_HOST + '?f=jsonld')
      .then((res) => {
        commit('setJsonld', { jsonld: res.data })
        commit('setLoadedJsonld', true)
      })
      .catch((error) => {
        console.error(error)
        commit('setJsonld', { jsonld: {} })
        commit('setLoadedJsonld', false)
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
