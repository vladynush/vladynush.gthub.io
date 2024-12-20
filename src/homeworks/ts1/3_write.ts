/**
 * Функции написанные здесь пригодятся на последующих уроках
 * С помощью этих функций мы будем добавлять элементы в список для проверки динамической загрузки
 * Поэтому в идеале чтобы функции возвращали случайные данные, но в то же время не абракадабру.
 * В целом сделайте так, как вам будет удобно.
 * */

/**
 * Нужно создать тип Category, он будет использоваться ниже.
 * Категория содержит
 * - id (строка)
 * - name (строка)
 * - photo (строка, необязательно)
 * */
type Category = {
  id: string;
  name: string;
  photo?: string;
};

const categoryNames = [
  'Electronics',
  'Books',
  'Fashion',
  'Home & Kitchen',
  'Beauty',
  'Sports',
  'Toys',
  'Automotive',
  'Music',
  'Garden',
];

const productNames = [
  'Wireless Earbuds',
  'Stainless Steel Water Bottle',
  'Cotton T-Shirt',
  'Bluetooth Speaker',
  'Ceramic Coffee Mug',
  'Hardcover Journal',
  'LED Desk Lamp',
  'Noise-Cancelling Headphones',
  'Travel Backpack',
  'Yoga Mat',
];

/**
 * Продукт (Product) содержит
 * - id (строка)
 * - name (строка)
 * - photo (строка)
 * - desc (строка, необязательно)
 * - createdAt (строка)
 * - oldPrice (число, необязательно)
 * - price (число)
 * - category (Категория)
 * */

type Product = {
  id: string;
  name: string;
  photo: string;
  desc?: string;
  createdAt: string;
  oldPrice?: number;
  price: number;
  category: Category;
};

/**
 *
 * Операция (Operation) может быть либо тратой (Cost), либо доходом (Profit)
 *
 * Трата (Cost) содержит
 * - id (строка)
 * - name (строка)
 * - desc (строка, необязательно)
 * - createdAt (строка)
 * - amount (число)
 * - category (Категория)
 * - type ('Cost')
 *
 * Доход (Profit) содержит
 * - id (строка)
 * - name (строка)
 * - desc (строка, необязательно)
 * - createdAt (строка)
 * - amount (число)
 * - category (Категория)
 * - type ('Profit')
 * */

type Cost = {
  id: string;
  name: string;
  desc?: string;
  createdAt: string;
  amount: number;
  category: Category;
  type: 'Cost';
};

type Profit = {
  id: string;
  name: string;
  desc?: string;
  createdAt: string;
  amount: number;
  category: Category;
  type: 'Profit';
};

type Operation = Cost | Profit;

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Создает случайный продукт (Product).
 * Принимает дату создания (строка)
 * */
export const createRandomProduct = (createdAt: string) => {
  const randomId = () => Math.random().toString(36);

  const categoryName = getRandomItem(categoryNames);
  const category: Category = {
    id: `cat_${randomId()}`,
    name: categoryName,
    photo:
      Math.random() > 0.5 ? `https://example.com/${categoryName.toLowerCase().replace(/\s+/g, '_')}.jpg` : undefined,
  };

  const productName = getRandomItem(productNames);
  const product: Product = {
    id: `prod_${randomId()}`,
    name: productName,
    photo: `https://example.com/${productName.toLowerCase().replace(/\s+/g, '_')}.jpg`,
    desc: Math.random() > 0.5 ? `Описание продукта: ${productName}. Качественный товар по разумной цене.` : undefined,
    createdAt,
    oldPrice: Math.random() > 0.5 ? +(Math.random() * 100).toFixed(2) : undefined,
    price: +(Math.random() * 100).toFixed(2),
    category,
  };

  return product;
};

const costOperationNames = [
  'Supermarket Shopping',
  'Restaurant Visit',
  'Electricity Bill',
  'Movie Tickets',
  'Gym Subscription',
  'Medication Purchase',
  'Taxi Ride',
  'Online Streaming Subscription',
];

const profitOperationNames = [
  'Monthly Salary',
  'Project Freelance Payment',
  'Stock Dividends',
  'Selling Old Stuff',
  'Cashback Reward',
  'Gift from Friend',
];

function randomId(): string {
  return Math.random().toString(36);
}

/**
 * Создает случайную операцию (Operation).
 * Принимает дату создания (строка)
 * */
export const createRandomOperation = (createdAt: string) => {
  const categoryName = getRandomItem(categoryNames);
  const category: Category = {
    id: `cat_${randomId()}`,
    name: categoryName,
    photo:
      Math.random() > 0.5 ? `https://example.com/${categoryName.toLowerCase().replace(/\s+/g, '_')}.jpg` : undefined,
  };

  const isCost = Math.random() > 0.5;

  if (isCost) {
    const name = getRandomItem(costOperationNames);
    const costOperation: Cost = {
      id: `op_${randomId()}`,
      name,
      desc: Math.random() > 0.5 ? `Описание: ${name}.` : undefined,
      createdAt,
      amount: +(Math.random() * 200).toFixed(2),
      category,
      type: 'Cost',
    };
    return costOperation;
  } else {
    const name = getRandomItem(profitOperationNames);
    const profitOperation: Profit = {
      id: `op_${randomId()}`,
      name,
      desc: Math.random() > 0.5 ? `Описание: ${name}.` : undefined,
      createdAt,
      amount: +(Math.random() * 1000).toFixed(2),
      category,
      type: 'Profit',
    };
    return profitOperation;
  }
};
