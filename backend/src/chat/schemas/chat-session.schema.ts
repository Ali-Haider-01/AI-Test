import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type ChatSessionDocument = ChatSession & Document;

@Schema({ timestamps: true })
export class ChatSession {
  @Prop() userId?: string;
  @Prop({ required: true }) sessionId: string;
  @Prop({ required: true, default: 'gpt5' }) modelId: string;
  @Prop() title?: string;
  @Prop({ type: [{ role: String, content: String, timestamp: Date }], default: [] }) messages: { role: string; content: string; timestamp: Date }[];
  @Prop({ default: false }) isGuest: boolean;
  @Prop() expiresAt?: Date;
}
export const ChatSessionSchema = SchemaFactory.createForClass(ChatSession);
