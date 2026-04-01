import { Controller, Post, Get, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { SendMessageDto } from './dto/send-message.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService, private jwtService: JwtService) {}

  @Post('send')
  async sendMessage(@Body() dto: SendMessageDto, @Request() req: any) {
    let userId = req.user?.userId;

    const authHeader = req.headers?.authorization;
    if (!userId && authHeader?.startsWith('Bearer ')) {
      const token = authHeader.replace('Bearer ', '').trim();
      try {
        const payload = this.jwtService.verify(token);
        userId = payload.sub as string;
      } catch {
        userId = undefined;
      }
    }

    return this.chatService.sendMessage(dto, userId);
  }

  @Get('history')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getHistory(@Request() req: any) {
    return this.chatService.getHistory(req.user.userId);
  }

  @Get('session/:id')
  getSession(@Param('id') id: string) {
    return this.chatService.getSession(id);
  }

  @Delete('session/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  deleteSession(@Param('id') id: string, @Request() req: any) {
    return this.chatService.deleteSession(id, req.user.userId);
  }
}
