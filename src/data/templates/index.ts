import type { TemplateCategory } from '../../types/template';
import { modernTemplate } from './modern';

export const templateCategories: TemplateCategory[] = [
  {
    id: '1',
    name: '技术类',
    description: '适合技术类职位的简历模板',
    templates: [modernTemplate]
  }
]; 