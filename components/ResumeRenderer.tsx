
import React from 'react';
import { ResumeData, ThemeType } from '../types';

interface ResumeRendererProps {
  data: ResumeData;
  theme: ThemeType;
  primaryColor: string;
}

const ResumeRenderer: React.FC<ResumeRendererProps> = ({ data, theme, primaryColor }) => {
  const { basics, education, experience, projects, skills, languages } = data;

  const SectionTitle = ({ title }: { title: string }) => (
    <div className="mb-4 mt-6 border-b-2 pb-1" style={{ borderColor: primaryColor }}>
      <h2 className="text-lg font-bold uppercase tracking-wider" style={{ color: primaryColor }}>{title}</h2>
    </div>
  );

  return (
    <div id="resume-content" className="bg-white shadow-2xl mx-auto p-10 min-h-[1120px] w-full max-w-[800px] text-slate-800" style={{ fontFamily: 'Noto Sans SC, sans-serif' }}>
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2 tracking-tight">{basics.name}</h1>
        <p className="text-lg font-medium mb-3" style={{ color: primaryColor }}>{basics.title}</p>
        <div className="flex justify-center gap-4 text-sm text-slate-500">
          <span>{basics.email}</span>
          <span>•</span>
          <span>{basics.phone}</span>
          <span>•</span>
          <span>{basics.location}</span>
        </div>
      </header>

      {/* Summary */}
      <section className="mb-6">
        <p className="text-sm leading-relaxed text-slate-600 italic">
          {basics.summary}
        </p>
      </section>

      {/* Main Content: Layout depends on Theme (simplified for this demo to focus on content quality) */}
      <div className="grid grid-cols-1 gap-6">
        
        {/* Work Experience */}
        <section>
          <SectionTitle title="工作经历" />
          {experience.map((exp, idx) => (
            <div key={idx} className="mb-4">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-bold text-slate-900">{exp.company}</h3>
                <span className="text-xs font-semibold text-slate-500">{exp.startDate} - {exp.endDate}</span>
              </div>
              <div className="text-sm font-medium mb-2 text-slate-700 italic">{exp.position}</div>
              <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                {exp.responsibilities.map((res, i) => (
                  <li key={i}>{res}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Education */}
        <section>
          <SectionTitle title="教育背景" />
          {education.map((edu, idx) => (
            <div key={idx} className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-slate-900">{edu.school}</h3>
                <div className="text-sm text-slate-700">{edu.degree} · {edu.major}</div>
              </div>
              <span className="text-xs font-semibold text-slate-500">{edu.startDate} - {edu.endDate}</span>
            </div>
          ))}
        </section>

        {/* Projects */}
        <section>
          <SectionTitle title="项目经验" />
          {projects.map((proj, idx) => (
            <div key={idx} className="mb-4">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-bold text-slate-900">{proj.name}</h3>
                <span className="text-xs font-medium text-slate-500">角色: {proj.role}</span>
              </div>
              <p className="text-sm text-slate-600 mb-1">{proj.description}</p>
              <div className="flex flex-wrap gap-2">
                {proj.technologies.map((tech, i) => (
                  <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Skills & Languages */}
        <div className="grid grid-cols-2 gap-8">
          <section>
            <SectionTitle title="核心技能" />
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <span key={i} className="text-sm px-3 py-1 bg-slate-50 border rounded-full text-slate-700 border-slate-200">
                  {skill}
                </span>
              ))}
            </div>
          </section>
          <section>
            <SectionTitle title="语言能力" />
            <div className="space-y-1">
              {languages.map((lang, i) => (
                <div key={i} className="text-sm text-slate-700 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: primaryColor }}></div>
                  {lang}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ResumeRenderer;
