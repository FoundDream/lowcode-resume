<template>
  <BaseBlock
    :component-style="componentStyle"
    :is-selected="isSelected"
    @edit="$emit('edit')"
    @delete="$emit('delete')"
    @select="$emit('select')"
  >
    <h1 
      :class="[
        'title-content',
        `text-${content.level}`,
        { 'text-center': content.align === 'center' },
        { 'text-right': content.align === 'right' }
      ]"
      :style="{ color: content.textColor }"
    >
      {{ content.text }}
    </h1>
  </BaseBlock>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BaseBlock from '../base/BaseBlock.vue';
import type { ComponentStyle } from '../types';

interface TitleContent {
  text: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  align: 'left' | 'center' | 'right';
  textColor: string;
}

interface Props {
  content: TitleContent;
  componentStyle: ComponentStyle;
  isSelected?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  componentStyle: () => ({}),
  isSelected: false
});

// 标题样式映射
const textLevel = computed(() => {
  const sizeMap = {
    1: 'text-3xl font-bold',
    2: 'text-2xl font-semibold',
    3: 'text-xl font-medium',
    4: 'text-lg font-medium',
    5: 'text-base font-medium',
    6: 'text-sm font-medium'
  };
  return sizeMap[props.content.level];
});

defineEmits<{
  (e: 'edit'): void;
  (e: 'delete'): void;
  (e: 'select'): void;
}>();
</script>

<style scoped>
.title-content {
  margin: 0;
  line-height: 1.4;
}
</style> 