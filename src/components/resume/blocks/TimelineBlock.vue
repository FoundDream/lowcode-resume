<template>
  <div 
    class="timeline-block relative group"
    :style="componentStyle"
  >
    <div class="timeline-items space-y-4">
      <div
        v-for="(item, index) in content.items"
        :key="index"
        class="timeline-item relative pl-6"
      >
        <!-- 时间线节点 -->
        <div 
          class="timeline-dot absolute left-0 top-2 w-3 h-3 rounded-full"
          :style="{ backgroundColor: content.dotColor }"
        ></div>
        
        <!-- 时间线连接线 -->
        <div 
          v-if="index !== content.items.length - 1"
          class="timeline-line absolute left-[5px] top-5 w-[2px] h-[calc(100%+1rem)]"
          :style="{ backgroundColor: content.lineColor }"
        ></div>
        
        <!-- 时间 -->
        <div 
          class="timeline-time text-sm font-medium mb-1"
          :style="{ color: content.timeColor }"
        >
          {{ item.time }}
        </div>
        
        <!-- 标题 -->
        <div 
          class="timeline-title text-lg font-semibold mb-1"
          :style="{ color: content.titleColor }"
        >
          {{ item.title }}
        </div>
        
        <!-- 描述 -->
        <div 
          class="timeline-description text-gray-600"
          :style="{ color: content.descriptionColor }"
        >
          {{ item.description }}
        </div>
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

interface TimelineItem {
  time: string;
  title: string;
  description: string;
}

interface TimelineContent {
  items: TimelineItem[];
  dotColor: string;
  lineColor: string;
  timeColor: string;
  titleColor: string;
  descriptionColor: string;
}

interface Props {
  content: TimelineContent;
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
.timeline-block {
  padding: 1rem 0;
}

.timeline-item {
  position: relative;
}

.timeline-dot {
  z-index: 1;
}

.timeline-line {
  z-index: 0;
}
</style> 