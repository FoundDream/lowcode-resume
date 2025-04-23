import type { Template } from '../../types/template';
import { v4 as uuidv4 } from 'uuid';

export const modernTemplate: Template = {
  id: uuidv4(),
  name: '现代简约',
  description: '一个简洁现代的简历模板，适合技术类职位',
  thumbnail: '/templates/modern-thumbnail.png',
  theme: {
    primaryColor: '#3b82f6',
    backgroundColor: '#ffffff',
    textColor: '#1f2937'
  },
  components: [
    {
      id: uuidv4(),
      type: 'title',
      content: {
        text: '张三',
        level: 1,
        align: 'center',
        textColor: '#1f2937'
      },
      style: {
        margin: '0 0 0 0'
      }
    },
    {
      id: uuidv4(),
      type: 'contact',
      content: {
        items: [
          {
            icon: 'carbon:email',
            label: '邮箱',
            value: 'zhangsan@example.com'
          },
          {
            icon: 'carbon:phone',
            label: '电话',
            value: '13800138000'
          },
          {
            icon: 'carbon:location',
            label: '地址',
            value: '北京市朝阳区'
          },
          {
            icon: 'carbon:github',
            label: 'GitHub',
            value: 'github.com/zhangsan'
          }
        ],
        iconBgColor: '#f3f4f6',
        iconColor: '#3b82f6',
        labelColor: '#6b7280',
        valueColor: '#374151'
      },
      style: {
        margin: '0 0 0 0'
      }
    },
    {
      id: uuidv4(),
      type: 'section',
      content: {
        title: '个人简介',
        titleLevel: 2,
        titleAlign: 'left',
        titleColor: '#1f2937',
        layout: 'vertical',
        contentGap: 4
      },
      style: {
        margin: '0 0 0 0'
      }
    },
    {
      id: uuidv4(),
      type: 'text',
      content: {
        text: '5年前端开发经验，熟悉 Vue.js、React、TypeScript 等现代前端技术栈，有良好的工程化实践和性能优化经验。主导过多个大型项目的开发，对前端架构设计和团队协作有丰富经验。'
      },
      style: {
        margin: '0 0 0 0'
      }
    },
    {
      id: uuidv4(),
      type: 'section',
      content: {
        title: '工作经历',
        titleLevel: 2,
        titleAlign: 'left',
        titleColor: '#1f2937',
        layout: 'vertical',
        contentGap: 4
      },
      style: {
        margin: '0 0 0 0'
      }
    },
    {
      id: uuidv4(),
      type: 'experience',
      content: {
        items: [
          {
            company: '某科技有限公司',
            position: '高级前端工程师',
            startTime: '2020.06',
            endTime: '至今',
            location: '北京',
            responsibilities: [
              '负责公司核心产品的前端架构设计和开发',
              '优化前端性能，提升用户体验',
              '制定前端开发规范，推动团队技术栈升级',
              '指导初级工程师，组织技术分享会'
            ],
            skills: ['Vue.js', 'TypeScript', 'Vite', 'Tailwind CSS']
          },
          {
            company: '某网络科技公司',
            position: '前端工程师',
            startTime: '2018.07',
            endTime: '2020.05',
            location: '上海',
            responsibilities: [
              '参与电商平台的前端开发',
              '实现复杂的交互功能和动画效果',
              '开发和维护公共组件库',
              '优化构建流程，提升开发效率'
            ],
            skills: ['React', 'Redux', 'Webpack', 'Styled Components']
          }
        ],
        companyColor: '#1f2937',
        positionColor: '#374151',
        timeColor: '#6b7280',
        responsibilityColor: '#4b5563',
        skillBgColor: '#f3f4f6',
        skillColor: '#374151'
      },
      style: {
        margin: '0 0 0 0'
      }
    },
    {
      id: uuidv4(),
      type: 'section',
      content: {
        title: '教育背景',
        titleLevel: 2,
        titleAlign: 'left',
        titleColor: '#1f2937',
        layout: 'vertical',
        contentGap: 4
      },
      style: {
        margin: '0 0 0 0'
      }
    },
    {
      id: uuidv4(),
      type: 'education',
      content: {
        items: [
          {
            school: '某大学',
            major: '计算机科学与技术',
            degree: '本科',
            startTime: '2014.09',
            endTime: '2018.06',
            location: '北京',
            gpa: '3.8/4.0',
            ranking: '前 10%'
          }
        ],
        schoolColor: '#1f2937',
        majorColor: '#374151',
        timeColor: '#6b7280',
        gpaColor: '#6b7280',
        descriptionColor: '#4b5563'
      },
      style: {
        margin: '0 0 0 0'
      }
    },
    {
      id: uuidv4(),
      type: 'section',
      content: {
        title: '技能专长',
        titleLevel: 2,
        titleAlign: 'left',
        titleColor: '#1f2937',
        layout: 'vertical',
        contentGap: 4
      },
      style: {
        margin: '0 0 0 0'
      }
    },
    {
      id: uuidv4(),
      type: 'skill-tag',
      content: {
        tags: [
          'Vue.js',
          'React',
          'TypeScript',
          'JavaScript',
          'HTML5',
          'CSS3',
          'Node.js',
          'Webpack',
          'Vite',
          'Git',
          'Tailwind CSS',
          'Styled Components'
        ],
        tagColor: '#f3f4f6',
        textColor: '#374151'
      },
      style: {
        margin: '0 0 0 0'
      }
    }
  ]
}; 