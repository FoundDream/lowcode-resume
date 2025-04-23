<template>
  <div 
    class="title-block relative group"
    :style="componentStyle"
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
import { computed } from 'vue';
import { Icon } from '@iconify/vue';

interface TitleContent {
  text: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  align: 'left' | 'center' | 'right';
  textColor: string;
}

interface Props {
  content: TitleContent;
  componentStyle?: Record<string, string>;
}

const props = withDefaults(defineProps<Props>(), {
  componentStyle: () => ({})
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
}>();
</script>

<style scoped>
.title-block {
  margin: 0.5rem 0;
}

.title-content {
  margin: 0;
  line-height: 1.4;
}
</style> 