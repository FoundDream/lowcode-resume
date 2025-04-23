// 组件样式接口
export interface ComponentStyle {
  width?: string;
  height?: string;
  margin?: string;
  padding?: string;
  backgroundColor?: string;
  borderRadius?: string;
  [key: string]: string | undefined;
}

// 组件基础属性接口
export interface BaseComponentProps {
  componentStyle: ComponentStyle;
  isSelected?: boolean;
}

// 组件事件接口
export interface BaseComponentEmits {
  (e: 'edit'): void;
  (e: 'delete'): void;
  (e: 'select'): void;
}

export type ComponentType = 
  | 'title'
  | 'text'
  | 'list'
  | 'image'
  | 'divider'
  | 'contact'
  | 'skill-tag'
  | 'timeline'
  | 'section'
  | 'experience'
  | 'education'; 