class LocalStorageUtilities {
  addContactToLocalStorage = (key, contact) => {
    const data = localStorage.getItem(key);
    if (data == null) {
      localStorage.setItem(
        key,
        JSON.stringify([
          {
            id: 1,
            ...contact,
          },
        ])
      );
    } else {
      const newId = JSON.parse(data).length;
      localStorage.setItem(
        key,
        JSON.stringify([
          ...JSON.parse(data),
          {
            id: newId,
            ...contact,
          },
        ])
      );
    }
  };

  removeContactFromLocalStorage = (key, id) => {
    const data = localStorage.getItem(key);

    if (data == null) {
      throw new Error("Id not found!");
    } else {
      const contactsAfterDeletion = JSON.parse(data).filter(
        (contact) => contact.id !== Number(id)
      );
      localStorage.setItem(key, JSON.stringify(contactsAfterDeletion));
    }
  };

  getContactsFromLocalStorage = (key) => {
    const data = localStorage.getItem(key);
    if (data == null) {
      return [];
    }

    return JSON.parse(data);
  };

  getContactByIdFromLocalStorage = (key, id) => {
    const data = localStorage.getItem(key);
    if (data == null) {
      throw new Error("Contact not found!");
    }

    const filteredContact = JSON.parse(data).filter(
      (contact) => contact.id === Number(id)
    );

    if (filteredContact.length > 0) {
      return filteredContact[0];
    } else {
      throw new Error("Contact not found!");
    }
  };

  updateContactFromLocalStorage = (key, id, contact) => {
    const data = localStorage.getItem(key);
    console.log({ contact });
    if (data == null) {
      throw new Error("Id not found!");
    }
    const updatedArray = JSON.parse(data).map((oldContact) =>
      oldContact.id === Number(id)
        ? {
            id: Number(id),
            ...contact,
          }
        : oldContact
    );
    localStorage.setItem(key, JSON.stringify(updatedArray));
    return;
  };
}

export default new LocalStorageUtilities();
