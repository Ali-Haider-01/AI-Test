import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatSession, ChatSessionDocument } from '../chat/schemas/chat-session.schema';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(ChatSession.name)
    private readonly sessionModel: Model<ChatSessionDocument>,
  ) {}

  async getStats(userId: string) {
    const sessions = await this.sessionModel
      .find({ userId, isGuest: false })
      .lean();

    const totalChats = sessions.length;
    const modelsUsed = new Set(sessions.map((s) => s.modelId)).size;
    const apiCalls = sessions.reduce((sum, s) => sum + s.messages.length, 0);
    // Cost is estimated at $0.005 per message (placeholder until real billing)
    const costThisMonth = parseFloat((apiCalls * 0.005).toFixed(2));

    return {
      userId,
      totalChats,
      modelsUsed,
      apiCalls,
      costThisMonth,
      period: new Date().toISOString().slice(0, 7),
    };
  }

  async getActivity(userId: string) {
    const sessions = await this.sessionModel
      .find({ userId, isGuest: false })
      .sort({ updatedAt: -1 })
      .limit(10)
      .lean();

    return sessions.map((s) => ({
      id: s._id.toString(),
      model: s.modelId,
      preview: s.messages[0]?.content?.slice(0, 80) || 'No messages yet',
      date: (s as any).updatedAt?.toISOString() ?? new Date().toISOString(),
      messages: s.messages.length,
    }));
  }
}
