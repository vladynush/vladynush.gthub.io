import { DiscountRepository } from './repository';
import { ProductType, UserType } from './types';

export class AccountServiceImpl {
  constructor(private readonly repo: DiscountRepository) {}

  getTotalDiscount(userType: UserType, productType: ProductType): number {
    const global = this.repo.getGlobalDiscount(userType);
    const product = this.repo.getProductDiscount(userType, productType);
    return global + product;
  }

  setGlobalDiscount(userType: UserType, discount: number): void {
    this.repo.setGlobalDiscount(userType, discount);
  }

  setProductDiscount(userType: UserType, productType: ProductType, discount: number): void {
    this.repo.setProductDiscount(userType, productType, discount);
  }
}
