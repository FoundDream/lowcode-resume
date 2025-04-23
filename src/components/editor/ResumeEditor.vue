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
            
            <!-- 文本组件属性 -->
            <div v-else-if="selectedComponent.type === 'text'" class="bg-white rounded-lg shadow-sm p-3 border border-gray-200">
              <h3 class="text-sm font-medium text-gray-700 mb-2">内容编辑</h3>
              <textarea
                v-model="selectedComponent.content"
                class="form-input"
                rows="4"
                placeholder="请输入文本内容"
              ></textarea>
            </div>
            
            <!-- 图片组件属性 -->
            <div v-else-if="selectedComponent.type === 'image'" class="bg-white rounded-lg shadow-sm p-3 border border-gray-200">
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
            
            <!-- 列表组件属性 -->
            <div v-else-if="selectedComponent.type === 'list'" class="bg-white rounded-lg shadow-sm p-3 border border-gray-200">
              <h3 class="text-sm font-medium text-gray-700 mb-2">列表项</h3>
              <div class="space-y-2">
                <div v-for="(item, index) in selectedComponent.content" :key="index" class="flex gap-2">
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
                    <Icon icon="carbon:close" class="w-4 h-4" />
                  </button>
                </div>
                <button
                  @click="addListItem"
                  class="w-full py-1.5 text-sm text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                >
                  <Icon icon="carbon:add" class="w-4 h-4 inline-block mr-1" />
                  添加列表项
                </button>
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
            
            <!-- 技能标签组件属性 -->
            <div v-else-if="selectedComponent.type === 'skill-tag'" class="bg-white rounded-lg shadow-sm p-3 border border-gray-200">
              <h3 class="text-sm font-medium text-gray-700 mb-2">技能标签</h3>
              <div class="space-y-2">
                <div v-for="(tag, index) in selectedComponent.content.tags" :key="index" class="flex gap-2">
                  <input
                    v-model="selectedComponent.content.tags[index]"
                    type="text"
                    class="form-input"
                    :placeholder="'标签 ' + (index + 1)"
                  />
                  <button
                    @click="removeSkillTag(index)"
                    class="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Icon icon="carbon:close" class="w-4 h-4" />
                  </button>
                </div>
                <button
                  @click="addSkillTag"
                  class="w-full py-1.5 text-sm text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                >
                  <Icon icon="carbon:add" class="w-4 h-4 inline-block mr-1" />
                  添加标签
                </button>
              </div>
            </div>
            
            <!-- 时间线组件属性 -->
            <div v-else-if="selectedComponent.type === 'timeline'" class="bg-white rounded-lg shadow-sm p-3 border border-gray-200">
              <h3 class="text-sm font-medium text-gray-700 mb-2">时间线项目</h3>
              <div class="space-y-4">
                <div v-for="(item, index) in selectedComponent.content.items" :key="index" class="space-y-2">
                  <div class="flex gap-2">
                    <input
                      v-model="selectedComponent.content.items[index].time"
                      type="text"
                      class="form-input"
                      placeholder="时间"
                    />
                    <button
                      @click="removeTimelineItem(index)"
                      class="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Icon icon="carbon:close" class="w-4 h-4" />
                    </button>
                  </div>
                  <input
                    v-model="selectedComponent.content.items[index].title"
                    type="text"
                    class="form-input"
                    placeholder="标题"
                  />
                  <textarea
                    v-model="selectedComponent.content.items[index].description"
                    class="form-input"
                    rows="2"
                    placeholder="描述"
                  ></textarea>
                </div>
                <button
                  @click="addTimelineItem"
                  class="w-full py-1.5 text-sm text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                >
                  <Icon icon="carbon:add" class="w-4 h-4 inline-block mr-1" />
                  添加时间线项目
                </button>
              </div>
            </div>
            
            <!-- 联系方式组件属性 -->
            <div v-else-if="selectedComponent.type === 'contact'" class="bg-white rounded-lg shadow-sm p-3 border border-gray-200">
              <h3 class="text-sm font-medium text-gray-700 mb-2">联系方式</h3>
              <div class="space-y-4">
                <div v-for="(item, index) in selectedComponent.content.items" :key="index" class="space-y-2">
                  <div class="flex gap-2">
                    <input
                      v-model="selectedComponent.content.items[index].icon"
                      type="text"
                      class="form-input"
                      placeholder="图标"
                    />
                    <button
                      @click="removeContactItem(index)"
                      class="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Icon icon="carbon:close" class="w-4 h-4" />
                    </button>
                  </div>
                  <input
                    v-model="selectedComponent.content.items[index].label"
                    type="text"
                    class="form-input"
                    placeholder="标签"
                  />
                  <input
                    v-model="selectedComponent.content.items[index].value"
                    type="text"
                    class="form-input"
                    placeholder="内容"
                  />
                </div>
                <button
                  @click="addContactItem"
                  class="w-full py-1.5 text-sm text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                >
                  <Icon icon="carbon:add" class="w-4 h-4 inline-block mr-1" />
                  添加联系方式
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
import TextBlock from '../resume/blocks/TextBlock.vue';
import ListBlock from '../resume/blocks/ListBlock.vue';
import ImageBlock from '../resume/blocks/ImageBlock.vue';
import TitleBlock from '../resume/blocks/TitleBlock.vue';
import DividerBlock from '../resume/blocks/DividerBlock.vue';
import SkillTagBlock from '../resume/blocks/SkillTagBlock.vue';
import TimelineBlock from '../resume/blocks/TimelineBlock.vue';
import ContactBlock from '../resume/blocks/ContactBlock.vue';

