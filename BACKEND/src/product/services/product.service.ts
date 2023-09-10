import {
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { faker } from '@faker-js/faker';

import { Action } from '../../shared/acl/action.constant';
import { Actor } from '../../shared/acl/actor.constant';
import { AppLogger } from '../../shared/logger/logger.service';
import { RequestContext } from '../../shared/request-context/request-context.dto';
import { UserService } from '../../user/services/user.service';
import {
  CreateProductInput,
  UpdateProductInput,
} from '../dtos/product-input.dto';
import { ProductOutput } from '../dtos/product-output.dto';
import { Product } from '../entities/product.entity';
import { ProductRepository } from '../repositories/product.repository';
import { ProductAclService } from './product-acl.service';
import { ProductSearchParamsDto } from '../dtos/product-search-dto';
import { Like } from 'typeorm';

@Injectable()
export class ProductService implements OnModuleInit {
  constructor(
    private repository: ProductRepository,
    private userService: UserService,
    private aclService: ProductAclService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(ProductService.name);
  }

  async onModuleInit() {
    const productInfo = await this.repository.findOne();
    if (!productInfo) {
      console.log('init fake product');
      let arr = [];
      for (let i = 0; i < 100000; i++) {
        arr.push({
          name: faker.commerce.productName(),
          price: faker.number.int(100),
          description: faker.commerce.productDescription(),
          category: faker.lorem.word(),
        });
      }

      await this.repository.bulkCreateWithQueryBuilder(arr);
    }
  }

  async createProduct(
    ctx: RequestContext,
    input: CreateProductInput,
  ): Promise<ProductOutput> {
    this.logger.log(ctx, `${this.createProduct.name} was called`);

    const product = plainToClass(Product, input);

    this.logger.log(ctx, `calling ${ProductRepository.name}.save`);
    const savedProduct = await this.repository.save(product);

    return plainToClass(ProductOutput, savedProduct, {
      excludeExtraneousValues: true,
    });
  }

  async getProducts(
    ctx: RequestContext,
    query: ProductSearchParamsDto,
  ): Promise<{ Products: ProductOutput[]; count: number }> {
    this.logger.log(ctx, `${this.getProducts.name} was called`);
    this.logger.log(ctx, `calling ${ProductRepository.name}.findAndCount`);
    const whereCause: any = {};
    const orderCause: any = {};
    query?.sort && query?.sortOrder
      ? (orderCause[query?.sort] = query?.sortOrder)
      : null;
    query.name ? (whereCause.name = Like(`%${query.name}%`)) : null;
    query.category ? (whereCause.category = Like(`%${query.category}%`)) : null;
    const [Products, count] = await this.repository.findAndCount({
      where: whereCause,
      take: query.limit,
      skip: query.offset,
      order: orderCause,
    });

    const ProductsOutput = plainToClass(ProductOutput, Products, {
      excludeExtraneousValues: true,
    });

    return { Products: ProductsOutput, count };
  }

  async getProductById(
    ctx: RequestContext,
    id: number,
  ): Promise<ProductOutput> {
    this.logger.log(ctx, `${this.getProductById.name} was called`);

    const actor: Actor = ctx.user;

    this.logger.log(ctx, `calling ${ProductRepository.name}.getById`);
    const Product = await this.repository.getById(id);

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Read, Product);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    return plainToClass(ProductOutput, Product, {
      excludeExtraneousValues: true,
    });
  }

  async updateProduct(
    ctx: RequestContext,
    ProductId: number,
    input: UpdateProductInput,
  ): Promise<ProductOutput> {
    this.logger.log(ctx, `${this.updateProduct.name} was called`);

    this.logger.log(ctx, `calling ${ProductRepository.name}.getById`);
    const product = await this.repository.getById(ProductId);

    const actor: Actor = ctx.user;

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Update, Product);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    const updatedProduct: Product = {
      ...product,
      ...plainToClass(Product, input),
    };

    this.logger.log(ctx, `calling ${ProductRepository.name}.save`);
    const savedProduct = await this.repository.save(updatedProduct);

    return plainToClass(ProductOutput, savedProduct, {
      excludeExtraneousValues: true,
    });
  }

  async deleteProduct(ctx: RequestContext, id: number): Promise<void> {
    this.logger.log(ctx, `${this.deleteProduct.name} was called`);

    this.logger.log(ctx, `calling ${ProductRepository.name}.getById`);
    const Product = await this.repository.getById(id);

    const actor: Actor = ctx.user;

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Delete, Product);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    this.logger.log(ctx, `calling ${ProductRepository.name}.remove`);
    await this.repository.remove(Product);
  }
}
