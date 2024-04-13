import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CourtDto {
  @ApiProperty({
    description: 'Court n°',
    example: 1,
    required: true,
  })
  number: number;
}

export class CreateCourtDto {
  @ApiProperty({
    description: 'Court n°',
    example: 1,
    required: true,
  })
  number: number;
}

export class UpdateCourtDto extends PartialType(CreateCourtDto) {}
