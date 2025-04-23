<template>
  <BaseBlock
    :component-style="componentStyle"
    :is-selected="isSelected"
    @edit="$emit('edit')"
    @delete="$emit('delete')"
    @select="$emit('select')"
  >
    <div class="skill-tags flex flex-wrap gap-2">
      <div
        v-for="(tag, index) in content.tags"
        :key="index"
        class="skill-tag px-3 py-1 rounded-full text-sm font-medium"
        :style="{
          backgroundColor: content.tagColor,
          color: content.textColor
        }"
      >
        {{ tag }}
      </div>
    </div>
  </BaseBlock>
</template>

<script setup lang="ts">
import BaseBlock from '../base/BaseBlock.vue';
import type { ComponentStyle } from '../types';

interface SkillTagContent {
  tags: string[];
  tagColor: string;
  textColor: string;
}

interface Props {
  content: SkillTagContent;
  componentStyle: ComponentStyle;
  isSelected?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
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
.skill-tag {
  transition: all 0.2s ease;
}

.skill-tag:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style> 