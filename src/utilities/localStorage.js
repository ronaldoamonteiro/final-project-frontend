class LocalStorageUtilities {
  // Função que permite adicionar um contato ao localStorage
  addContactToLocalStorage = (key, contact) => {
    // Busca pela chave passada como parâmetro
    const data = localStorage.getItem(key);
    // Caso não encontre informação no localStorage, cria um array com o contato passado como parâmetro.
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
      // Caso contrário, adiciona o contato ao final do array, incrementando o seu id
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
  // Remove um contato do localStoragge
  removeContactFromLocalStorage = (key, id) => {
    // Busca pelos dados armazenados na chave do localStorage, caso exista
    const data = localStorage.getItem(key);
    // Se não houver dados, lança um erro de que o id não pôde ser encontrado
    if (data == null) {
      throw new Error("Contact not found!");
    } else {
      // Cria um array sem o contato com o id passado como parâmetro
      const contactsAfterDeletion = JSON.parse(data).filter(
        (contact) => contact.id !== Number(id)
      );
      // Salva o novo array no localStorage
      localStorage.setItem(key, JSON.stringify(contactsAfterDeletion));
    }
  };

  // Busca por contatos no localStorage. Pode ser filtrado por sobrenome ou não
  getContactsFromLocalStorage = (key, contact_lastname) => {
    // Busca pelos dados armazenados na chave do localStorage, caso exista
    const data = localStorage.getItem(key);
    // Se não houver dados, retorna uma array vazio
    if (data == null) {
      return [];
    }
    // Se não houver filtro por sobrenome, retorna as informações recuperadas
    if (contact_lastname == null) {
      return JSON.parse(data);
    }
    // Filtra os dados pelo sobrenome passado e retorna ao usuário, ao final
    const returnedArray = JSON.parse(data).filter((contact) =>
      contact.lastname.toLowerCase().includes(contact_lastname.toLowerCase())
    );

    return returnedArray;
  };

  // Faz busca por usuário específico
  getContactByIdFromLocalStorage = (key, id) => {
    // Busca pelos dados armazenados na chave do localStorage, caso exista
    const data = localStorage.getItem(key);
    // Se não encontrar contatos, retorna um erro
    if (data == null) {
      throw new Error("Contact not found!");
    }

    // Filtra pelo contato
    const filteredContact = JSON.parse(data).filter(
      (contact) => contact.id === Number(id)
    );

    // Caso encontre, retorna o contato. Caso não, retorna um erro
    if (filteredContact.length > 0) {
      return filteredContact[0];
    } else {
      throw new Error("Contact not found!");
    }
  };

  // Atualiza o contato através do seu id
  updateContactFromLocalStorage = (key, id, contact) => {
    // Busca pelos dados armazenados na chave do localStorage, caso exista
    const data = localStorage.getItem(key);
    // Se não encontrar contatos, retorna um erro
    if (data == null) {
      throw new Error("Contact not found!");
    }
    // Busca pelo id e atualiza o contato
    const updatedArray = JSON.parse(data).map((oldContact) =>
      oldContact.id === Number(id)
        ? {
            id: Number(id),
            ...contact,
          }
        : oldContact
    );
    // Salva o novo contato no localStorage
    localStorage.setItem(key, JSON.stringify(updatedArray));
    return;
  };
}

export default new LocalStorageUtilities();
