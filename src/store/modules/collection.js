/*
Vuex module to retrieve the json and jsonld of a collectionId
*/

import axios from 'axios'

const PYGEOAPI_HOST = process.env.VUE_APP_PYGEOAPI_HOST

// initial state
const state = () => ({
  collection: {}, // collection[id] = {json}
  collectionsLoaded: []
})

// getters
const getters = {
  collection: (state) => {
    return state.collection
  },

  // from collection
  collectionById: (state) => (id) => {
    if (Object.prototype.hasOwnProperty.call(state.collection, id)) {
      return state.collection[id]
    } else {
      return {}
    }
  },
  collectionLoadedById: (state) => (id) => {
    if (state.collectionsLoaded.includes(id)) {
      return true
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
  setCollection(state, {collectionId, json}) {
    state.collection = {...state.collection, [collectionId]: json}
  },
  setLoaded(state, {collectionId}) {
    state.collectionsLoaded.push(collectionId)
  }
}

// actions
const actions = {
  getJson({commit, getters}, {collectionId}) {
    if (getters.collectionLoadedById(collectionId)) {
      return false // no need to reload if exists
    }

    axios.get(PYGEOAPI_HOST + '/collections/' + collectionId + '?f=json')
      .then((res) => {
        commit('setCollection', { collectionId: collectionId, json: res.data })
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
