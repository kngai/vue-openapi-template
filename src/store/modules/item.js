/*
Vuex module to retrieve a single item json of a collectionId from a pygeoapi instance
*/

import axios from 'axios'

const PYGEOAPI_HOST = process.env.VUE_APP_PYGEOAPI_HOST

// initial state
const state = () => ({
  json: {},
  jsonRequestUrl: '',
  jsonLoaded: false
})

// getters
const getters = {
  json: (state) => {
    return state.json
  },

  // from json
  properties: (state, getters) => {
    if (state.jsonLoaded) {
      return getters.json.properties
    } else {
      return []
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
  getJson({commit}, collection) {
    const requestUrl = PYGEOAPI_HOST + '/collections/' + collection.id + '/items/' + collection.itemId + '?f=json'
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
