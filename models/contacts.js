const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./contacts.json");

const updateContacts = async (contacts) => {
  const data = JSON.stringify(contacts, null, 3);
  await fs.writeFile(contactsPath, data);
};

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (id) => {
  const contact = await listContacts();
  const result = contact.find((item) => item.id === id);
  return result;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const oldContacts = contacts.findIndex((item) => item.id === contactId);
  if (oldContacts === -1) {
    return null;
  }
  const [removedContact] = contacts.splice(oldContacts, 1);
  await updateContacts(contacts);
  return removedContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const id = contacts.findIndex((item) => item.id === contactId);
  if (id === -1) {
    return null;
  }
  contacts[id] = { ...contacts[id], ...body };
  await updateContacts(contacts);
  return contacts[id];
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
