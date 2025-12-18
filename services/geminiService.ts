
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { ResumeData } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async generateResumeData(
    input: string,
    templateImageBase64?: string
  ): Promise<ResumeData | null> {
    const model = 'gemini-3-pro-preview';

    const systemInstruction = `
      你是一个专业的简历优化专家。
      你的任务是解析用户提供的各种形式的求职信息（可能是散乱的文字、项目描述或现有简历片段），并将其转化为标准的 JSON 格式。
      如果提供了图片模板，请分析其排版风格，并在 summary 中体现出这种专业调性。
      
      请确保：
      1. 所有输出必须为简体中文。
      2. 严格遵守提供的 JSON Schema 格式。
      3. 对用户提供的内容进行适当的职业化润色，增强动词的使用（例如：由“做过”改为“主导”、“负责”）。
      4. 如果信息缺失，请使用合理的占位符或推断，但不要编造虚假工作经历。
    `;

    const resumeSchema = {
      type: Type.OBJECT,
      properties: {
        basics: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            email: { type: Type.STRING },
            phone: { type: Type.STRING },
            location: { type: Type.STRING },
            title: { type: Type.STRING },
            summary: { type: Type.STRING },
          },
          required: ["name", "email", "phone", "location", "title", "summary"]
        },
        education: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              school: { type: Type.STRING },
              degree: { type: Type.STRING },
              major: { type: Type.STRING },
              startDate: { type: Type.STRING },
              endDate: { type: Type.STRING },
              description: { type: Type.STRING },
            },
            required: ["school", "degree", "major", "startDate", "endDate"]
          }
        },
        experience: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              company: { type: Type.STRING },
              position: { type: Type.STRING },
              startDate: { type: Type.STRING },
              endDate: { type: Type.STRING },
              responsibilities: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
            },
            required: ["company", "position", "startDate", "endDate", "responsibilities"]
          }
        },
        projects: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              role: { type: Type.STRING },
              description: { type: Type.STRING },
              technologies: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
            },
            required: ["name", "role", "description", "technologies"]
          }
        },
        skills: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        },
        languages: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      },
      required: ["basics", "education", "experience", "projects", "skills", "languages"]
    };

    const parts: any[] = [{ text: `输入内容: ${input}` }];

    if (templateImageBase64) {
      parts.push({
        inlineData: {
          data: templateImageBase64.split(',')[1],
          mimeType: 'image/png'
        }
      });
      parts.push({ text: "请同时分析此图片简历模板的结构和专业水平，优化简历生成。" });
    }

    try {
      const response = await this.ai.models.generateContent({
        model,
        contents: { parts },
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: resumeSchema,
        }
      });

      if (response.text) {
        return JSON.parse(response.text.trim()) as ResumeData;
      }
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw error;
    }

    return null;
  }
}
