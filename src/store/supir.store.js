import $http from '../api';

const state = () => ({
  supirs: {},
  supirsAll: {},
  page: 1
})

const mutations = {
  _assign_supirs_data(state, payload) {
    state.supirs = payload
  },
  _assign_supirs_data_all(state, payload) {
    state.supirsAll = payload
  },
  _set_page(state, payload) {
    state.page = payload
  }
}

const actions = {
  fetchDataSupirs,
  storeNewDataSupir,
  findDataSupir,
  updateNewDataSupir,
  deleteDataSupir,
  fetchDataSupirsAll
}

export default {
  namespaced: true,
  state, 
  mutations,
  actions
}

function fetchDataSupirsAll({ commit }) {
  return new Promise(async (resolve, reject) => {
    try {
      let network = await $http.get('supirs-all')
      commit('_assign_supirs_data_all', network.data)

      resolve(network.data)
    } catch (e) {
      console.error(e)
      reject(e)
    }
  })
}

function fetchDataSupirs({ commit, state }, qSearch) {
  return new Promise(async (resolve, reject) => {
    try {
      let link = `supirs?page=${state.page}&q=${qSearch}`;

      let network = await $http.get(link)
      commit('_assign_supirs_data', network.data)

      resolve(network.data)
    } catch (e) {
      console.error(e)
      reject(e)
    }
  })
}

function storeNewDataSupir({ commit }, supir) {
  return new Promise(async (resolve, reject) => {
    try {
      let link = 'supirs';

      let network = await $http.post(link, supir)
      resolve(network.data)
    } catch (e) {
      console.error(e)
      reject(e)
    }
  })
}

function findDataSupir({ commit }, supirId) {
  return new Promise(async (resolve, reject) => {
    try {
      let link = 'supirs/'+supirId;

      let network = await $http.get(link)
      resolve(network.data)
    } catch (e) {
      console.error(e)
      reject(e)
    }
  })
}

function updateNewDataSupir({ commit }, supir) {
  return new Promise(async (resolve, reject) => {
    try {
      let link = 'supirs/'+supir.id;

      let network = await $http.put(link, supir)
      resolve(network.data)
    } catch (e) {
      console.error(e)
      reject(e)
    }
  })
}

function deleteDataSupir({ commit }, supirId) {
  return new Promise(async (resolve, reject) => {
    try {
      let link = 'supirs/'+supirId;

      let network = await $http.delete(link)
      resolve(network.data)
    } catch (e) {
      console.error(e)
      reject(e)
    }
  })
}