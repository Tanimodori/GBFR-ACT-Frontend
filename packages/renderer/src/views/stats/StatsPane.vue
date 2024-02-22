<template>
  <div class="wrapper">
    <StatsTable :record="props.record"></StatsTable>
  </div>
</template>

<script lang="ts" setup>
  import type { RecordState } from '@/store/record';
  import StatsTable from './StatsTable.vue';

  const props = defineProps<{
    record: RecordState;
  }>();
</script>
