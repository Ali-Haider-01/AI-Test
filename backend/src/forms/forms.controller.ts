import { Controller, Post, Body, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ContactDto } from './dto/contact.dto';
import { FeedbackDto } from './dto/feedback.dto';

@ApiTags('forms')
@Controller('forms')
export class FormsController {
  private readonly logger = new Logger(FormsController.name);

  @Post('contact')
  contact(@Body() dto: ContactDto) {
    // TODO: persist to DB or send via email service (e.g. SendGrid)
    this.logger.log(`Contact submission from ${dto.email}: ${dto.subject ?? '(no subject)'}`);
    return { success: true, message: 'Thank you! We will get back to you shortly.' };
  }

  @Post('feedback')
  feedback(@Body() dto: FeedbackDto) {
    // TODO: persist to DB for analytics
    this.logger.log(`Feedback rating=${dto.rating} userId=${dto.userId ?? 'anonymous'}`);
    return { success: true, message: 'Thank you for your feedback!' };
  }
}
