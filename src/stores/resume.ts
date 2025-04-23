import { defineStore } from 'pinia';
import type { ResumeData, BaseComponent } from '../types/resume';
import { v4 as uuidv4 } from 'uuid';

interface ResumeState {
  resume: ResumeData;
}

export const useResumeStore = defineStore('resume', {
  state: (): ResumeState => ({
    resume: {
      id: uuidv4(),
      title: '我的简历',
      components: [],
      style: {
        width: '800px',
        padding: '20px',
        backgroundColor: '#ffffff'
      }
    }
  }),

  actions: {
    // 添加组件
    addComponent(component: BaseComponent) {
      this.resume.components.push(component);
    },

    // 删除组件
    removeComponent(componentId: string) {
      this.resume.components = this.resume.components.filter(
        (comp: BaseComponent) => comp.id !== componentId
      );
    },

    // 更新组件
    updateComponent(componentId: string, updates: Partial<BaseComponent>) {
      const index = this.resume.components.findIndex((comp: BaseComponent) => comp.id === componentId);
      if (index !== -1) {
        this.resume.components[index] = {
          ...this.resume.components[index],
          ...updates
        };
      }
    },

    // 更新简历样式
    updateResumeStyle(style: Partial<ResumeData['style']>) {
      this.resume.style = {
        ...this.resume.style,
        ...style
      };
    },

    // 清空简历
    clearResume() {
      this.resume.components = [];
    }
  }
}); 