import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import {
  BaseApiErrorResponse,
  BaseApiResponse,
  SwaggerBaseApiResponse,
} from '../../shared/dtos/base-api-response.dto';
import { PaginationParamsDto } from '../../shared/dtos/pagination-params.dto';
import { AppLogger } from '../../shared/logger/logger.service';
import { ReqContext } from '../../shared/request-context/req-context.decorator';
import { RequestContext } from '../../shared/request-context/request-context.dto';
import {
  CreateProductInput,
  UpdateProductInput,
} from '../dtos/product-input.dto';
import { ProductOutput } from '../dtos/product-output.dto';
import { ProductService } from '../services/product.service';
import { ProductSearchParamsDto } from '../dtos/product-search-dto';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(
    private readonly ProductService: ProductService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(ProductController.name);
  }

  @Post()
  @ApiOperation({
    summary: 'Create Product API',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: SwaggerBaseApiResponse(ProductOutput),
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async createProduct(
    @ReqContext() ctx: RequestContext,
    @Body() input: CreateProductInput,
  ): Promise<BaseApiResponse<ProductOutput>> {
    const Product = await this.ProductService.createProduct(ctx, input);
    return { data: Product, meta: {} };
  }

  @Get()
  @ApiOperation({
    summary: 'Get Products as a list API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse([ProductOutput]),
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getProducts(
    @ReqContext() ctx: RequestContext,
    @Query() query: ProductSearchParamsDto,
  ): Promise<BaseApiResponse<ProductOutput[]>> {
    this.logger.log(ctx, `${this.getProducts.name} was called`);
    const { Products, count } = await this.ProductService.getProducts(
      ctx,
      query
    );

    return { data: Products, meta: { count } };
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get Product by id API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(ProductOutput),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  async getProduct(
    @ReqContext() ctx: RequestContext,
    @Param('id') id: number,
  ): Promise<BaseApiResponse<ProductOutput>> {
    this.logger.log(ctx, `${this.getProduct.name} was called`);

    const Product = await this.ProductService.getProductById(ctx, id);
    return { data: Product, meta: {} };
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update Product API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(ProductOutput),
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async updateProduct(
    @ReqContext() ctx: RequestContext,
    @Param('id') ProductId: number,
    @Body() input: UpdateProductInput,
  ): Promise<BaseApiResponse<ProductOutput>> {
    const Product = await this.ProductService.updateProduct(
      ctx,
      ProductId,
      input,
    );
    return { data: Product, meta: {} };
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete Product by id API',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  async deleteProduct(
    @ReqContext() ctx: RequestContext,
    @Param('id') id: number,
  ): Promise<void> {
    this.logger.log(ctx, `${this.deleteProduct.name} was called`);

    return this.ProductService.deleteProduct(ctx, id);
  }
}
