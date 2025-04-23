<template>
  <div 
    class="contact-block relative group"
    :style="componentStyle"
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
.contact-block {
  padding: 1rem 0;
}

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