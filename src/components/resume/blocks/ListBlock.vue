<template>
  <BaseBlock
    :component-style="componentStyle"
    :is-selected="isSelected"
    @edit="$emit('edit')"
    @delete="$emit('delete')"
    @select="$emit('select')"
  >
    <div class="list-content">
      <ul class="list-disc pl-5 space-y-1">
        <li v-for="(item, index) in content" :key="index" class="text-gray-700">
          {{ item }}
        </li>
      </ul>
    </div>
  </BaseBlock>
</template>

<script setup lang="ts">
import BaseBlock from '../base/BaseBlock.vue';
import type { ComponentStyle } from '../types';

defineProps<{
  content: string[];
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
.list-content {
  min-height: 50px;
}
</style> 