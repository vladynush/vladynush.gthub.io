import { AccountServiceImpl } from './accountServiceImpl';
import { DiscountRepository } from './repository';

describe('AccountServiceImpl (jest mocks)', () => {
  let mockRepo: jest.Mocked<DiscountRepository>;
  let service: AccountServiceImpl;

  beforeEach(() => {
    mockRepo = {
      getGlobalDiscount: jest.fn(),
      getProductDiscount: jest.fn(),
      setGlobalDiscount: jest.fn(),
      setProductDiscount: jest.fn(),
    };
    service = new AccountServiceImpl(mockRepo);
  });

  it('суммирует глобальную и товарную скидку', () => {
    mockRepo.getGlobalDiscount.mockReturnValue(10);
    mockRepo.getProductDiscount.mockReturnValue(5);

    const result = service.getTotalDiscount('Premium', 'Car');
    expect(result).toBe(15);
    expect(mockRepo.getGlobalDiscount).toHaveBeenCalledWith('Premium');
    expect(mockRepo.getProductDiscount).toHaveBeenCalledWith('Premium', 'Car');
  });

  it('возвращает только глобальную скидку при отсутствии скидки на товар', () => {
    mockRepo.getGlobalDiscount.mockReturnValue(8);
    mockRepo.getProductDiscount.mockReturnValue(0);

    const result = service.getTotalDiscount('Free', 'Food');
    expect(result).toBe(8);
  });

  it('возвращает только скидку на товар при отсутствии глобальной', () => {
    mockRepo.getGlobalDiscount.mockReturnValue(0);
    mockRepo.getProductDiscount.mockReturnValue(12);

    const result = service.getTotalDiscount('Gold', 'Toy');
    expect(result).toBe(12);
  });

  it('возвращает 0 если скидки не заданы', () => {
    mockRepo.getGlobalDiscount.mockReturnValue(0);
    mockRepo.getProductDiscount.mockReturnValue(0);

    expect(service.getTotalDiscount('Standard', 'Car')).toBe(0);
  });

  it('вызывает метод установки глобальной скидки', () => {
    service.setGlobalDiscount('Premium', 20);
    expect(mockRepo.setGlobalDiscount).toHaveBeenCalledWith('Premium', 20);
  });

  it('вызывает метод установки скидки на товар', () => {
    service.setProductDiscount('Gold', 'Food', 15);
    expect(mockRepo.setProductDiscount).toHaveBeenCalledWith('Gold', 'Food', 15);
  });

  it('обрабатывает ошибку при получении глобальной скидки', () => {
    mockRepo.getGlobalDiscount.mockImplementation(() => {
      throw new Error('DB error');
    });
    mockRepo.getProductDiscount.mockReturnValue(5);

    expect(() => service.getTotalDiscount('Premium', 'Car')).toThrow('DB error');
  });

  it('обрабатывает ошибку при получении скидки на товар', () => {
    mockRepo.getGlobalDiscount.mockReturnValue(10);
    mockRepo.getProductDiscount.mockImplementation(() => {
      throw new Error('Product discount fetch failed');
    });

    expect(() => service.getTotalDiscount('Gold', 'Toy')).toThrow('Product discount fetch failed');
  });

  it('обрабатывает ошибку при установке глобальной скидки', () => {
    mockRepo.setGlobalDiscount.mockImplementation(() => {
      throw new Error('Cannot write global discount');
    });

    expect(() => service.setGlobalDiscount('Standard', 10)).toThrow('Cannot write global discount');
  });

  it('обрабатывает ошибку при установке скидки на товар', () => {
    mockRepo.setProductDiscount.mockImplementation(() => {
      throw new Error('Write failure');
    });

    expect(() => service.setProductDiscount('Free', 'Toy', 10)).toThrow('Write failure');
  });
});
