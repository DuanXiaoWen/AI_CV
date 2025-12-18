
import React, { useState, useCallback, useRef } from 'react';
import { GeminiService } from './services/geminiService';
import { ResumeData, ThemeType, ResumeTheme } from './types';
import { INITIAL_RESUME_DATA, RESUME_THEMES } from './constants';
import ResumeRenderer from './components/ResumeRenderer';

const App: React.FC = () => {
  const [inputData, setInputData] = useState<string>('');
  const [resumeData, setResumeData] = useState<ResumeData>(INITIAL_RESUME_DATA);
  const [selectedTheme, setSelectedTheme] = useState<ResumeTheme>(RESUME_THEMES[0]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [templateImage, setTemplateImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const geminiRef = useRef(new GeminiService());

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTemplateImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateResume = async () => {
    if (!inputData.trim()) {
      setError('请输入您的个人资料或工作经历信息。');
      return;
    }

    setIsGenerating(true);
    setError(null);
    try {
      const data = await geminiRef.current.generateResumeData(inputData, templateImage || undefined);
      if (data) {
        setResumeData(data);
      } else {
        setError('无法生成简历数据，请尝试提供更详细的信息。');
      }
    } catch (err) {
      setError('调用 AI 服务失败，请检查网络或 API 配置。');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Header */}
      <nav className="bg-white border-b px-6 py-4 sticky top-0 z-50 no-print">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">智简简历 (AI Resume)</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handlePrint}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-medium transition-colors shadow-md flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              导出 PDF
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Control Panel */}
        <aside className="lg:col-span-5 space-y-6 no-print">
          <section className="bg-white p-6 rounded-2xl shadow-sm border">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="bg-blue-100 text-blue-600 p-1.5 rounded-md text-xs font-black">1</span>
              输入简历信息
            </h2>
            <p className="text-sm text-slate-500 mb-3">
              您可以直接粘贴文字、Markdown 或现有简历内容。AI 将为您提取关键要素。
            </p>
            <textarea
              className="w-full h-48 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm transition-all"
              placeholder="例如：我叫张三，在某某公司做过前端开发，参与了项目A..."
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
          </section>

          <section className="bg-white p-6 rounded-2xl shadow-sm border">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="bg-purple-100 text-purple-600 p-1.5 rounded-md text-xs font-black">2</span>
              参考模板 (可选)
            </h2>
            <p className="text-sm text-slate-500 mb-4">
              上传一张您心仪的简历图片，AI 将尝试模仿其排版风格。
            </p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:border-purple-400 hover:bg-purple-50 transition-all group"
              >
                {templateImage ? (
                  <div className="relative">
                    <img src={templateImage} alt="Template" className="h-32 mx-auto rounded-lg shadow-sm" />
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full cursor-pointer" onClick={(e) => { e.stopPropagation(); setTemplateImage(null); }}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </span>
                  </div>
                ) : (
                  <div className="text-slate-400 group-hover:text-purple-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-medium">点击上传模板图</span>
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </button>
            </div>
          </section>

          <section className="bg-white p-6 rounded-2xl shadow-sm border">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="bg-emerald-100 text-emerald-600 p-1.5 rounded-md text-xs font-black">3</span>
              选择主题
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {RESUME_THEMES.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme)}
                  className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                    selectedTheme.id === theme.id
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-slate-100 hover:border-slate-300 text-slate-600'
                  }`}
                >
                  <div className="w-full h-2 rounded-full mb-2" style={{ backgroundColor: theme.primaryColor }}></div>
                  {theme.name}
                </button>
              ))}
            </div>
          </section>

          <button
            onClick={generateResume}
            disabled={isGenerating}
            className={`w-full py-4 rounded-2xl text-white font-bold text-lg shadow-lg transform transition-all active:scale-95 ${
              isGenerating
                ? 'bg-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
            }`}
          >
            {isGenerating ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                AI 正在努力生成中...
              </span>
            ) : (
              '立即生成 AI 简历'
            )}
          </button>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 text-sm">
              {error}
            </div>
          )}
        </aside>

        {/* Right Preview Panel */}
        <section className="lg:col-span-7 flex flex-col items-center">
          <div className="no-print w-full flex justify-between items-center mb-4 px-2">
            <h2 className="text-xl font-bold text-slate-800">实时预览</h2>
            <p className="text-xs text-slate-400">所有修改即时生效</p>
          </div>
          <div className="w-full overflow-auto rounded-xl shadow-inner bg-slate-200 p-8 flex justify-center">
            <ResumeRenderer
              data={resumeData}
              theme={selectedTheme.id}
              primaryColor={selectedTheme.primaryColor}
            />
          </div>
        </section>
      </main>

      <footer className="bg-white border-t py-8 px-6 mt-12 no-print">
        <div className="max-w-7xl mx-auto text-center text-slate-500 text-sm">
          <p>© 2024 智简简历 (AI Resume Pro). 基于 Gemini 3 多模态模型驱动.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
