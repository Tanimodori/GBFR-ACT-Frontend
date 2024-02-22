<template>
  <div>{{ props.record }}</div>
</template>

<script lang="ts" setup>
import type {RecordState} from '@/store/record';

const props = defineProps<{
  record: RecordState;
}>();
</script>
