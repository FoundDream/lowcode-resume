<template>
  <div 
    class="base-block relative group"
    :class="{ 'is-selected': isSelected }"
    :style="componentStyle"
    @click="$emit('select')"
  >
    <!-- 内容插槽 -->
    <div class="block-content">
      <slot />
    </div>

    <!-- 操作按钮 -->
    <div class="absolute top-[-10px] right-[-10px] opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
      <button
        @click.stop="$emit('edit')"
        class="p-1.5 bg-white rounded-lg shadow-sm hover:bg-gray-50 text-gray-600 hover:text-gray-900"
      >
        <Icon icon="carbon:edit" class="text-lg" />
      </button>
      <button
        @click.stop="$emit('delete')"
        class="p-1.5 bg-white rounded-lg shadow-sm hover:bg-gray-50 text-gray-600 hover:text-red-600"
      >
        <Icon icon="carbon:trash-can" class="text-lg" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import type { ComponentStyle } from '../types';

defineProps<{
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
.base-block {
  background-color: white;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  cursor: pointer;
}

.base-block:hover {
  border: 1px solid #000
}

.base-block.is-selected {
  box-shadow: 0 0 0 2px var(--primary-color);
}

</style> 