<template>
  <BaseBlock
    :component-style="componentStyle"
    :is-selected="isSelected"
    @edit="$emit('edit')"
    @delete="$emit('delete')"
    @select="$emit('select')"
  >
    <div class="education-block">
      <div
        v-for="(item, index) in content.items"
        :key="index"
        class="education-item"
        :class="{ 'mb-6': index !== content.items.length - 1 }"
      >
        <!-- 学校名称 -->
        <div 
          class="school-name text-lg font-semibold mb-1"
          :style="{ color: content.schoolColor }"
        >
          {{ item.school }}
        </div>

        <!-- 专业和学位 -->
        <div 
          class="major-degree text-base mb-1"
          :style="{ color: content.majorColor }"
        >
          {{ item.major }} · {{ item.degree }}
        </div>

        <!-- 时间和地点 -->
        <div 
          class="time-location text-sm mb-2"
          :style="{ color: content.timeColor }"
        >
          {{ item.startTime }} - {{ item.endTime }} · {{ item.location }}
        </div>

        <!-- GPA和排名 -->
        <div 
          v-if="item.gpa || item.ranking"
          class="gpa-ranking text-sm mb-2"
          :style="{ color: content.gpaColor }"
        >
          <template v-if="item.gpa">GPA: {{ item.gpa }}</template>
          <template v-if="item.gpa && item.ranking"> · </template>
          <template v-if="item.ranking">排名: {{ item.ranking }}</template>
        </div>

        <!-- 描述 -->
        <div 
          v-if="item.description"
          class="description text-sm"
          :style="{ color: content.descriptionColor }"
        >
          {{ item.description }}
        </div>
      </div>
    </div>
  </BaseBlock>
</template>

<script setup lang="ts">
import BaseBlock from '../base/BaseBlock.vue';
import type { ComponentStyle } from '../types';

interface EducationItem {
  school: string;
  major: string;
  degree: string;
  startTime: string;
  endTime: string;
  location: string;
  gpa?: string;
  ranking?: string;
  description?: string;
}

interface EducationContent {
  items: EducationItem[];
  schoolColor: string;
  majorColor: string;
  timeColor: string;
  gpaColor: string;
  descriptionColor: string;
}

interface Props {
  content: EducationContent;
  componentStyle: ComponentStyle;
  isSelected?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  content: () => ({
    items: [],
    schoolColor: '#1f2937',
    majorColor: '#374151',
    timeColor: '#6b7280',
    gpaColor: '#6b7280',
    descriptionColor: '#4b5563'
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
.education-block {
  width: 100%;
}

.education-item {
  transition: all 0.2s ease;
}

.education-item:hover {
  transform: translateX(4px);
}
</style> 