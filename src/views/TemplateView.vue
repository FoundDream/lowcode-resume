<template>
  <div class="template-view">
    <!-- 页面标题 -->
    <div class="page-header mb-8">
      <h1 class="text-2xl font-bold text-gray-900">选择模板</h1>
      <p class="mt-2 text-gray-600">选择一个适合你的简历模板开始制作</p>
    </div>

    <!-- 模板分类列表 -->
    <div class="template-categories space-y-8">
      <div
        v-for="category in templateCategories"
        :key="category.id"
        class="template-category"
      >
        <!-- 分类标题 -->
        <div class="category-header mb-4">
          <h2 class="text-xl font-semibold text-gray-900">{{ category.name }}</h2>
          <p class="mt-1 text-gray-600">{{ category.description }}</p>
        </div>

        <!-- 模板列表 -->
        <div class="template-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="template in category.templates"
            :key="template.id"
            class="template-card bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            @click="selectTemplate(template)"
          >
            <!-- 模板预览图 -->
            <div class="template-thumbnail aspect-[3/4] rounded-t-lg overflow-hidden">
              <img
                :src="template.thumbnail"
                :alt="template.name"
                class="w-full h-full object-cover"
              />
            </div>

            <!-- 模板信息 -->
            <div class="template-info p-4">
              <h3 class="text-lg font-medium text-gray-900">{{ template.name }}</h3>
              <p class="mt-1 text-sm text-gray-600">{{ template.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { templateCategories } from '../data/templates';
import type { Template } from '../types/template';
import { useRouter } from 'vue-router';
import { useTemplateStore } from '../stores/template';

const router = useRouter();
const templateStore = useTemplateStore();

// 选择模板
const selectTemplate = (template: Template) => {
  // 保存选择的模板到 store
  templateStore.selectTemplate(template);
  
  // 跳转到编辑器页面
  router.push('/editor');
};
</script>

<style scoped>
.template-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}
</style> 