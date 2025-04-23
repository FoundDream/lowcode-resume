import { defineStore } from 'pinia';
import type { Template } from '../types/template';

interface TemplateState {
  selectedTemplate: Template | null;
}

export const useTemplateStore = defineStore('template', {
  state: (): TemplateState => ({
    selectedTemplate: null
  }),

  actions: {
    // 选择模板
    selectTemplate(template: Template) {
      this.selectedTemplate = template;
    },

    // 清除选择的模板
    clearTemplate() {
      this.selectedTemplate = null;
    }
  }
}); 