import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------
const ids = [
  '123456',
  '234567',
  '345678',
  '456789',
  '567890',
  '678901',
  '789012',
  '890123',
  '901234',
  '012345',
  '098765',
  '987654',
  '876543',
  '765432',
  '654321',
  '543210',
  '432109',
  '321098',
  '210987',
  '109876',
  '901876',
  '876901',
  '678109',
  '321098',
];

export const users = [...Array(24)].map((_, index) => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  return {
    id: ids[index + 1],
    avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
    name: `${firstName} ${lastName}`,
    firstName,
    lastName,
    company: faker.company.name(),
    isVerified: faker.datatype.boolean(),
    status: sample(['active', 'banned']),
    username: faker.internet.userName({ firstName, lastName }),
    tel: faker.phone.imei(),
    email: faker.internet.email({ firstName, lastName }),
    address: faker.location.direction(),
    password: faker.internet.password(),
  };
});
