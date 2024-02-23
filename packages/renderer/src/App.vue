<template>
  <a-config-provider :locale="locale">
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
  import { computed } from 'vue';
  import en_US from 'ant-design-vue/es/locale/en_US';
  import zh_CN from 'ant-design-vue/es/locale/zh_CN';
  import { isValidLocale } from './locales';

  const settingsStore = useSettingsStore();
  const recordStore = useRecordStore();
  const router = useRouter();

  // Locale
  const locales = {
    en_US,
    zh_CN,
  };
  const locale = computed(() => {
    const localeKey = settingsStore.locale.language;
    const validLocaleKey = isValidLocale(localeKey) ? localeKey : 'en_US';
    return locales[validLocaleKey];
  });

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

  const refreshShortcut = () => {
    globalShortcut.unregisterAllGlobalShortcuts();
    const shortcut = settingsStore.shortcut.switch;
    if (settingsStore.shortcut.enabled && shortcut) {
      globalShortcut.registerGlobalShortcut(shortcut, toggleRoute);
    }
  };

  onMounted(refreshShortcut);
  onUnmounted(() => {
    globalShortcut.unregisterAllGlobalShortcuts();
  });
  settingsStore.$subscribe(mutation => {
    if (mutation.type === 'patch object' && mutation.payload.shortcut) {
      refreshShortcut();
    }
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

<style lang="less">
  body {
    margin: 0;
    overflow: hidden;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .anticon {
    vertical-align: -0.25em;
  }
</style>
