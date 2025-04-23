<template>
  <div 
    class="skill-tag-block relative group"
    :style="componentStyle"
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

interface SkillTagContent {
  tags: string[];
  tagColor: string;
  textColor: string;
}

interface Props {
  content: SkillTagContent;
  componentStyle?: Record<string, string>;
}

const props = withDefaults(defineProps<Props>(), {
  componentStyle: () => ({})
});

defineEmits<{
  (e: 'edit'): void;
}>();
</script>

<style scoped>
.skill-tag-block {
  padding: 0.5rem 0;
}

.skill-tag {
  transition: all 0.2s ease;
}

.skill-tag:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style> 