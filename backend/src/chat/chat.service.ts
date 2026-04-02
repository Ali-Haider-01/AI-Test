import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { ChatSession, ChatSessionDocument } from './schemas/chat-session.schema';
import { SendMessageDto } from './dto/send-message.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(ChatSession.name) private sessionModel: Model<ChatSessionDocument>,
  ) {}

  async sendMessage(dto: SendMessageDto, userId?: string) {
    const sessionId = dto.sessionId || uuidv4();
    let session = await this.sessionModel.findOne({ sessionId });
    if (!session) {
      const expiresAt = dto.isGuest ? new Date(Date.now() + 3 * 60 * 60 * 1000) : undefined;
      session = await this.sessionModel.create({
        sessionId,
        modelId: dto.modelId,
        userId,
        isGuest: dto.isGuest || !userId,
        title: dto.message.slice(0, 60),
        messages: [],
        expiresAt,
      });
    } else if (userId && !session.userId) {
      session.userId = userId;
      session.isGuest = false;
    }

    session.messages.push({ role: 'user', content: dto.message, timestamp: new Date() });
    const aiResponse = await this.callAI(dto.message, dto.modelId);
    session.messages.push({ role: 'assistant', content: aiResponse, timestamp: new Date() });
    await session.save();
    return { response: aiResponse, sessionId, modelId: dto.modelId };
  }

  private async callAI(message: string, modelId: string): Promise<string> {
    const kimiKey = process.env.KIMI_API_KEY;
    if (kimiKey) {
      try {
        // Map NexusAI model IDs to Moonshot model slugs.
        // Extend this map as more provider keys are added.
        const MOONSHOT_MODELS: Record<string, string> = {
          'moonshot-v1-8k': 'moonshot-v1-8k',
          'moonshot-v1-32k': 'moonshot-v1-32k',
          'moonshot-v1-128k': 'moonshot-v1-128k',
        };
        const moonshotModel = MOONSHOT_MODELS[modelId] ?? 'moonshot-v1-8k';
        const res = await fetch('https://api.moonshot.cn/v1/chat/completions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${kimiKey}` },
          body: JSON.stringify({ model: moonshotModel, messages: [{ role: 'user', content: message }] }),
        });
        const data = await res.json() as any;
        return data.choices?.[0]?.message?.content || this.mockResponse(message, modelId);
      } catch { return this.mockResponse(message, modelId); }
    }
    return this.mockResponse(message, modelId);
  }

  private mockResponse(message: string, modelId: string): string {
    const preview = message.length > 80 ? message.slice(0, 80) + '...' : message;
    return `Hello! I'm **${modelId}** (demo mode). I received your message: "${preview}"\n\nIn production, this connects to the real AI provider. NexusAI supports 400+ models — explore the Marketplace to discover more. How can I help you today?`;
  }

  async getHistory(userId: string) {
    const sessions = await this.sessionModel.find({ userId, isGuest: false })
      .sort({ updatedAt: -1 }).limit(50).lean();

    return sessions.map((session) => {
      const latestMessage = session.messages?.length ? session.messages[session.messages.length - 1] : null;
      const createdAt = (session as any).createdAt as Date | undefined;
      const updatedAt = (session as any).updatedAt as Date | undefined;
      return {
        id: session._id,
        sessionId: session.sessionId,
        model: session.modelId,
        preview: latestMessage ? latestMessage.content.slice(0, 80) : session.title || 'New conversation',
        date: updatedAt ? updatedAt.toISOString() : createdAt?.toISOString(),
        messages: session.messages?.length ?? 0,
      };
    });
  }

  async getSession(sessionId: string) {
    return this.sessionModel.findOne({ sessionId }).lean();
  }

  async deleteSession(sessionId: string, userId: string) {
    return this.sessionModel.deleteOne({ sessionId, userId });
  }
}
