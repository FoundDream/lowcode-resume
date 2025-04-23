<template>
  <BaseBlock
    :component-style="componentStyle"
    :is-selected="isSelected"
    @edit="$emit('edit')"
    @delete="$emit('delete')"
    @select="$emit('select')"
  >
    <div class="experience-block">
      <div
        v-for="(item, index) in content.items"
        :key="index"
        class="experience-item"
        :class="{ 'mb-6': index !== content.items.length - 1 }"
      >
        <!-- 公司名称和职位 -->
        <div class="company-position mb-2">
          <div 
            class="company-name text-lg font-semibold"
            :style="{ color: content.companyColor }"
          >
            {{ item.company }}
          </div>
          <div 
            class="position text-base"
            :style="{ color: content.positionColor }"
          >
            {{ item.position }}
          </div>
        </div>

        <!-- 时间和地点 -->
        <div 
          class="time-location text-sm mb-2"
          :style="{ color: content.timeColor }"
        >
          {{ item.startTime }} - {{ item.endTime }} · {{ item.location }}
        </div>

        <!-- 工作内容 -->
        <div class="responsibilities">
          <div
            v-for="(resp, respIndex) in item.responsibilities"
            :key="respIndex"
            class="responsibility-item text-sm mb-1 flex items-start"
            :style="{ color: content.responsibilityColor }"
          >
            <span class="bullet-point mr-2">•</span>
            <span>{{ resp }}</span>
          </div>
        </div>

        <!-- 技能标签 -->
        <div 
          v-if="item.skills && item.skills.length"
          class="skills mt-2 flex flex-wrap gap-2"
        >
          <div
            v-for="(skill, skillIndex) in item.skills"
            :key="skillIndex"
            class="skill-tag px-2 py-0.5 text-xs rounded"
            :style="{
              backgroundColor: content.skillBgColor,
              color: content.skillColor
            }"
          >
            {{ skill }}
          </div>
        </div>
      </div>
    </div>
  </BaseBlock>
</template>

<script setup lang="ts">
import BaseBlock from '../base/BaseBlock.vue';
import type { ComponentStyle } from '../types';

interface ExperienceItem {
  company: string;
  position: string;
  startTime: string;
  endTime: string;
  location: string;
  responsibilities: string[];
  skills?: string[];
}

interface ExperienceContent {
  items: ExperienceItem[];
  companyColor: string;
  positionColor: string;
  timeColor: string;
  responsibilityColor: string;
  skillBgColor: string;
  skillColor: string;
}

interface Props {
  content: ExperienceContent;
  componentStyle: ComponentStyle;
  isSelected?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  content: () => ({
    items: [],
    companyColor: '#1f2937',
    positionColor: '#374151',
    timeColor: '#6b7280',
    responsibilityColor: '#4b5563',
    skillBgColor: '#f3f4f6',
    skillColor: '#374151'
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
.experience-block {
  width: 100%;
}

.experience-item {
  transition: all 0.2s ease;
}

.experience-item:hover {
  transform: translateX(4px);
}

.bullet-point {
  color: var(--primary-color);
}
</style> 