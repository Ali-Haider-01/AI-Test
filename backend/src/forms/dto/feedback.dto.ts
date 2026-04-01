import { IsNumber, IsString, IsOptional, Min, Max } from 'class-validator';
export class FeedbackDto {
  @IsNumber() @Min(1) @Max(5) rating: number;
  @IsString() @IsOptional() comment?: string;
  @IsString() @IsOptional() userId?: string;
}
