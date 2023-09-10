import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  isEnum,
} from 'class-validator';
import { SortProduct, SortingOrder } from 'src/shared/constants';
import { PaginationParamsDto } from 'src/shared/dtos/pagination-params.dto';

export class ProductSearchParamsDto extends PaginationParamsDto {
  @ApiPropertyOptional({
    description: 'Optional',
    type: String,
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiPropertyOptional({
    description: 'Optional',
    type: String,
  })
  @IsString()
  @IsOptional()
  category: string;

  @ApiPropertyOptional({
    description: 'Optional',
    type: String,
  })
  @IsString()
  @IsOptional()
  @IsEnum(SortProduct, {
    message: 'sort must be one of name,category,id,price ',
  })
  sort: SortProduct;

  @ApiPropertyOptional({
    description: 'sortOrder (ASC,DESC)',
    type: SortingOrder,
  })
  // @IsString()
  @IsOptional()
  @IsEnum(SortingOrder, {
    message: 'sortOrder must be one of ASC or DESC',
  })
  sortOrder: SortingOrder;
}
