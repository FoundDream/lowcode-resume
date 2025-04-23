<template>
  <BaseBlock
    :component-style="componentStyle"
    :is-selected="isSelected"
    @edit="$emit('edit')"
    @delete="$emit('delete')"
    @select="$emit('select')"
  >
    <div class="section-block">
      <!-- 区块标题 -->
      <div 
        v-if="content.title"
        class="section-title"
        :class="[
          `text-${content.titleLevel}`,
          { 'text-center': content.titleAlign === 'center' },
          { 'text-right': content.titleAlign === 'right' }
        ]"
        :style="{ color: content.titleColor }"
      >
        {{ content.title }}
      </div>

      <!-- 区块内容 -->
      <div 
        class="section-content"
        :class="[
          `gap-${content.contentGap}`,
          { 'flex flex-col': content.layout === 'vertical' },
          { 'grid grid-cols-2 gap-4': content.layout === 'grid' }
        ]"
      >
        <slot></slot>
      </div>
    </div>
  </BaseBlock>
</template>

<script setup lang="ts">
import BaseBlock from '../base/BaseBlock.vue';
import type { ComponentStyle } from '../types';

interface SectionContent {
  title?: string;
  titleLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  titleAlign?: 'left' | 'center' | 'right';
  titleColor?: string;
  layout?: 'vertical' | 'grid';
  contentGap?: 2 | 4 | 6 | 8;
}

interface Props {
  content: SectionContent;
  componentStyle: ComponentStyle;
  isSelected?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  content: () => ({
    title: '',
    titleLevel: 2,
    titleAlign: 'left',
    titleColor: '#1f2937',
    layout: 'vertical',
    contentGap: 4
  }),
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
.section-block {
  width: 100%;
}

.section-title {
  font-weight: 600;
  line-height: 1.4;
}

.section-content {
  width: 100%;
}
</style> 