const store = useResumeStore();
const drag = ref(false);
const selectedComponent = ref<BaseComponent | null>(null);

// 可用组件列表
const availableComponents = [
  { type: 'title' as ComponentType, label: '标题', icon: 'carbon:text' },
  { type: 'text' as ComponentType, label: '文本块', icon: 'material-symbols:format-color-text' },
  { type: 'image' as ComponentType, label: '图片', icon: 'carbon:image' },
  { type: 'list' as ComponentType, label: '列表', icon: 'carbon:list' },
  { type: 'divider' as ComponentType, label: '分割线', icon: 'carbon:line' },
  { type: 'skill-tag' as ComponentType, label: '技能标签', icon: 'carbon:tag' },
  { type: 'timeline' as ComponentType, label: '时间线', icon: 'carbon:time' },
  { type: 'contact' as ComponentType, label: '联系方式', icon: 'carbon:phone' },
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
    title: TitleBlock,
    text: TextBlock,
    image: ImageBlock,
    list: ListBlock,
    divider: DividerBlock,
    'skill-tag': SkillTagBlock,
    timeline: TimelineBlock,
    contact: ContactBlock,
  };
  return componentMap[type];
};

const getComponentIcon = (type: ComponentType) => {
  const iconMap = {
    title: 'carbon:text',
    text: 'carbon:text',
    image: 'carbon:image',
    list: 'carbon:list',
    divider: 'carbon:line',
    'skill-tag': 'carbon:tag',
    timeline: 'carbon:time',
    contact: 'carbon:phone',
  };
  return iconMap[type] || 'carbon:component';
};

const getComponentLabel = (type: ComponentType) => {
  const labelMap = {
    title: '标题',
    text: '文本块',
    image: '图片',
    list: '列表',
    divider: '分割线',
    'skill-tag': '技能标签',
    timeline: '时间线',
    contact: '联系方式',
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
            padding: '10px',
          }
        };
        break;
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
            padding: '10px',
          }
        };
        break;
      case 'skill-tag':
        newComponent = {
          id: uuidv4(),
          type: 'skill-tag',
          content: {
            tags: ['技能1', '技能2', '技能3'],
            tagColor: '#e5e7eb',
            textColor: '#374151'
          },
          style: {
            width: '100%',
            padding: '10px',
          }
        };
        break;
      case 'timeline':
        newComponent = {
          id: uuidv4(),
          type: 'timeline',
          content: {
            items: [
              {
                time: '2020 - 至今',
                title: '示例标题',
                description: '示例描述'
              }
            ],
            dotColor: '#6366f1',
            lineColor: '#e5e7eb',
            timeColor: '#6b7280',
            titleColor: '#1f2937',
            descriptionColor: '#4b5563'
          },
          style: {
            width: '100%',
            padding: '10px',
          }
        };
        break;
      case 'contact':
        newComponent = {
          id: uuidv4(),
          type: 'contact',
          content: {
            items: [
              {
                icon: 'carbon:phone',
                label: '电话',
                value: '123-456-7890'
              }
            ],
            iconBgColor: '#eef2ff',
            iconColor: '#6366f1',
            labelColor: '#6b7280',
            valueColor: '#1f2937'
          },
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

// 在 script setup 部分添加以下方法
const addSkillTag = () => {
  if (selectedComponent.value && selectedComponent.value.type === 'skill-tag') {
    selectedComponent.value.content.tags.push('新标签');
  }
};

const removeSkillTag = (index: number) => {
  if (selectedComponent.value && selectedComponent.value.type === 'skill-tag') {
    selectedComponent.value.content.tags.splice(index, 1);
  }
};

const addTimelineItem = () => {
  if (selectedComponent.value && selectedComponent.value.type === 'timeline') {
    selectedComponent.value.content.items.push({
      time: '新时间',
      title: '新标题',
      description: '新描述'
    });
  }
};

const removeTimelineItem = (index: number) => {
  if (selectedComponent.value && selectedComponent.value.type === 'timeline') {
    selectedComponent.value.content.items.splice(index, 1);
  }
};

const addContactItem = () => {
  if (selectedComponent.value && selectedComponent.value.type === 'contact') {
    selectedComponent.value.content.items.push({
      icon: 'carbon:phone',
      label: '新标签',
      value: '新内容'
    });
  }
};

const removeContactItem = (index: number) => {
  if (selectedComponent.value && selectedComponent.value.type === 'contact') {
    selectedComponent.value.content.items.splice(index, 1);
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