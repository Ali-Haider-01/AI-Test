import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { AuthModule } from '../auth/auth.module';
import { ChatSession, ChatSessionSchema } from '../chat/schemas/chat-session.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: ChatSession.name, schema: ChatSessionSchema }]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
