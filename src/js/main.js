import localStorage from "../utilities/localStorage";
// Evento de escuta para toda vez que houver um carregamento da página. Neste caso, a página index.html
window.addEventListener("load", async () => {
  // Busca pela classe ".content"
  const content = document.querySelector(".content");
  try {
    // Busca pelas informações em localStorage
    const data = localStorage.getContactsFromLocalStorage("contacts");
    /**
     * Example using JSON Server API
     */
    // const data = contactApi.getContacts();
    // Para cada contato, cria um card
    content.innerHTML = retrieveCard(data);
  } catch (error) {
    console.table(error);
    content.innerHTML = `${error.message}!`;
    content.style.color = "red";
  }
});

// Função para redirecionamento à página de criação de contatos
function goToAddContactPage() {
  location.replace(`/contacts/add.html`);
}

// Função para o redirecionamento à página de edição de contatos
const handleEditButtonClick = (id) => {
  location.replace(`/contacts/edit.html?id=${id}`);
};
// Função para o redirecionamento à página de deleção de contatos
const handleDeleteButtonClick = (id) => {
  location.replace(`/contacts/delete.html?id=${id}`);
};

// Função que permite a criação da lista de cards/contatos na tela inicial. Recebe um array de contatos
function retrieveCard(contacts) {
  let card = "";
  // Cada uma das imagens é definida aqui, pois o Babel não consegue colocar hashes nos seus bundles, ou seja, elas não passam por "criptografia"
  const editImage = "/edit.svg";
  const deleteImage = "/delete.svg";
  const phoneImage = "/phone.svg";
  // Para cada um dos contatos na lista de contatos, cria um card
  contacts.forEach((contact) => {
    card += `
      <div class="card">
        <div class="contact-info">
          <h4>${contact.firstname} ${contact.lastname}</h4>
          <div class="contact-number">
            <img src="${phoneImage}" alt="">
            <span>${contact.phone_number}</span>
          </div>
        </div>
        <div class="button-container">
          <button type="button" class="no-bg-btn" onclick="handleEditButtonClick(${contact.id})">
            <img src="${editImage}" alt="">
          </button>
          <button type="button" class="no-bg-btn" onclick="handleDeleteButtonClick(${contact.id})">
            <img src="${deleteImage}" alt="">
          </button>
        </div>
      </div>
    `;

    card += "\n";
  });

  return card;
}

// Este evento de escuta permite ao usuário, após soltar o botão do teclado, pesquisar o contato pelo seu sobrenome (last name)
document.getElementById("search-input").addEventListener("keyup", (event) => {
  // Busca pela classe '.content'
  const content = document.querySelector(".content");
  // Limpa a lista de contatos
  content.innerHTML = "";
  // Filtra os contatos pelo sobrenome
  const filteredContacts = localStorage.getContactsFromLocalStorage(
    "contacts",
    event.target.value
  );
  // Remonta a lista de contatos
  content.innerHTML = retrieveCard(filteredContacts);
});

// Permitem o acesso global às funções definidas mais acima
window.goToAddContactPage = goToAddContactPage;
window.handleEditButtonClick = handleEditButtonClick;
window.handleDeleteButtonClick = handleDeleteButtonClick;
