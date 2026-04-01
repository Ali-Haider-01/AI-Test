import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ContactDto } from './dto/contact.dto';
import { FeedbackDto } from './dto/feedback.dto';

@ApiTags('forms')
@Controller('forms')
export class FormsController {
  @Post('contact')
  contact(@Body() dto: ContactDto) {
    console.log('Contact form:', dto);
    return { success: true, message: 'Thank you! We will get back to you shortly.' };
  }

  @Post('feedback')
  feedback(@Body() dto: FeedbackDto) {
    console.log('Feedback:', dto);
    return { success: true, message: 'Thank you for your feedback!' };
  }
}
