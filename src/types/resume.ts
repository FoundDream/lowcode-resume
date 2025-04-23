// 组件类型
export type ComponentType = 'text' | 'image' | 'list';

// 基础组件属性
export interface BaseComponent {
  id: string;
  type: ComponentType;
  content: any;
  style: ComponentStyle;
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