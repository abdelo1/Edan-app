<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> {{appName}} </q-toolbar-title>
          <div class="q-pa-md">
            <q-btn-dropdown v-show="isLoggedIn" flat color="white" :label="getUsername">
              <q-list>
                <q-item @click.prevent=" logout()" clickable class="text-primary">
                  <q-item-section style="min-width: 40px;"  avatar>
                      <q-icon name='logout'/>
                  </q-item-section>
                  <q-item-section>
                      <q-item-label class="text-bold">Déconnexion</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item @click.prevent="" clickable class="text-primary">
                   <q-item-section style="min-width: 40px;"  avatar>
                      <q-icon name="person" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-bold">Mon compte</q-item-label>
                    </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
            <q-item v-show="!isLoggedIn" @click.prevent="$router.push('/login')" clickable class="text-white">
              <q-item-section style="min-width: 40px;"  avatar>
                  <q-icon name="person" />
                </q-item-section>
              <q-item-section>
                  <q-item-label class="">S'identifier</q-item-label>
                </q-item-section>
            </q-item>
          </div>


      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> {{appName}} </q-item-label>
        <LienNav
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>

    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, inject, onUpdated } from "vue";
import {useRouter} from 'vue-router'
import {useUserStore} from '../stores/user'
import {storeToRefs} from 'pinia'
import LienNav from "src/components/LienNav.vue";
import authService from '../services/auth.service'

const linksList = [
  {
    title: "Details",
    caption: "quasar.dev",
    icon: "school",
    link: "details",
  },
  {
    title: "Docs",
    caption: "quasar.dev",
    icon: "school",
    link: "https://quasar.dev",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    LienNav,
  },

  setup() {
    const user           = useUserStore()
    const router         = useRouter()
    const leftDrawerOpen = ref(false)
    const appName        = inject('appName')
    const {isLoggedIn, getUsername}   =  storeToRefs(user)

    onUpdated(()=> console.log(isLoggedIn) )
    return {
      linksList,
      appName,
      isLoggedIn,
      getUsername,
      leftDrawerOpen,
      logout(){
        user.setUsername(null)
        user.setAccess_token(null)
        return router.push('/login')
      },
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },

    };
  },
});
</script>
