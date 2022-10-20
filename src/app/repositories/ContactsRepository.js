const { uuid } = require('uuidv4');

const contacts = [
  {
    id: uuid(),
    name: 'Lune Bakami',
    email: 'lunebakami@gmail.com',
    phone: '123123123',
    category_id: uuid(),
  },
];

class ContactsRepository {
  async findAll() {
    return new Promise((resolve) => {
      resolve(contacts);
    });
  }
}

module.exports = new ContactsRepository();
