<template>
  <a-config-provider>
    <a-app>
      <router-view></router-view>
    </a-app>
  </a-config-provider>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue';
  import { useSettingsStore } from './store/settings';
  import { useRecordStore } from './store/record';
  import { globalShortcut } from '#preload';
  import { useRouter } from 'vue-router';
  import { onUnmounted } from 'vue';

  const settingsStore = useSettingsStore();
  const recordStore = useRecordStore();
  const router = useRouter();

  onMounted(() => {
    if (settingsStore.connection.startup) {
      recordStore.connect();
    }
  });

  const toggleRoute = () => {
    if (!settingsStore.shortcut.enabled) {
      return;
    }
    const route = router.currentRoute.value;
    if (route.path === '/damage') {
      router.push('/logs/stats');
    } else {
      router.push('/damage');
    }
  };

  onMounted(() => {
    globalShortcut.unregisterAllGlobalShortcuts();
    const shortcut = settingsStore.shortcut.key;
    if (settingsStore.shortcut.enabled && shortcut) {
      globalShortcut.registerGlobalShortcut(shortcut, toggleRoute);
    }
  });

  onUnmounted(() => {
    globalShortcut.unregisterAllGlobalShortcuts();
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
