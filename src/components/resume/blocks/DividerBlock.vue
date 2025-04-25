<template>
  <BaseBlock
    :component-style="componentStyle"
    :is-selected="isSelected"
    @edit="$emit('edit')"
    @delete="$emit('delete')"
    @select="$emit('select')"
  >
    <div 
      class="divider-line"
      :class="[
        `divider-${type}`,
        { 'divider-dashed': style === 'dashed' },
        { 'divider-dotted': style === 'dotted' }
      ]"
      :style="{ 
        borderColor: color,
        borderWidth: `${width}px`
      }"
    ></div>
  </BaseBlock>
</template>

<script setup lang="ts">
import BaseBlock from '../base/BaseBlock.vue';
import type { ComponentStyle } from '../types';

interface Props {
  type?: 'horizontal' | 'vertical';
  style?: 'solid' | 'dashed' | 'dotted';
  color?: string;
  width?: number;
  componentStyle: ComponentStyle;
  isSelected?: boolean;
}

withDefaults(defineProps<Props>(), {
  type: 'horizontal',
  style: 'solid',
  color: '#e5e7eb',
  width: 1,
  componentStyle: () => ({}),
  isSelected: false
});

defineEmits<{
  (e: 'edit'): void;
  (e: 'delete'): void;
  (e: 'select'): void;
}>();
</script>

<style scoped>
.divider-line {
  margin: 0;
}

.divider-horizontal {
  width: 100%;
  border-top-style: solid;
}

.divider-vertical {
  height: 100%;
  min-height: 1rem;
  border-left-style: solid;
}

.divider-dashed {
  border-style: dashed;
}

.divider-dotted {
  border-style: dotted;
}
</style>