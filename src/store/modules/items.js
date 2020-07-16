/*
Vuex module to retrieve the items json of a collectionId from a pygeoapi instance
*/

import axios from 'axios'

const PYGEOAPI_HOST = process.env.VUE_APP_PYGEOAPI_HOST

// initial state
const state = {
  json: {},
  jsonRequestUrl: '',
  jsonLoaded: false
}

// getters
const getters = {
  json: (state) => {
    return state.json
  },

  // from json
  features: (state, getters) => {
    if (state.jsonLoaded) {
      return getters.json.features
    } else {
      return []
    }
  },
  numberMatched: (state, getters) => {
    if (state.jsonLoaded) {
      return getters.json.numberMatched
    } else {
      return 0
    }
  },
  numberReturned: (state, getters) => {
    if (state.jsonLoaded) {
      return getters.json.numberReturned
    } else {
      return 0
    }
  }
}

// mutations
const mutations = {
  setJson(state, {json, url}) {
    state.json = json
    state.jsonRequestUrl = url
  },
  setLoadedJson(state, status) {
    state.jsonLoaded = status
  }
}

// actions
const actions = {
  getJson({commit, state}, {collectionId, limit}) {
    const requestUrl = PYGEOAPI_HOST + '/collections/' + collectionId + '/items?f=json&limit=' + limit
    if (state.jsonRequestUrl === requestUrl) {
      return false // do nothing if already the same
    }
    commit('setLoadedJson', false)
    axios.get(requestUrl)
      .then((res) => {
        commit('setJson', { json: res.data, url: requestUrl })
        commit('setLoadedJson', true)
      })
      .catch((error) => {
        console.error(error)
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
