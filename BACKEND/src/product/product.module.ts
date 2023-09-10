import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtAuthStrategy } from '../auth/strategies/jwt-auth.strategy';
import { SharedModule } from '../shared/shared.module';
import { UserModule } from '../user/user.module';
import { ProductController } from './controllers/product.controller';
import { ProductRepository } from './repositories/product.repository';
import { ProductService } from './services/product.service';
import { ProductAclService } from './services/product-acl.service';

@Module({
  imports: [
    SharedModule,
    TypeOrmModule.forFeature([ProductRepository]),
    UserModule,
  ],
  providers: [ProductService, JwtAuthStrategy, ProductAclService],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
