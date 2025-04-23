<template>
  <div class="resume-editor flex h-[calc(100vh-8rem)] bg-white rounded-xl shadow-lg overflow-hidden">
    <!-- 左侧组件库 -->
    <div class="component-library w-56 border-r border-gray-200 p-3 bg-gray-50 overflow-y-auto">
      <div class="flex items-center justify-between mb-3">
        <h2 class="text-base font-bold text-gray-800">组件库</h2>
        <div class="w-7 h-7 bg-indigo-100 rounded-full flex items-center justify-center">
          <Icon icon="carbon:components" class="text-indigo-600" />
        </div>
      </div>
      <div class="components-list space-y-2">
        <div
          v-for="component in availableComponents"
          :key="component.type"
          class="component-item p-2 bg-white rounded-lg shadow-sm cursor-move hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-indigo-300"
          draggable="true"
          @dragstart="handleDragStart($event, component)"
        >
          <div class="flex items-center gap-2">
            <div class="w-7 h-7 bg-indigo-50 rounded-full flex items-center justify-center">
              <Icon :icon="component.icon" class="text-indigo-600" />
            </div>
            <span class="font-medium text-gray-700 text-sm">{{ component.label }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 中间编辑区域 -->
    <div 
      class="editor-area flex-1 p-4 overflow-y-auto bg-gray-50"
      @dragover.prevent
      @drop="handleDrop($event)"
    >
      <div class="resume-container mx-auto bg-white rounded-xl shadow-md p-6" :style="resumeStyle">
        <draggable
          v-model="resumeComponents"
          class="space-y-4"
          item-key="id"
          @start="drag = true"
          @end="drag = false"
          ghost-class="draggable-ghost"
          drag-class="draggable-drag"
        >
          <template #item="{ element }">
            <div class="component-wrapper group">
              <component
                :is="getComponentByType(element.type)"
                :content="element.content"
                :component-style="element.style"
                @edit="handleEdit(element)"
                @delete="handleDelete(element)"
              />
            </div>
          </template>
        </draggable>
        
        <!-- 空状态 -->
        <div v-if="resumeComponents.length === 0" class="empty-state py-12 text-center">
          <div class="w-14 h-14 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon icon="carbon:add-alt" class="text-indigo-600 text-xl" />
          </div>
          <h3 class="text-base font-medium text-gray-700 mb-2">开始构建您的简历</h3>
          <p class="text-gray-500 max-w-md mx-auto text-sm">
            从左侧拖拽组件到此处，开始构建您的专业简历。您可以添加文本、图片、列表等多种组件。
          </p>
        </div>
      </div>
    </div>

    <!-- 右侧属性面板 -->
    <div class="property-panel w-72 border-l border-gray-200 p-3 bg-gray-50 overflow-y-auto">
      <div class="flex items-center justify-between mb-3">
        <h2 class="text-base font-bold text-gray-800">属性设置</h2>
        <div class="w-7 h-7 bg-indigo-100 rounded-full flex items-center justify-center">
          <Icon icon="carbon:settings" class="text-indigo-600" />
        </div>
      </div>
      
      <Transition name="fade" mode="out-in">
        <div v-if="selectedComponent" class="property-form space-y-4">
          <div class="bg-white rounded-lg shadow-sm p-3 border border-gray-200">
            <h3 class="text-sm font-medium text-gray-700 mb-2">组件类型</h3>
            <div class="flex items-center gap-2">
              <div class="w-7 h-7 bg-indigo-50 rounded-full flex items-center justify-center">
                <Icon :icon="getComponentIcon(selectedComponent.type)" class="text-indigo-600" />
              </div>
              <span class="font-medium text-gray-700 text-sm">{{ getComponentLabel(selectedComponent.type) }}</span>
            </div>
          </div>
          
          <!-- 样式设置 -->
          <div class="bg-white rounded-lg shadow-sm p-3 border border-gray-200">
            <h3 class="text-sm font-medium text-gray-700 mb-2">样式设置</h3>
            <div class="space-y-2">
              <div>
                <label class="block text-xs text-gray-500 mb-1">宽度</label>
                <input
                  v-model="selectedComponent.style.width"
                  type="text"
                  class="form-input"
                  placeholder="例如: 100%"
                />
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-1">内边距</label>
                <input
                  v-model="selectedComponent.style.padding"
                  type="text"
                  class="form-input"
                  placeholder="例如: 10px"
                />
              </div>
            </div>
          </div>
          
          <!-- 组件内容编辑 -->
          <div v-if="selectedComponent.type === 'text'" class="bg-white rounded-lg shadow-sm p-3 border border-gray-200">
            <h3 class="text-sm font-medium text-gray-700 mb-2">内容编辑</h3>
            <textarea
              v-model="selectedComponent.content"
              class="form-input"
              rows="4"
              placeholder="请输入文本内容"
            ></textarea>
          </div>
          
          <div v-if="selectedComponent.type === 'image'" class="bg-white rounded-lg shadow-sm p-3 border border-gray-200">
            <h3 class="text-sm font-medium text-gray-700 mb-2">图片设置</h3>
            <div class="space-y-2">
              <div>
                <label class="block text-xs text-gray-500 mb-1">图片URL</label>
                <input
                  v-model="selectedComponent.content.src"
                  type="text"
                  class="form-input"
                  placeholder="请输入图片URL"
                />
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-1">替代文本</label>
                <input
                  v-model="selectedComponent.content.alt"
                  type="text"
                  class="form-input"
                  placeholder="请输入替代文本"
                />
              </div>
            </div>
          </div>
          
          <div v-if="selectedComponent.type === 'list'" class="bg-white rounded-lg shadow-sm p-3 border border-gray-200">
            <h3 class="text-sm font-medium text-gray-700 mb-2">列表项</h3>
            <div class="space-y-2">
              <div v-for="(_, index) in selectedComponent.content" :key="index" class="flex gap-2">
                <input
                  v-model="selectedComponent.content[index]"
                  type="text"
                  class="form-input"
                  :placeholder="'列表项 ' + (index + 1)"
                />
                <button
                  @click="removeListItem(index)"
                  class="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Icon icon="carbon:trash-can" />
                </button>
              </div>
              <button
                @click="addListItem"
                class="w-full mt-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <Icon icon="carbon:add" />
                <span>添加项目</span>
              </button>
            </div>
          </div>
          
          <!-- 删除组件按钮 -->
          <button
            @click="handleDelete(selectedComponent)"
            class="w-full btn btn-danger text-sm py-1.5"
          >
            <Icon icon="carbon:trash-can" class="mr-2" />
            删除组件
          </button>
        </div>
        <div v-else class="empty-state py-8 text-center">
          <div class="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon icon="carbon:settings" class="text-gray-400 text-xl" />
          </div>
          <h3 class="text-base font-medium text-gray-700 mb-2">选择组件进行编辑</h3>
          <p class="text-gray-500 max-w-md mx-auto text-sm">
            点击任何组件上的编辑按钮，或从左侧拖拽新组件到编辑区域。
          </p>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useResumeStore } from '../../stores/resume';
