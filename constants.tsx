
import { ThemeType, ResumeTheme } from './types';

export const RESUME_THEMES: ResumeTheme[] = [
  { id: ThemeType.MODERN, name: '现代商务', primaryColor: '#2563eb' },
  { id: ThemeType.CLASSIC, name: '经典职场', primaryColor: '#1e293b' },
  { id: ThemeType.MINIMAL, name: '极简主义', primaryColor: '#0f172a' },
  { id: ThemeType.CREATIVE, name: '创意设计', primaryColor: '#7c3aed' },
];

export const INITIAL_RESUME_DATA = {
  basics: {
    name: "张三",
    email: "zhangsan@example.com",
    phone: "138-0000-0000",
    location: "北京",
    title: "资深前端开发工程师",
    summary: "拥有 5 年前端开发经验，精通 React 技术栈，对 Web 性能优化和 UI/UX 设计有深入研究。"
  },
  education: [
    {
      school: "某重点大学",
      degree: "学士",
      major: "计算机科学与技术",
      startDate: "2015",
      endDate: "2019"
    }
  ],
  experience: [
    {
      company: "某知名互联网公司",
      position: "高级前端工程师",
      startDate: "2019",
      endDate: "至今",
      responsibilities: [
        "负责公司核心业务线的前端架构设计与开发。",
        "主导了项目从传统架构向微前端架构的迁移。",
        "通过性能优化，将页面首屏加载速度提升了 40%。"
      ]
    }
  ],
  projects: [
    {
      name: "智能数据可视化平台",
      role: "前端负责人",
      description: "一个为企业提供实时数据分析和图表展示的 SaaS 平台。",
      technologies: ["React", "Echarts", "TypeScript"]
    }
  ],
  skills: ["JavaScript", "TypeScript", "React", "Node.js", "Tailwind CSS"],
  languages: ["普通话 (母语)", "英语 (CET-6)"]
};
