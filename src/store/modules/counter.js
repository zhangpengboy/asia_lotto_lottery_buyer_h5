import { defineStore } from 'pinia';
import * as $lance from '@/utils/lance';

export const useCounterStore = defineStore('counter', {
  state: () => ({
    hasLogin: !!$lance.getJson('token') || false,
  }),
  actions: {
    login(state, payload) {
      $lance.setJson('user', payload);
      state.hasLogin = true;
      state.user = payload;
    },
  },
});
