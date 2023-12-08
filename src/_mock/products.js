import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const PRODUCT_NAME = [
  'Nike Air Force 1 NDESTRUKT',
  'Nike Space Hippie 04',
  'Nike Air Zoom Pegasus 37 A.I.R. Chaz Bear',
  'Nike Blazer Low 77 Vintage',
  'Nike ZoomX SuperRep Surge',
  'Zoom Freak 2',
  'Nike Air Max Zephyr',
  'Jordan Delta',
  'Air Jordan XXXV PF',
  'Nike Waffle Racer Crater',
  'Kyrie 7 EP Sisterhood',
  'Nike Air Zoom BB NXT',
  'Nike Air Force 1 07 LX',
  'Nike Air Force 1 Shadow SE',
  'Nike Air Zoom Tempo NEXT%',
  'Nike DBreak-Type',
  'Nike Air Max Up',
  'Nike Air Max 270 React ENG',
  'NikeCourt Royale',
  'Nike Air Zoom Pegasus 37 Premium',
  'Nike Air Zoom SuperRep',
  'NikeCourt Royale',
  'Nike React Art3mis',
  'Nike React Infinity Run Flyknit A.I.R. Chaz Bear',
];
const PRODUCT_COLOR = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107',
];

const id = [
  'ABC123',
  'DEF456',
  'GHI789',
  'JKL012',
  'MNO345',
  'PQR678',
  'STU901',
  'VWX234',
  'YZA567',
  'BCD890',
  'EFG123',
  'HIJ456',
  'KLM789',
  'NOP012',
  'QRS345',
  'TUV678',
  'WXY901',
  'ZAB234',
  'CDE567',
  'FGH890',
  'IJK123',
  'LMN456',
  'OPQ789',
  'RST012',
];

// ----------------------------------------------------------------------
// {
//   name: '',
//   description: '',
//   category: '',
//   price: '',
//   files: [''],
//   properties: [
//     {
//       property: '',
//       values: [''],
//     },
//   ],
// }
export const products = [...Array(24)].map((_, index) => {
  const setIndex = index + 1;
  return {
    id: id[index],
    cover: `/assets/images/products/product_${setIndex}.jpg`,
    name: PRODUCT_NAME[index],
    description: faker.commerce.productDescription(),
    category: sample(['Men', 'Women', 'Accessories', 'Beauty']),
    properties: [
      {
        property: 'Color',
        values: [{ value: 'Black' }, { value: 'Blue' }, { value: 'Yellow' }, { value: 'White' }],
      },
      {
        property: 'Size',
        values: [{ value: 'XL' }, { value: 'X' }, { value: 'L' }, { value: 'XXL' }],
      },
    ],
    price: faker.number.int({ min: 4, max: 99, precision: 0.01 }),
    priceSale: setIndex % 3 ? null : faker.number.int({ min: 19, max: 29, precision: 0.01 }),
    colors:
      (setIndex === 1 && PRODUCT_COLOR.slice(0, 2)) ||
      (setIndex === 2 && PRODUCT_COLOR.slice(1, 3)) ||
      (setIndex === 3 && PRODUCT_COLOR.slice(2, 4)) ||
      (setIndex === 4 && PRODUCT_COLOR.slice(3, 6)) ||
      (setIndex === 23 && PRODUCT_COLOR.slice(4, 6)) ||
      (setIndex === 24 && PRODUCT_COLOR.slice(5, 6)) ||
      PRODUCT_COLOR,
    status: sample(['sale', 'new', '', '']),
  };
});
