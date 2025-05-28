import { ProductType, UserType } from './types';

export interface DiscountRepository {
  getGlobalDiscount(userType: UserType): number;

  getProductDiscount(userType: UserType, productType: ProductType): number;

  setGlobalDiscount(userType: UserType, discount: number): void;

  setProductDiscount(userType: UserType, productType: ProductType, discount: number): void;
}
