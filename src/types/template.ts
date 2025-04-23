import type { ComponentStyle } from './component.ts';

// 模板组件类型
export type TemplateComponentType = 
  | 'title'
  | 'text'
  | 'list'
  | 'image'
  | 'divider'
  | 'contact'
  | 'skill-tag'
  | 'timeline'
  | 'section'
  | 'education'
  | 'experience';

// 模板组件基础接口
export interface TemplateComponent {
  id: string;
  type: TemplateComponentType;
  content: Record<string, any>;
  style: ComponentStyle;
}

// 模板接口
export interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  components: TemplateComponent[];
  theme: {
    primaryColor: string;
    backgroundColor: string;
    textColor: string;
  };
}

// 模板分类
export interface TemplateCategory {
  id: string;
  name: string;
  description: string;
  templates: Template[];
} 