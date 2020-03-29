import Vue from 'vue'
import Vuex from 'vuex'
import { auth } from './lib/firebase'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    allowAdmin: false,
    works: null,
    requestToLogin: false,
    useTouch: false,
    showEditor: false // could be {type:string, value?:object}
  },
  mutations: {
    UPDATE_WORKS () {

    },
    CLEAR_USER (state) {
      state.user = null
    },
    UPDATE_USER (state, user) {
      state.user = user
    },
    REQUEST_LOGIN (state) {
      state.requestToLogin = true
    },
    SET_USE_TOUCH (state) {
      state.useTouch = true
    },
    SET_ALLOW_ADMIN (state, value) {
      state.allowAdmin = value
    },
    SET_SHOW_EDITOR (state, value) {
      state.showEditor = value
    }
  },
  actions: {
    updateWorks ({ commit }, works) {
      commit('UPDATE_WORKS', works)
    },

    logOut: ({ commit }) => Promise.resolve(commit('CLEAR_USER'))
      .then(() => auth.signOut()
        .then(() => {
          if (router.currentRoute.matched.some(record => record.meta.restricted)) {
            router.push({ name: 'home' })
          }
        })
        .catch(err => console.error('signOut:', err))
      ),

    updateUser: ({ commit }, value) => {
      commit('UPDATE_USER', { ...value })
    },

    clearUser ({ commit }) {
      commit('CLEAR_USER')
    },

    requestLogin ({ commit }) {
      commit('REQUEST_LOGIN')
    },

    showEditor ({ commit }, editorInfo) {
      commit('SET_SHOW_EDITOR', editorInfo)
    },

    hideEditor ({ commit }) {
      commit('SET_SHOW_EDITOR', false)
    },

    setUseTouch ({ commit }) {
      commit('SET_USE_TOUCH')
    }
  }
})
