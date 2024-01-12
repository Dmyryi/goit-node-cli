const { program } = require("commander");
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();
const contactsAction = require("./contacts.js");
const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await contactsAction.listContacts();
      console.table(contacts);
      break;

    case "get":
      const contact = await contactsAction.getContactById(id);
      console.table(contact);
      break;

    case "add":
      const contactAdd = await contactsAction.addContact(
        name,
        email,
        phone,
        id
      );
      console.table(contactAdd);
      break;

    case "remove":
      const contactRemove = await contactsAction.removeContact(id);
      console.table(contactRemove);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
