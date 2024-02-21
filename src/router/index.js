import { createRouter, createWebHistory } from 'vue-router';
import { store } from '../store';
import Home from '../views/Home.vue';

import BusIndex from '../views/bus/Bus.vue';
import BusAdd from '../views/bus/Add.vue';
import BusEdit from '../views/bus/Edit.vue';

import SupirIndex from '../views/supir/Supir.vue';
import SupirAdd from '../views/supir/Add.vue';
import SupirEdit from '../views/supir/Edit.vue';

import TerminalIndex from '../views/terminal/Terminal.vue';
import TerminalAdd from '../views/terminal/Add.vue';
import TerminalEdit from '../views/terminal/Edit.vue';

import RuteIndex from '../views/rute/Rute.vue';
import RuteAdd from '../views/rute/Add.vue';
import RuteEdit from '../views/rute/Edit.vue';
import RuteView from '../views/rute/View.vue';

import JadwalIndex from '../views/jadwal/Jadwal.vue';
import JadwalAdd from '../views/jadwal/Add.vue';
import JadwalEdit from '../views/jadwal/Edit.vue';

import Login from '../views/auth/Login.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { needAuth: true }
  },
  {
    path: '/bus',
    name: 'bus.index',
    component: BusIndex,
    meta: { needAuth: true }
  },
  {
    path: '/bus/add',
    name: 'bus.add',
    component: BusAdd,
    meta: { needAuth: true }
  },
  {
    path: '/bus/:id/edit',
    name: 'bus.edit',
    component: BusEdit,
    meta: { needAuth: true }
  },
  {
    path: '/supir',
    name: 'supir.index',
    component: SupirIndex,
    meta: { needAuth: true }
  },
  {
    path: '/supir/add',
    name: 'supir.add',
    component: SupirAdd,
    meta: { needAuth: true }
  },
  {
    path: '/supir/:id/edit',
    name: 'supir.edit',
    component: SupirEdit,
    meta: { needAuth: true }
  },
  {
    path: '/terminal',
    name: 'terminal.index',
    component: TerminalIndex,
    meta: { needAuth: true }
  },
  {
    path: '/terminal/add',
    name: 'terminal.add',
    component: TerminalAdd,
    meta: { needAuth: true }
  },
  {
    path: '/terminal/:id/edit',
    name: 'terminal.edit',
    component: TerminalEdit,
    meta: { needAuth: true }
  },
  {
    path: '/rute',
    name: 'rute.index',
    component: RuteIndex,
    meta: { needAuth: true }
  },
  {
    path: '/rute/add',
    name: 'rute.add',
    component: RuteAdd,
    meta: { needAuth: true }
  },
  {
    path: '/rute/:id/edit',
    name: 'rute.edit',
    component: RuteEdit,
    meta: { needAuth: true }
  },
  {
    path: '/rute/:id',
    name: 'rute.show',
    component: RuteView,
    meta: { needAuth: true }
  },
  {
    path: '/jadwal',
    name: 'jadwal.index',
    component: JadwalIndex,
    meta: { needAuth: true }
  },
  {
    path: '/jadwal/add',
    name: 'jadwal.add',
    component: JadwalAdd,
    meta: { needAuth: true }
  },
  {
    path: '/jadwal/:id/edit',
    name: 'jadwal.edit',
    component: JadwalEdit,
    meta: { needAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.needAuth)) {
    let isAuth = store.getters.isAuth;
    if (!isAuth) {
      next({ name: 'login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
