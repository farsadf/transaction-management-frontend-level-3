<template>
  <v-app>
    <v-main>
      <div class="alerts">
        <Alert
          v-for="notification in $store.state.notifications"
          v-bind:status="notification.status"
          v-bind:message="notification.message"
          v-bind:alert="notification"
        />
      </div>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Alert from '@/components/Alert.vue'

export default {
  name: 'App',

  data: () => ({
    //
  }),
  components: { Alert }
};
</script>

<style lang="scss" scoped>
.alerts{
  position: absolute;
  width: 100%;
  padding: 20px;
  top: 0;
  left: 0;
  z-index: 9;
}
</style>