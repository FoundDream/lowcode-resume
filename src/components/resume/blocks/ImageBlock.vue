<template>
  <BaseBlock
    :component-style="componentStyle"
    :is-selected="isSelected"
    @edit="$emit('edit')"
    @delete="$emit('delete')"
    @select="$emit('select')"
  >
    <div class="image-content">
      <img
        :src="content"
        alt="图片"
        class="w-full h-auto rounded-lg"
      />
    </div>
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
.image-content {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style> 