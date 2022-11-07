<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    >
  </q-page>
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useUserStore } from '../stores/user'
import authService from '../services/auth.service'

export default defineComponent({
  name: 'IndexPage',
  setup(){
    const $q   = useQuasar()
    const user = useUserStore()
    const isLoggedIn = user.isLoggedIn
    onMounted(() => isLoggedIn &&  $q.notify({
            color: 'green-5',
            textColor: 'white',
            icon: 'greets',
            message: user.getUsername,
            position : 'top'
          }));
  }
})
</script>
