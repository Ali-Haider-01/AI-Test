import { IsString, IsOptional, IsBoolean } from 'class-validator';
export class SendMessageDto {
  @IsString() message: string;
  @IsString() modelId: string;
  @IsString() @IsOptional() sessionId?: string;
  @IsBoolean() @IsOptional() isGuest?: boolean;
}
