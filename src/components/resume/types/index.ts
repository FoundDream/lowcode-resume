// 组件类型
export type ComponentType = 'text' | 'image';

// 基础组件属性
export interface BaseComponentProps {
  id: string;
  type: ComponentType;
  content: string;
  style: ComponentStyle;
}

// 组件样式
export interface ComponentStyle {
  paddingTop?: string | undefined;
  paddingRight?: string | undefined;
  paddingBottom?: string | undefined;
  paddingLeft?: string | undefined;
  backgroundColor?: string | undefined;
  color?: string | undefined;
  fontSize?: string | undefined;
  [key: string]: string | undefined;
}

// 组件事件
export interface ComponentEvents {
  onEdit: () => void;
  onDelete: () => void;
  onSelect: () => void;
}

// 属性面板事件
export interface PropertyPanelEvents {
  onContentUpdate: (content: string) => void;
  onStyleUpdate: (style: ComponentStyle) => void;
} 