<template>
  <a-config-provider>
    <a-app>
      <router-view></router-view>
    </a-app>
  </a-config-provider>
</template>

<script lang="ts" setup>
import {onMounted} from 'vue';
import {useSettingsStore} from './store/settings';
import {useRecordStore} from './store/record';

const settingsStore = useSettingsStore();
const recordStore = useRecordStore();

onMounted(() => {
  if (settingsStore.autoConnect) {
    recordStore.connect();
  }
});
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
