<template>
  <a-layout>
    <a-layout-header class="header">
      <div class="logo" :class="logoClass">
        <orb-wand-icon class="anticon" />
      </div>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="horizontal" class="menu" @click="onMenuClick">
        <a-menu-item key="run">
          <play-circle-outlined class="anticon" />
          <span>{{ $t('menu.run') }}</span>
        </a-menu-item>
        <a-menu-item key="logs">
          <line-chart-outlined class="anticon" />
          <span>{{ $t('menu.logs') }}</span>
        </a-menu-item>
        <a-menu-item key="settings">
          <setting-outlined class="anticon" />
          <span>{{ $t('menu.settings') }}</span>
        </a-menu-item>
      </a-menu>
      <div class="buttons">
        <a-button type="text" @click="onMinimize">
          <minimize-icon class="anticon" />
        </a-button>
        <a-button type="text" @click="onMaximize">
          <restore-icon v-if="isMaximized" class="anticon" />
          <maximize-icon v-else class="anticon" />
        </a-button>
        <a-button type="text" @click="onClose">
          <close-icon class="anticon" />
        </a-button>
      </div>
    </a-layout-header>
    <a-layout-content class="content">
      <router-view />
    </a-layout-content>
  </a-layout>
</template>

<script lang="ts" setup>
  import OrbWandIcon from '~icons/game-icons/orb-wand';
  import PlayCircleOutlined from '~icons/ant-design/play-circle-outlined';
  import LineChartOutlined from '~icons/ant-design/line-chart-outlined';
  import SettingOutlined from '~icons/ant-design/setting-outlined';
  import MinimizeIcon from '~icons/mdi/window-minimize';
  import MaximizeIcon from '~icons/mdi/window-maximize';
  import RestoreIcon from '~icons/mdi/window-restore';
  import CloseIcon from '~icons/mdi/close';
  import { ref } from 'vue';
  import { windowOps } from '#preload';
  import { onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useRecordStore } from '@/store/record';
  import { computed } from 'vue';

  const selectedKeys = ref<string[]>(['logs']);
  const recordStore = useRecordStore();

  const logoClass = computed(() => {
    return 'logo-' + recordStore.readyState.toLowerCase();
  });

  const router = useRouter();

  const onMinimize = () => {
    windowOps.minimize();
  };

  const isMaximized = ref(false);

  onMounted(() => {
    isMaximized.value = windowOps.isMaximized();
  });

  const onMaximize = () => {
    isMaximized.value = !isMaximized.value;
    windowOps.maximize();
  };

  const onClose = () => {
    windowOps.close();
  };

  const onMenuClick = ({ key }: { key: string }) => {
    if (key === 'run') {
      router.push('/damage');
    } else if (key === 'logs') {
      router.push('/logs/stats');
    } else if (key === 'settings') {
      router.push('/logs/settings');
    }
  };
</script>

<style scoped lang="less">
  .header {
    height: 32px;
    line-height: 32px;
    padding-inline: 0px;

    display: flex;
    z-index: 2000;
  }

  .logo {
    width: 32px;
    height: 32px;
    text-align: center;

    &.logo-open {
      background: #52c41a;
    }
    &.logo-connecting {
      background: #faad14;
    }
    &.logo-closed {
      background: #f5222d;
    }

    svg.anticon {
      color: white;
    }
  }

  .menu {
    user-select: none;
    flex: auto;
    -webkit-app-region: drag;

    :deep(li) {
      -webkit-app-region: no-drag;
    }
  }

  .buttons svg.anticon {
    color: white;
  }

  .content {
    height: calc(100vh - 32px);
    background-color: white;
    border: 1px solid #d9d9d9;
  }
</style>
