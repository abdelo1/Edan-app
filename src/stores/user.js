import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
export const useUserStore = defineStore('user', {
  state: () => ({ username: null, access_token: null}),
  getters: {
    getUsername: (state) => state.username,
    getAccess_token: (state) => state.access_token ,
    isLoggedIn: (state) => state.username !== null && state.access_token !== null
  },
  actions: {
     setUsername( u ) {
      this.username = u
    },
     setAccess_token( t ) {
      this.access_token = t
    }
  },
  persist: {
    enabled: true
  }
})
/*export const useUserStore = defineStore('user', () => {

// state
  const username       = ref('')
  const access_token = ref('')
// getter
  const getUsername       = computed(() => username.value)
  const getAccess_token = computed(() => access_token.value )
  const isLoggedIn        = computed(() => username.value !== '' && access_token.value !== '' )

//actions
  function setUsername( u ) {
    username.value = u
  }
  function setAccess_token( t ) {
    access_token.value = t
  }

  return { getAccess_token, getUsername, setUsername, setAccess_token, isLoggedIn }
})*/
