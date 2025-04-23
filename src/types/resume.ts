// 组件类型
export type ComponentType = 'image' | 'list' | 'title' | 'divider' | 'skill-tag' | 'timeline' | 'contact' | 'section' | 'experience' | 'education';

// 基础组件属性
export interface BaseComponent {
  id: string;
  type: ComponentType;
  content: any;
  style: {
    width: string;
    padding: string;
    [key: string]: string;
  };
}

// 组件样式
export interface ComponentStyle {
  width?: string;
  padding?: string;
  backgroundColor?: string;
  color?: string;
  fontSize?: string;
  [key: string]: string | undefined;
}

// 简历数据
export interface ResumeData {
  id: string;
  title: string;
  components: BaseComponent[];
  style: ResumeStyle;
}

// 简历样式
export interface ResumeStyle {
  width: string;
  padding: string;
  backgroundColor: string;
  [key: string]: string;
}

export interface Resume {
  id: string;
  title: string;
  components: BaseComponent[];
  style: {
    width: string;
    padding: string;
    [key: string]: string;
  };
} 