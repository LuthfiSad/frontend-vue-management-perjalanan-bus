import $http from '../api';

const state = () => ({
  terminals: {},
  terminalsAll: {},
  page: 1
})

const mutations = {
  _assign_terminals_data(state, payload) {
    state.terminals = payload
  },
  _assign_terminals_data_all(state, payload) {
    state.terminalsAll = payload
  },
  _set_page(state, payload) {
    state.page = payload
  }
}

const actions = {
  fetchDataTerminals,
  storeNewTerminal,
  findTerminal,
  updateTerminal,
  deleteTerminal,
  fetchDataTerminalsAll
}

export default {
  namespaced: true,
  state, 
  mutations,
  actions
}

function fetchDataTerminalsAll({ commit }) {
  return new Promise(async (resolve, reject) => {
    try {
      let network = await $http.get('terminals-all')
      commit('_assign_terminals_data_all', network.data)

      resolve(network.data)
    } catch (e) {
      console.error(e)
      reject(e)
    }
  })
}

function fetchDataTerminals({ commit, state }, qSearch) {
  return new Promise(async (resolve, reject) => {
    try {
      let link = `terminals?page=${state.page}&q=${qSearch}`;

      let network = await $http.get(link)
      commit('_assign_terminals_data', network.data)

      resolve(network.data)
    } catch (e) {
      console.error(e)
      reject(e)
    }
  })
}

function storeNewTerminal({ commit }, terminal) {
  return new Promise(async (resolve, reject) => {
    try {
      let link = 'terminals';

      let network = await $http.post(link, terminal)
      resolve(network.data)
    } catch (e) {
      console.error(e)
      reject(e)
    }
  })
}

function updateTerminal({ commit }, terminal) {
  return new Promise(async (resolve, reject) => {
    try {
      let link = 'terminals/'+terminal.id;

      let network = await $http.put(link, terminal)
      resolve(network.data)
    } catch (e) {
      console.error(e)
      reject(e)
    }
  })
}

function findTerminal({ commit }, terminalId) {
  return new Promise(async (resolve, reject) => {
    try {
      let link = 'terminals/'+terminalId;

      let network = await $http.get(link)
      resolve(network.data)
    } catch (e) {
      console.error(e)
      reject(e)
    }
  })
}

function deleteTerminal({ commit }, terminalId) {
  return new Promise(async (resolve, reject) => {
    try {
      let link = 'terminals/'+terminalId;

      let network = await $http.delete(link)
      resolve(network.data)
    } catch (e) {
      console.error(e)
      reject(e)
    }
  })
}