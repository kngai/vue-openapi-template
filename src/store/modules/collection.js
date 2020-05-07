/*
Vuex module to retrieve a collectionId json and jsonld of a pygeoapi instance
*/

import axios from 'axios'

const PYGEOAPI_HOST = process.env.VUE_APP_PYGEOAPI_HOST

// initial state
const state = {
  collection: {}
}

// getters
const getters = {
  collection: (state) => {
    return state.collection
  },

  // from collection
  collectionById: (state, getters) => (id) => {
    if (Object.prototype.hasOwnProperty.call(state.collection, id)) {
      return getters.collection[id].json
    } else {
      return {
        json: {},
        loaded: false
      }
    }
  },
  collectionLoadedById: (state, getters) => (id) => {
    if (Object.prototype.hasOwnProperty.call(state.collection, id)) {
      return getters.collection[id].loaded
    } else {
      return false
    }
  },
  keywordsById: (state, getters) => (id) => {
    if (getters.collectionLoadedById(id)) {
      return getters.collectionById(id).keywords
    } else {
      return []
    }
  }
}

// mutations
const mutations = {
  setCollection(state, payload) {
    state.collection = {...state.collection, [payload.id]: {
      json: payload.json,
      loaded: payload.status
    }}
  }
}

// actions
const actions = {
  getJson({commit, state}, collection) {
    if (Object.prototype.hasOwnProperty.call(state.collection, collection.id)) {
      if (state.collection[collection.id].loaded) {
        return false // no need to reload if exists
      }
    }
    axios.get(PYGEOAPI_HOST + '/collections/' + collection.id + '?f=json')
      .then((res) => {
        commit('setCollection', { id: collection.id, json: res.data, status: true })
      })
      .catch((error) => {
        console.error(error)
        commit('setCollection', { id: collection.id, json: {}, status: false })
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
