<template>
  <div class="editor min-h-screen bg-gradient-to-br from-indigo-50 to-white">
    <header class="bg-white shadow-sm sticky top-0 z-10">
      <div class="max-w-[1920px] mx-auto py-2 px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-3">
            <router-link to="/" class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Icon icon="carbon:document" class="text-white text-lg" />
              </div>
              <h1 class="text-xl font-bold text-gray-900">低代码简历</h1>
            </router-link>
          </div>
          <div class="flex gap-2">
            <button
              class="btn btn-secondary"
              @click="handleSave"
            >
              <Icon icon="carbon:save" class="mr-2" />
              保存
            </button>
            <button
              class="btn btn-primary"
              @click="handlePreview"
            >
              <Icon icon="carbon:view" class="mr-2" />
              预览
            </button>
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-[1920px] mx-auto py-3 px-2 sm:px-4 lg:px-6">
      <Transition name="fade" mode="out-in">
        <ResumeEditor />
      </Transition>
    </main>
    
    <footer class="bg-white border-t border-gray-200 py-4">
      <div class="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <p class="text-center text-xs text-gray-500">
          © {{ new Date().getFullYear() }} 低代码简历构建器 | Made with ❤️
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Transition } from 'vue';
import { Icon } from '@iconify/vue';
import ResumeEditor from '../components/editor/ResumeEditor.vue';
import { useResumeStore } from '../stores/resume';
import { useTemplateStore } from '../stores/template';
import { onMounted } from 'vue';
import type { BaseComponent } from '../types/resume';

const resumeStore = useResumeStore();
const templateStore = useTemplateStore();

// 初始化时应用模板
onMounted(() => {
  if (templateStore.selectedTemplate) {
    // 如果有选择的模板，应用模板内容
    templateStore.selectedTemplate.components.forEach((component: BaseComponent) => {
      resumeStore.addComponent(component);
    });
    resumeStore.updateResumeStyle(templateStore.selectedTemplate.theme);
  }
});

const handleSave = () => {
  // TODO: 实现保存功能
  console.log('保存简历', resumeStore.resume);
};

const handlePreview = () => {
  // TODO: 实现预览功能
  console.log('预览简历', resumeStore.resume);
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}


</style> 