import type { BaseComponent, ComponentType } from '../../types/resume';
import { v4 as uuidv4 } from 'uuid';
import draggable from 'vuedraggable';
import { Icon } from '@iconify/vue';
import TextBlock from '../resume/blocks/TextBlock.vue';
import ListBlock from '../resume/blocks/ListBlock.vue'
import ImageBlock from '../resume/blocks/ImageBlock.vue';

const store = useResumeStore();
const drag = ref(false);
const selectedComponent = ref<BaseComponent | null>(null);

// 可用组件列表
const availableComponents = [
  { type: 'text' as ComponentType, label: '文本块', icon: 'carbon:text' },
  { type: 'image' as ComponentType, label: '图片', icon: 'carbon:image' },
  { type: 'list' as ComponentType, label: '列表', icon: 'carbon:list' },
];

// 计算属性
const resumeComponents = computed({
  get: () => store.resume.components,
  set: (value) => {
    store.resume.components = value;
  },
});

const resumeStyle = computed(() => store.resume.style);

// 方法
const getComponentByType = (type: ComponentType) => {
  const componentMap = {
    text: TextBlock,
    image: ImageBlock,
    list: ListBlock,
  };
  return componentMap[type];
};

const getComponentIcon = (type: ComponentType) => {
  const iconMap = {
    text: 'carbon:text',
    image: 'carbon:image',
    list: 'carbon:list',
  };
  return iconMap[type] || 'carbon:component';
};

const getComponentLabel = (type: ComponentType) => {
  const labelMap = {
    text: '文本块',
    image: '图片',
    list: '列表',
  };
  return labelMap[type] || '未知组件';
};

const handleDragStart = (event: DragEvent, component: { type: ComponentType }) => {
  if (event.dataTransfer) {
    event.dataTransfer.setData('componentType', component.type);
  }
};

const handleDrop = (event: DragEvent) => {
  event.preventDefault();
  const componentType = event.dataTransfer?.getData('componentType') as ComponentType | null;
  
  if (componentType) {
    let newComponent: BaseComponent;
    
    switch (componentType) {
      case 'text':
        newComponent = {
          id: uuidv4(),
          type: 'text',
          content: '请输入文本内容',
          style: {
            width: '100%',
            padding: '10px',
          }
        };
        break;
      case 'image':
        newComponent = {
          id: uuidv4(),
          type: 'image',
          content: {
            src: 'https://via.placeholder.com/300x200',
            alt: '示例图片'
          },
          style: {
            width: '100%',
            padding: '10px',
          }
        };
        break;
      case 'list':
        newComponent = {
          id: uuidv4(),
          type: 'list',
          content: ['列表项 1', '列表项 2', '列表项 3'],
          style: {
            width: '100%',
            padding: '10px',
          }
        };
        break;
      default:
        return;
    }
    
    store.addComponent(newComponent);
  }
};

const handleEdit = (component: BaseComponent) => {
  selectedComponent.value = component;
};

const handleDelete = (component: BaseComponent) => {
  store.removeComponent(component.id);
  if (selectedComponent.value?.id === component.id) {
    selectedComponent.value = null;
  }
};

// 列表组件相关方法
const addListItem = () => {
  if (selectedComponent.value && selectedComponent.value.type === 'list') {
    selectedComponent.value.content.push('新列表项');
  }
};

const removeListItem = (index: number) => {
  if (selectedComponent.value && selectedComponent.value.type === 'list') {
    selectedComponent.value.content.splice(index, 1);
  }
};
</script>

<style scoped>
.resume-container {
  min-height: 100%;
  background-color: white;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
}

.component-wrapper {
  position: relative;
  transition: all 0.2s ease;
}

.component-wrapper:hover {
  transform: translateY(-2px);
}

.component-wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 2px dashed transparent;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  pointer-events: none;
}

.component-wrapper:hover::before {
  border-color: #818cf8;
}

.empty-state {
  color: #6b7280;
}
</style> 