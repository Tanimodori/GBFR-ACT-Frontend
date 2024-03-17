<template>
  <template v-if="recordStore.records.length === 0">
    <div class="empty">
      <a-empty />
    </div>
  </template>
  <template v-else>
    <a-tabs v-model:activeKey="activeKey" type="editable-card" hide-add @edit="onEdit" @tab-click="onTabClick">
      <template #leftExtra>
        <div class="tabLeft"></div>
      </template>
      <a-tab-pane
        v-for="i in validRecords.length"
        :key="validRecords[i - 1].id"
        :tab="getTabName(validRecords[i - 1])"
        :closable="true"
      >
        <StatsPane :record="validRecords[i - 1]" />
      </a-tab-pane>
    </a-tabs>
  </template>
</template>

<script lang="ts" setup>
  import dayjs from '@/utils/dayjs';
  import { ref, watch, onActivated, onMounted, computed } from 'vue';
  import { type RecordState, useRecordStore } from '@/store/record';
  import StatsPane from './StatsPane.vue';
  const activeKey = ref('');
  const mannualSelect = ref(false);
  const recordStore = useRecordStore();

  const validRecords = computed(() =>
    recordStore.records.filter(record => record.hasBattleMessage || record.id === recordStore.activeRecordId),
  );

  const getTabName = (record: RecordState) => {
    const startTime = dayjs(record.startTimestamp).format('HH:mm:ss');
    const duration = dayjs(record.lastTimestamp).from(dayjs(record.startTimestamp), true);
    return `${startTime}[${duration}]`;
  };

  const onTabClick = (key: string) => {
    if (recordStore.activeRecordId === key) {
      mannualSelect.value = false;
    } else {
      mannualSelect.value = true;
    }
  };

  // Auto select active tab
  const autoSelectActiveTab = () => {
    if (!mannualSelect.value && recordStore.activeRecordId !== '') {
      activeKey.value = recordStore.activeRecordId;
    }
  };
  watch([() => recordStore.activeRecordId], autoSelectActiveTab);
  onMounted(autoSelectActiveTab);
  onActivated(autoSelectActiveTab);

  // Remove tab
  const onEdit = (targetKey: string | MouseEvent, action: string) => {
    if (action !== 'remove') {
      return;
    }
    const key = targetKey as string;
    const index = recordStore.records.findIndex(record => record.id === key);
    if (index !== -1) {
      recordStore.records.splice(index, 1);
    }
  };
</script>

<style scoped lang="less">
  .empty {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .tabLeft {
    width: 10px;
  }
</style>
