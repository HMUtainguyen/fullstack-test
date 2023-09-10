import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository, getConnection } from 'typeorm';

import { Product } from '../entities/product.entity';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async getById(id: number): Promise<Product> {
    const product = await this.findOne(id);
    if (!product) {
      throw new NotFoundException();
    }
    return product;
  }
  async bulkCreateWithQueryBuilder(data: Product[]): Promise<any> {
    const connection = getConnection(); // Get the TypeORM connection
    try {
      await connection
        .createQueryBuilder()
        .insert()
        .into(Product)
        .values(data)
        .execute();

      console.log('Bulk insert successful');
    } catch (error) {
      console.error('Error during bulk insert:', error);
    }
  }
}
