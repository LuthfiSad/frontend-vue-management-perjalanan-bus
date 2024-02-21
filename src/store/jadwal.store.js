import $http from '../api';

const state = () => ({
  jadwals: {},
  page: 1
})

const mutations = {
  _assign_data_jadwals(state, payload) {
    state.jadwals = payload
  },
  _set_page(state, payload) {
    state.page = payload
  }
}

const actions = {
  fetchDataJadwals,
  storeDataJadwal,
  getDataJadwal,
  updateDataJadwal
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

function fetchDataJadwals({ commit, state }, qSearch) {
  return new Promise(async (resolve, reject) => {
    try {
      let link = `jadwals?page=${state.page}&q=${qSearch}`;

      let network = await $http.get(link)
      commit('_assign_data_jadwals', network.data)

      resolve(network.data)
    } catch (e) {
      console.error(e)
      reject(e)
    }
  })
}

function storeDataJadwal({ }, payload) {
  return new Promise(async (resolve, reject) => {
    try {
      let link = "jadwals";

      let network = await $http.post(link, payload)
      resolve(network.data)
    } catch (e) {
      console.error(e)
      reject(e)
    }
  })
}

function getDataJadwal({ }, jadwalId) {
  return new Promise(async (resolve, reject) => {
    try {
      let link = "jadwals/" + jadwalId;

      let network = await $http.get(link)
      resolve(network.data)
    } catch (e) {
      console.error(e)
      reject(e)
    }
  })
}

function updateDataJadwal({ }, payload) {
  return new Promise(async (resolve, reject) => {
    try {
      let link = "jadwals/" + payload.id;

      let network = await $http.put(link, payload)
      resolve(network.data)
    } catch (e) {
      console.error(e)
      reject(e)
    }
  })
}