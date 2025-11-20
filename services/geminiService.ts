import { GoogleGenAI, Type } from "@google/genai";
import { AppMode } from "../types";

const getAi = () => {
  // Handle cases where API_KEY might not be set in development
  const key = process.env.API_KEY || '';
  return new GoogleGenAI({ apiKey: key });
};

export const analyzePoopHealth = async (
  bristolType: number,
  color: string,
  duration: number,
  notes: string
): Promise<string> => {
  const ai = getAi();
  try {
    const prompt = `
      我刚刚完成了一次排便，请作为一位幽默但专业的肠胃健康助手，为我提供简短的健康分析和建议。
      数据如下:
      - 布里斯托大便分类法: 第 ${bristolType} 型
      - 颜色: ${color}
      - 耗时: ${duration} 秒
      - 备注/饮食: ${notes || '无'}

      请用轻松幽默的口吻（中文）回复，不要太枯燥，不超过100字。
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.7,
      }
    });

    return response.text || "暂时无法连接到智能分析助手，请多喝水！";
  } catch (error) {
    console.error("AI Analysis Error:", error);
    return "分析服务太忙了（可能也在上厕所），请稍后再试！";
  }
};

export const generateEntertainment = async (mode: AppMode): Promise<string> => {
  const ai = getAi();
  let prompt = "";
  
  switch (mode) {
    case AppMode.STUDENT:
      prompt = "给我讲一个关于历史、科学或文学的冷知识，非常简短有趣，适合在这一分钟内读完。中文。";
      break;
    case AppMode.WORK:
      prompt = "给我一句职场生存毒鸡汤或者非常有用的效率提升小技巧，简短有力。中文。";
      break;
    case AppMode.HOME:
      prompt = "给我讲一个非常简短的冷笑话，或者生活小妙招。中文。";
      break;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "暂无内容";
  } catch (e) {
    return "加载失败，请专心拉屎。";
  }
};

export const chatWithCompanion = async (message: string, history: string[]): Promise<string> => {
    const ai = getAi();
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `
          你现在扮演一个在隔壁坑位的陌生人，我们正在通过厕所隔板聊天。
          你的性格有点八卦，幽默，有时候会说一些富有哲理的废话。
          历史对话: ${history.join('\n')}
          我说: ${message}
          请简短回复（中文）：
        `
      });
      return response.text || "...";
    } catch (e) {
      return "隔壁没人回应...";
    }
}
