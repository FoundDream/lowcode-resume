<template>
  <BaseBlock
    :component-style="componentStyle"
    :is-selected="isSelected"
    @edit="$emit('edit')"
    @delete="$emit('delete')"
    @select="$emit('select')"
  >
    <div class="text-content" v-html="content"></div>
  </BaseBlock>
</template>

<script setup lang="ts">
import BaseBlock from '../base/BaseBlock.vue';
import type { ComponentStyle } from '../types';

defineProps<{
  content: string;
  componentStyle: ComponentStyle;
  isSelected?: boolean;
}>();

defineEmits<{
  (e: 'edit'): void;
  (e: 'delete'): void;
  (e: 'select'): void;
}>();
</script>

<style scoped>
.text-content {
  white-space: pre-wrap;
  word-break: break-word;
}
</style> 