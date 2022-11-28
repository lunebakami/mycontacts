const { v4 } = require('uuid');

const db = require('../../database');

let contacts = [
  {
    id: v4(),
    name: 'Lune Bakami',
    email: 'lunebakami@gmail.com',
    phone: '123123123',
    category_id: v4(),
  },
  {
    id: v4(),
    name: 'Joyce Kelly',
    email: 'joyce@gmail.com',
    phone: '123123123',
    category_id: v4(),
  },
];

class ContactsRepository {
  async findAll() {
    return new Promise((resolve) => {
      resolve(contacts);
    });
  }

  async findById(id) {
    return new Promise((resolve) => {
      resolve(contacts.find((contact) => contact.id === id));
    });
  }

  async findByEmail(email) {
    return new Promise((resolve) => {
      resolve(contacts.find((contact) => contact.email === email));
    });
  }

  async delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id);
      resolve();
    });
  }

  async create({ name, email, phone, category_id }) {
    const [row] = await db.query(
      `
      INSERT INTO contacts(name, email, phone, category_id)
      VALUES($1, $2, $3, $4)
      RETURNING *`,
      [name, email, phone, category_id],
    );

    return row;
  }

  async update(id, { name, email, phone, category_id }) {
    return new Promise((resolve) => {
      const updatedContact = {
        id,
        name,
        email,
        phone,
        category_id,
      };

      contacts = contacts.map((contact) =>
        contact.id === id ? updatedContact : contact,
      );

      resolve(contacts);
    });
  }
}

module.exports = new ContactsRepository();
