import { createStore } from 'vuex';
import bus from './bus.store';
import supir from './supir.store';
import terminal from './terminal.store';
import rute from './rute.store';
import jadwal from './jadwal.store';
import auth from './auth.store';

export const store = createStore({
  state() {
    return {
      access_token: localStorage.getItem('access_token')
    };
  },
  mutations: {
    _set_token(state, payload) {
      state.access_token = payload;
    }
  },
  actions: {
  },
  getters: {
    isAuth: state => {
      if (state.access_token !== "" && state.access_token != null) {
        return true;
      }
      return false;
    }
  },
  modules: {
    bus,
    supir,
    terminal,
    rute,
    jadwal,
    auth
  }
});
