import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';


export class ProductOutput {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  description: string;

  @Expose()
  @ApiProperty()
  price: number;

  @Expose()
  @ApiProperty()
  category: string;

  @Expose()
  @ApiProperty()
  createdAt: Date;

  @Expose()
  @ApiProperty()
  updatedAt: Date;

  // @Expose()
  // @Type(() => AuthorOutput)
  // @ApiProperty()
  // author: AuthorOutput;
}
