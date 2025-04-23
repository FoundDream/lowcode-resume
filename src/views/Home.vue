<template>
  <div class="home">
    <!-- 导航栏 -->
    <nav class="fixed w-full bg-white z-50 border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0 flex items-center">
              <Icon icon="mdi:file-document-outline" class="h-8 w-8 text-blue-600" />
              <span class="ml-2 text-xl font-bold text-gray-900">ResumeBuilder</span>
            </div>
            <div class="hidden sm:ml-8 sm:flex sm:space-x-8">
              <router-link to="/" class="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium">
                首页
              </router-link>
              <router-link to="/templates" class="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium">
                简历模板
              </router-link>
              <router-link to="/examples" class="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium">
                简历示例
              </router-link>
              <router-link to="/resources" class="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium">
                资源中心
              </router-link>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <button class="text-gray-500 hover:text-gray-900 font-medium">
              登录
            </button>
            <router-link
              to="/editor"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              创建简历
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero 区域 -->
    <div class="relative pt-16 overflow-hidden">
      <div class="relative">
        <div class="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
          <div class="px-4 max-w-xl mx-auto sm:px-6 lg:py-32 lg:max-w-none lg:mx-0 lg:px-0">
            <div>
              <div class="mt-6">
                <div class="text-base text-blue-600 font-semibold tracking-wide uppercase">
                  专业简历制作工具
                </div>
                <h1 class="mt-4 text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span class="block">用AI驱动的简历工具</span>
                  <span class="block text-blue-600">打造完美职业生涯</span>
                </h1>
                <p class="mt-6 text-xl text-gray-500">
                  {{ todayCount }} 份简历今日完成 · 求职成功率提升39% · 8%更高的薪资机会
                </p>
                <div class="mt-8 flex flex-wrap gap-4">
                  <router-link
                    to="/editor"
                    class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                  >
                    免费创建简历
                  </router-link>
                  <a
                    href="#templates"
                    class="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    浏览模板
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 特性展示 -->
    <div class="bg-gray-50 py-16 sm:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            为什么选择我们的简历制作工具
          </h2>
          <p class="mt-3 text-xl text-gray-500 sm:mt-4">
            智能简历制作工具，让你的求职之路更轻松
          </p>
        </div>
        <dl class="mt-12 space-y-10 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-x-6 sm:gap-y-12 lg:gap-x-8">
          <div class="relative">
            <dt>
              <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                <Icon icon="mdi:lightning-bolt" class="h-6 w-6" />
              </div>
              <p class="ml-16 text-lg leading-6 font-medium text-gray-900">AI 驱动写作</p>
            </dt>
            <dd class="mt-2 ml-16 text-base text-gray-500">
              智能AI助手帮你优化简历内容，突出核心竞争力
            </dd>
          </div>

          <div class="relative">
            <dt>
              <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                <Icon icon="mdi:palette" class="h-6 w-6" />
              </div>
              <p class="ml-16 text-lg leading-6 font-medium text-gray-900">专业模板</p>
            </dt>
            <dd class="mt-2 ml-16 text-base text-gray-500">
              提供多个行业的专业模板，轻松打造个性简历
            </dd>
          </div>

          <div class="relative">
            <dt>
              <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                <Icon icon="mdi:check-decagram" class="h-6 w-6" />
              </div>
              <p class="ml-16 text-lg leading-6 font-medium text-gray-900">ATS优化</p>
            </dt>
            <dd class="mt-2 ml-16 text-base text-gray-500">
              确保你的简历能通过企业的简历筛选系统
            </dd>
          </div>
        </dl>
      </div>
    </div>

    <!-- 数据统计 -->
    <div class="bg-blue-600">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl font-extrabold text-white sm:text-4xl">
            值得信赖的简历制作平台
          </h2>
          <p class="mt-3 text-xl text-blue-200">
            帮助全球求职者获得理想工作
          </p>
        </div>
        <dl class="mt-10 text-center sm:max-w-3xl sm:mx-auto sm:grid sm:grid-cols-3 sm:gap-8">
          <div class="flex flex-col">
            <dt class="order-2 mt-2 text-lg leading-6 font-medium text-blue-200">
              简历完成数
            </dt>
            <dd class="order-1 text-5xl font-extrabold text-white">
              100万+
            </dd>
          </div>
          <div class="flex flex-col mt-10 sm:mt-0">
            <dt class="order-2 mt-2 text-lg leading-6 font-medium text-blue-200">
              求职成功率
            </dt>
            <dd class="order-1 text-5xl font-extrabold text-white">
              89%
            </dd>
          </div>
          <div class="flex flex-col mt-10 sm:mt-0">
            <dt class="order-2 mt-2 text-lg leading-6 font-medium text-blue-200">
              用户好评
            </dt>
            <dd class="order-1 text-5xl font-extrabold text-white">
              4.9/5
            </dd>
          </div>
        </dl>
      </div>
    </div>

    <!-- 页脚 -->
    <footer class="bg-white">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              产品
            </h3>
            <ul role="list" class="mt-4 space-y-4">
              <li>
                <a href="#" class="text-base text-gray-500 hover:text-gray-900">
                  简历模板
                </a>
              </li>
              <li>
                <a href="#" class="text-base text-gray-500 hover:text-gray-900">
                  求职指南
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              支持
            </h3>
            <ul role="list" class="mt-4 space-y-4">
              <li>
                <a href="#" class="text-base text-gray-500 hover:text-gray-900">
                  帮助中心
                </a>
              </li>
              <li>
                <a href="#" class="text-base text-gray-500 hover:text-gray-900">
                  联系我们
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              公司
            </h3>
            <ul role="list" class="mt-4 space-y-4">
              <li>
                <a href="#" class="text-base text-gray-500 hover:text-gray-900">
                  关于我们
                </a>
              </li>
              <li>
                <a href="#" class="text-base text-gray-500 hover:text-gray-900">
                  博客
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              法律
            </h3>
            <ul role="list" class="mt-4 space-y-4">
              <li>
                <a href="#" class="text-base text-gray-500 hover:text-gray-900">
                  隐私政策
                </a>
              </li>
              <li>
                <a href="#" class="text-base text-gray-500 hover:text-gray-900">
                  服务条款
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
          <div class="flex space-x-6 md:order-2">
            <a href="#" class="text-gray-400 hover:text-gray-500">
              <span class="sr-only">GitHub</span>
              <Icon icon="mdi:github" class="h-6 w-6" />
            </a>
            <a href="#" class="text-gray-400 hover:text-gray-500">
              <span class="sr-only">Twitter</span>
              <Icon icon="mdi:twitter" class="h-6 w-6" />
            </a>
          </div>
          <p class="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
            &copy; 2025 ResumeBuilder. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref } from 'vue';

const todayCount = ref('35,751');
</script>

<style scoped>
.home {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style> 