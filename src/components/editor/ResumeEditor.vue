<template>
  <div class="resume-editor flex h-[calc(100vh-8rem)] bg-white rounded-xl shadow-lg overflow-hidden">
    <!-- 左侧组件库 -->
    <div class="component-library w-56 border-r border-gray-200 p-3 bg-gray-50 overflow-y-auto">
      <div class="flex items-center justify-between mb-3">
        <h2 class="text-base font-bold text-gray-800">组件库</h2>
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
            <!-- <div class="w-7 h-7 bg-indigo-50 rounded-full flex items-center justify-center">
              <Icon :icon="component.icon" class="text-indigo-600" />
            </div> -->
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
      <div class="resume-container mx-auto bg-white rounded-xl shadow-md" :style="resumeStyle">
        <draggable
          v-model="resumeComponents"
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
        <template v-if="selectedComponent">
          <div class="property-form space-y-4">
            <!-- 组件类型信息 -->
            <div class="bg-white rounded-lg shadow-sm p-3 border border-gray-200">
              <h3 class="text-sm font-medium text-gray-700 mb-2">组件类型</h3>
              <div class="flex items-center gap-2">
                <div class="w-7 h-7 bg-indigo-50 rounded-full flex items-center justify-center">
                  <Icon :icon="getComponentIcon(selectedComponent.type)" class="text-indigo-600" />
                </div>
                <span class="font-medium text-gray-700 text-sm">{{ getComponentLabel(selectedComponent.type) }}</span>
              </div>
            </div>
            
            <!-- 通用样式设置 -->
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
            
            <!-- 标题组件属性 -->
            <div v-if="selectedComponent.type === 'title'" class="bg-white rounded-lg shadow-sm p-3 border border-gray-200">
              <h3 class="text-sm font-medium text-gray-700 mb-2">标题设置</h3>
              <div class="space-y-2">
                <div>
                  <label class="block text-xs text-gray-500 mb-1">标题文本</label>
                  <input
                    v-model="selectedComponent.content.text"
                    type="text"
                    class="form-input"
                    placeholder="请输入标题文本"
                  />
                </div>
                <div>
                  <label class="block text-xs text-gray-500 mb-1">标题级别</label>
                  <select v-model="selectedComponent.content.level" class="form-select">
                    <option value="h1">H1</option>
                    <option value="h2">H2</option>
                    <option value="h3">H3</option>
                  </select>
                </div>
              </div>
            </div>
            
            
          
            
            <!-- 分割线组件属性 -->
            <div v-else-if="selectedComponent.type === 'divider'" class="bg-white rounded-lg shadow-sm p-3 border border-gray-200">
              <h3 class="text-sm font-medium text-gray-700 mb-2">分割线设置</h3>
              <div class="space-y-2">
                <div>
                  <label class="block text-xs text-gray-500 mb-1">样式</label>
                  <select v-model="selectedComponent.content.style" class="form-select">
                    <option value="solid">实线</option>
                    <option value="dashed">虚线</option>
                    <option value="dotted">点线</option>
                  </select>
                </div>
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
        </template>
        <template v-else>
          <div class="empty-state py-8 text-center">
            <div class="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon icon="carbon:select-window" class="w-7 h-7 text-gray-400" />
            </div>
            <p class="text-sm text-gray-500">请选择一个组件进行编辑</p>
          </div>
        </template>
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
import TitleBlock from '../resume/blocks/TitleBlock.vue';
import DividerBlock from '../resume/blocks/DividerBlock.vue';

const store = useResumeStore();
const drag = ref(false);
const selectedComponent = ref<BaseComponent | null>(null);

// 可用组件列表
const availableComponents = [
  { type: 'title' as ComponentType, label: '标题', icon: 'carbon:text' },
  { type: 'divider' as ComponentType, label: '分割线', icon: 'carbon:line' },
];

// Pinia与编辑器组件的双向绑定，可以再思考一下
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
    title: TitleBlock,
    divider: DividerBlock,
  };
  return componentMap[type];
};

const getComponentIcon = (type: ComponentType) => {
  const iconMap = {
    title: 'carbon:text',
    divider: 'carbon:line',
  };
  return iconMap[type] || 'carbon:component';
};

const getComponentLabel = (type: ComponentType) => {
  const labelMap = {
    title: '标题',
    divider: '分割线',
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
      case 'title':
        newComponent = {
          id: uuidv4(),
          type: 'title',
          content: {
            text: '标题文本',
            level: 2,
            align: 'left',
            textColor: '#1f2937'
          },
          style: {
            width: '100%',
            padding: '0px'
          }
        };
        break;
      case 'divider':
        newComponent = {
          id: uuidv4(),
          type: 'divider',
          content: {
            type: 'horizontal',
            style: 'solid',
            color: '#e5e7eb',
            width: 1
          },
          style: {
            width: '100%',
            padding: '0px',
          }
        };
        break
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