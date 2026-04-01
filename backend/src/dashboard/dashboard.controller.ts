import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('dashboard')
@Controller('dashboard')
export class DashboardController {
  @Get('stats')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getStats(@Request() req: any) {
    return {
      userId: req.user.userId,
      totalChats: 24, modelsUsed: 7, apiCalls: 156, costThisMonth: 0.84,
      period: new Date().toISOString().slice(0, 7),
    };
  }

  @Get('activity')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getActivity(@Request() req: any) {
    return [
      { id: '1', model: 'GPT-5', preview: 'Help me debug this TypeScript error...', date: new Date().toISOString(), messages: 12 },
      { id: '2', model: 'Claude Sonnet 4.6', preview: 'Write a blog post about AI trends...', date: new Date(Date.now() - 86400000).toISOString(), messages: 8 },
      { id: '3', model: 'Gemini 2.5 Pro', preview: 'Analyze this dataset...', date: new Date(Date.now() - 172800000).toISOString(), messages: 5 },
    ];
  }
}
