import $http from '../api';

const state = () => ({
  rutes: {},
  rutesAll: {},
  page: 1
})

const mutations = {
  _assign_data_rutes(state, payload) {
    state.rutes = payload
  },
  _assign_data_rutes_all(state, payload) {
    state.rutesAll = payload
  },
  _set_page(state, payload) {
    state.page = payload
  }
}

const actions = {
  fetchDataRutes,
  storeNewRute,
  getDataRute,
  updateDataRute,
  deleteDataRute,
  fetchDataRutesAll
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

function fetchDataRutesAll({ commit }) {
  return new Promise(async (resolve, reject) => {
    try {
      let network = await $http.get('rutes-all')
      commit('_assign_data_rutes_all', network.data)

      resolve(network.data)
    } catch (e) {
      console.error(e)
      reject(e)
    }
  })
}

function fetchDataRutes({ commit, state }, qSearch) {
  return new Promise(async (resolve, reject) => {
    try {
      let link = `rutes?page=${state.page}&q=${qSearch}`;

      let network = await $http.get(link)
      commit('_assign_data_rutes', network.data)

      resolve(network.data)
    } catch (e) {
      console.error(e)
      reject(e)
    }
  })
}

function storeNewRute({ commit }, rute) {
  return new Promise(async (resolve, reject) => {
    try {
      let link = 'rutes';

      let network = await $http.post(link, rute)
      resolve(network.data)
    } catch (e) {
      console.error(e)
      reject(e)
    }
  })
}

function getDataRute({ commit }, ruteId) {
  return new Promise(async (resolve, reject) => {
    try {
      let link = 'rutes/'+ruteId;

      let network = await $http.get(link)
      resolve(network.data)
    } catch (e) {
      console.error(e)
      reject(e)
    }
  })
}

function updateDataRute({ commit }, rute) {
  return new Promise(async (resolve, reject) => {
    try {
      let link = 'rutes/'+rute.id;
      let network = await $http.put(link, rute)
      resolve(network.data)
    } catch (e) {
      console.error(e)
      reject(e)
    }
  })
}

function deleteDataRute({ commit }, ruteId) {
  return new Promise(async (resolve, reject) => {
    try {
      let link = 'rutes/'+ruteId;

      let network = await $http.delete(link)
      resolve(network.data)
    } catch (e) {
      console.error(e)
      reject(e)
    }
  })
}