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
  import { globalShortcut, windowOps } from '#preload';
  import { useRouter } from 'vue-router';
  import { onUnmounted } from 'vue';
  import type { Rectangle } from 'electron';

  const settingsStore = useSettingsStore();
  const recordStore = useRecordStore();
  const router = useRouter();

  // Auto connect
  onMounted(() => {
    if (settingsStore.connection.startup) {
      recordStore.connect();
    }
  });

  // Global shortcut
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

  // Resize
  const onResizeOrMove = (newBounds: Rectangle) => {
    const route = router.currentRoute.value;
    if (route.path === '/damage') return;
    settingsStore.mainWindowBound.x = newBounds.x;
    settingsStore.mainWindowBound.y = newBounds.y;
    settingsStore.mainWindowBound.width = newBounds.width;
    settingsStore.mainWindowBound.height = newBounds.height;
  };

  onMounted(() => {
    windowOps.addEventListener('will-resize', onResizeOrMove);
    windowOps.addEventListener('will-move', onResizeOrMove);
  });

  onUnmounted(() => {
    windowOps.removeEventListener('will-resize', onResizeOrMove);
    windowOps.removeEventListener('will-move', onResizeOrMove);
  });
</script>

<style>
  html {
    ::-webkit-scrollbar {
      display: none;
    }
  }

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
