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
        titleClasses
      ]"
      :style="{ color: content.textColor }"
    >
      {{ content.text }}
    </h1>
    <div 
      v-if="divider.show"
      class="divider-line"
      :class="dividerClasses"
      :style="dividerStyles"
    ></div>
  </BaseBlock>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BaseBlock from '../../base/BaseBlock.vue';
import type { ComponentStyle } from '../../types';

interface TitleContent {
  text: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  align: 'left' | 'center' | 'right';
  textColor: string;
}

interface DividerOptions {
  show: boolean;
  type: 'solid' | 'dashed' | 'dotted';
  color: string;
  width: number;
}

interface Props {
  content: TitleContent;
  divider: DividerOptions;
  componentStyle: ComponentStyle;
  isSelected?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  componentStyle: () => ({}),
  isSelected: false,
  divider: () => ({
    show: false,
    type: 'solid',
    color: '#000000',
    width: 1
  })
});

// 标题样式计算
const titleClasses = computed(() => {
  const sizeMap = {
    1: 'text-3xl font-bold',
    2: 'text-2xl font-semibold',
    3: 'text-xl font-medium',
    4: 'text-lg font-medium',
    5: 'text-base font-medium',
    6: 'text-sm font-medium'
  };

  return [
    sizeMap[props.content.level],
    {
      'text-center': props.content.align === 'center',
      'text-right': props.content.align === 'right'
    }
  ];
});

// 分割线样式计算
const dividerClasses = computed(() => [
  `divider-${props.divider.type}`
]);

const dividerStyles = computed(() => ({
  borderColor: props.divider.color,
  borderWidth: `${props.divider.width}px`
}));

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
  font-weight: 700;
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.divider-line {
  margin: 8px 0;
  border-top-style: solid;
}

.divider-dashed {
  border-top-style: dashed;
}

.divider-dotted {
  border-top-style: dotted;
}
</style> 