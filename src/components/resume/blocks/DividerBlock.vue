<template>
  <div 
    class="divider-block relative group"
    :style="componentStyle"
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
    
    <!-- 编辑按钮 -->
    <div class="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
      <button 
        @click="$emit('edit')"
        class="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors"
      >
        <Icon icon="carbon:edit" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';

interface Props {
  type?: 'horizontal' | 'vertical';
  style?: 'solid' | 'dashed' | 'dotted';
  color?: string;
  width?: number;
  componentStyle?: Record<string, string>;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'horizontal',
  style: 'solid',
  color: '#e5e7eb',
  width: 1,
  componentStyle: () => ({})
});

defineEmits<{
  (e: 'edit'): void;
}>();
</script>

<style scoped>
.divider-block {
  padding: 0.5rem 0;
}

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