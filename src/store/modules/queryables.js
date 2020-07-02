/*
Vuex module to retrieve the queryables json of a collectionId from a pygeoapi instance
*/

import axios from 'axios'

const PYGEOAPI_HOST = process.env.VUE_APP_PYGEOAPI_HOST

// initial state
const state = () => ({
  queryables: {}, // queryables[collectionId] = {json}
  queryablesLoaded: []
})

// getters
const getters = {
  // from json
  queryablesById: (state, getters) => (id) => {
    if (getters.queryablesLoadedById(id)) {
      return state.queryables[id].queryables
    } else {
      return {}
    }
  },
  queryablesLoadedById: (state) => (id) => {
    return state.queryablesLoaded.includes(id)
  },
}

// mutations
const mutations = {
  setQueryables(state, {collectionId, json}) {
    state.queryables = {...state.collection, [collectionId]: json}
  },
  setLoaded(state, {collectionId}) {
    state.queryablesLoaded.push(collectionId)
  }
}

// actions
const actions = {
  getJson({commit, getters}, {collectionId}) {
    if (getters.queryablesLoadedById(collectionId)) {
      return false // no need to reload if exists
    }

    axios.get(PYGEOAPI_HOST + '/collections/' + collectionId + '/queryables?f=json')
      .then((res) => {
        commit('setQueryables', { collectionId: collectionId, json: res.data })
        commit('setLoaded', { collectionId: collectionId })
      })
      .catch((error) => {
        console.error(error)
        commit('setLoaded', { collectionId: collectionId })
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
