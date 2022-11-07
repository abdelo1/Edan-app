import { boot } from "quasar/wrappers";
import { StatusBar } from '@awesome-cordova-plugins/status-bar';
import { Preferences } from '@capacitor/preferences';
import { createPinia } from 'pinia'
import authService from "src/services/auth.service";
import { useUserStore } from "src/stores/user"
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

StatusBar.overlaysWebView(false);

// set status bar to white
StatusBar.backgroundColorByHexString('#1976D2');

/*const setName = async () => {
  await Preferences.set({
    key: 'firstLaunch',
    value: '1',
  });
};

 */
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ router, app }) => {
  const { value } = await Preferences.get({ key: 'firstLaunch' });
  const pinia =  createPinia().use(piniaPluginPersistedstate)
  app.use(pinia);
  app.provide(/* key */ 'appName', /* value */ 'Edan App')
  if(!value){
    return router.push('/launchPage')
  }


 /* router.beforeEach(async (to, from, next) => {
    const   user             = useUserStore()
    const  {status, data }   = await authService.getUser()
    if(status == 200 ){
      user.setUsername (data.username)
      user.setAccess_token ( data.access_token)
    }
    next()
  })*/




});
