import { Injectable, Inject } from '@nestjs/common';
import { PRODUCT_REPOSITORY } from './constants';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { ProductDto } from './product.dto';

@Injectable()
export class AppService {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getList(): Promise<Array<Product>> {
    return this.productRepository.find();
  }

  async getOne(id: number): Promise<Product> {
    return this.productRepository.findOne(id);
  }

  async createProduct(item: ProductDto): Promise<Product> {
    const product = new Product();
    product.country = item.country;
    product.height = item.height;
    product.length = item.length;
    product.price = item.price;
    product.producer = item.producer;
    product.title = item.title;
    product.width = item.width;

    const entity = this.productRepository.create(product);
    await this.productRepository.save(entity);
    return entity;
  }

  async editProduct(id: number, item: ProductDto): Promise<Product> {
    const product = new Product();
    product.id = id;
    product.country = item.country;
    product.height = item.height;
    product.length = item.length;
    product.price = item.price;
    product.producer = item.producer;
    product.title = item.title;
    product.width = item.width;

    await this.productRepository.update(id, product);
    return this.getOne(id);
  }

  async deleteProduct(id: number): Promise<number> {
    const result = await this.productRepository.delete(id);
    return result.affected;
  }
}
