<template>
  <div class="property-panel bg-white p-4 rounded-lg shadow-sm">
    <h3 class="text-lg font-medium text-gray-900 mb-4">属性设置</h3>
    
    <!-- 内容编辑 -->
    <div class="space-y-4">
      <div v-if="type === 'text'">
        <label class="block text-sm font-medium text-gray-700 mb-1">文本内容</label>
        <textarea
          v-model="editContent"
          class="form-textarea w-full h-32"
          placeholder="请输入文本内容"
          @input="handleContentChange"
        ></textarea>
      </div>

      <div v-if="type === 'image'">
        <label class="block text-sm font-medium text-gray-700 mb-1">图片URL</label>
        <input
          v-model="editContent"
          type="text"
          class="form-input w-full"
          placeholder="请输入图片URL"
          @input="handleContentChange"
        />
        <div v-if="editContent" class="mt-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">预览</label>
          <img
            :src="editContent"
            alt="预览"
            class="w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </div>

    <!-- 样式编辑 -->
    <div class="mt-6 space-y-4">
      <h4 class="text-sm font-medium text-gray-900">样式设置</h4>
      
      <!-- 内边距 -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">内边距</label>
        <div class="grid grid-cols-2 gap-2">
          <input
            v-model.number="padding.top"
            type="number"
            class="form-input"
            placeholder="上"
            @input="handleStyleChange"
          />
          <input
            v-model.number="padding.right"
            type="number"
            class="form-input"
            placeholder="右"
            @input="handleStyleChange"
          />
          <input
            v-model.number="padding.bottom"
            type="number"
            class="form-input"
            placeholder="下"
            @input="handleStyleChange"
          />
          <input
            v-model.number="padding.left"
            type="number"
            class="form-input"
            placeholder="左"
            @input="handleStyleChange"
          />
        </div>
      </div>

      <!-- 背景颜色 -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">背景颜色</label>
        <input
          v-model="backgroundColor"
          type="color"
          class="form-input w-full h-8"
          @input="handleStyleChange"
        />
      </div>

      <!-- 文字颜色 -->
      <div v-if="type === 'text'">
        <label class="block text-sm font-medium text-gray-700 mb-1">文字颜色</label>
        <input
          v-model="color"
          type="color"
          class="form-input w-full h-8"
          @input="handleStyleChange"
        />
      </div>

      <!-- 字体大小 -->
      <div v-if="type === 'text'">
        <label class="block text-sm font-medium text-gray-700 mb-1">字体大小</label>
        <input
          v-model.number="fontSize"
          type="number"
          class="form-input w-full"
          @input="handleStyleChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { ComponentType, ComponentStyle } from '../types';

const props = defineProps<{
  type: ComponentType;
  content: string;
  componentStyle: ComponentStyle;
}>();

const emit = defineEmits<{
  (e: 'update:content', content: string): void;
  (e: 'update:style', style: ComponentStyle): void;
}>();

// 编辑内容
const editContent = ref(props.content);

// 样式相关
const padding = ref({
  top: props.componentStyle.paddingTop ? parseInt(props.componentStyle.paddingTop) : 0,
  right: props.componentStyle.paddingRight ? parseInt(props.componentStyle.paddingRight) : 0,
  bottom: props.componentStyle.paddingBottom ? parseInt(props.componentStyle.paddingBottom) : 0,
  left: props.componentStyle.paddingLeft ? parseInt(props.componentStyle.paddingLeft) : 0,
});

const backgroundColor = ref(props.componentStyle.backgroundColor || '#ffffff');
const color = ref(props.componentStyle.color || '#000000');
const fontSize = ref(props.componentStyle.fontSize ? parseInt(props.componentStyle.fontSize) : 16);

// 监听内容变化
watch(() => props.content, (newContent) => {
  editContent.value = newContent;
});

// 处理内容变化
const handleContentChange = () => {
  emit('update:content', editContent.value);
};

// 处理样式变化
const handleStyleChange = () => {
  const newStyle: ComponentStyle = {
    paddingTop: padding.value.top ? `${padding.value.top}px` : undefined,
    paddingRight: padding.value.right ? `${padding.value.right}px` : undefined,
    paddingBottom: padding.value.bottom ? `${padding.value.bottom}px` : undefined,
    paddingLeft: padding.value.left ? `${padding.value.left}px` : undefined,
    backgroundColor: backgroundColor.value || undefined,
    color: color.value || undefined,
    fontSize: fontSize.value ? `${fontSize.value}px` : undefined,
  };
  emit('update:style', newStyle);
};
</script>

<style scoped>
.property-panel {
  min-width: 300px;
}

.form-input,
.form-textarea {
  @apply border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent;
}

.form-textarea {
  @apply resize-y;
}
</style> 