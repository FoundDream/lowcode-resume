<template>
  <BaseBlock
    :component-style="componentStyle"
    :is-selected="isSelected"
    @edit="$emit('edit')"
    @delete="$emit('delete')"
    @select="$emit('select')"
  >
    <div class="contact-items grid grid-cols-2 gap-4">
      <div
        v-for="(item, index) in content.items"
        :key="index"
        class="contact-item flex items-center gap-2"
      >
        <!-- 图标 -->
        <div 
          class="contact-icon w-8 h-8 rounded-full flex items-center justify-center"
          :style="{ backgroundColor: content.iconBgColor }"
        >
          <Icon 
            :icon="item.icon" 
            class="text-lg"
            :style="{ color: content.iconColor }"
          />
        </div>
        
        <!-- 内容 -->
        <div class="contact-content">
          <div 
            class="contact-label text-sm"
            :style="{ color: content.labelColor }"
          >
            {{ item.label }}
          </div>
          <div 
            class="contact-value font-medium"
            :style="{ color: content.valueColor }"
          >
            {{ item.value }}
          </div>
        </div>
      </div>
    </div>
  </BaseBlock>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import BaseBlock from '../base/BaseBlock.vue';
import type { ComponentStyle } from '../types';

interface ContactItem {
  icon: string;
  label: string;
  value: string;
}

interface ContactContent {
  items: ContactItem[];
  iconBgColor: string;
  iconColor: string;
  labelColor: string;
  valueColor: string;
}

interface Props {
  content: ContactContent;
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
.contact-item {
  transition: all 0.2s ease;
}

.contact-item:hover {
  transform: translateY(-1px);
}

.contact-icon {
  transition: all 0.2s ease;
}

.contact-item:hover .contact-icon {
  transform: scale(1.1);
}
</style> 