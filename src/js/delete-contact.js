import localStorage from "../utilities/localStorage";

// Recupera as informações do seu contato por meio do id
async function retrieveItemData(id) {
  return localStorage.getContactByIdFromLocalStorage("contacts", id);
}

// We must pass the window.location.search, because the URLSearchParams does not understand full URL
// Busca pelos paramêtros de pesquisa na URL da página. Em outras palavras, a função abaixo retorna um objeto que contém ou não o id do usuário
const queryParams = new URLSearchParams(window.location.search);

// Função é executada na primeira chamada da aplicação (closure)
(async () => {
  // Caso o "id" esteja na query, atualiza as informações do formulário
  if (queryParams.has("id")) {
    // Faz a busca do contato pelo id
    const data = await retrieveItemData(queryParams.get("id"));
    // Para cada campo dentro do contato (firstname, lastname, phonenumber), adiciona as respectivas informações a seus campos de texto
    Object.keys(data).forEach((key) => {
      const fieldToUpdate = document.getElementById(
        `contact_` + key.replace("_", "")
      );
      // Caso o id seja diferente de "id", desativa o campo, de modo a evitar que o usuário altere as informações, que, por padrão, são de somente leitura
      if (key !== "id") {
        fieldToUpdate.disabled = true;
      }
      // Caso encontre o campo específico, atribui o valor recuperado a ele
      if (fieldToUpdate) {
        fieldToUpdate.value = data[key];
      }
    });
  } else {
    throw new Error("Id not found!");
  }
})();

// In the edit process, we pass the id to a hidden input
document.getElementById("form").addEventListener("submit", async (event) => {
  try {
    // Previne que a página recarregue após a submissão
    event.preventDefault();
    // Busca pelo formulário através do seu id
    const form = document.querySelector("#form");
    // Busca pelo botão de submissão através do seu id
    const submitter = document.querySelector("#delete_contact");
    // Cria um formulário com o form e o botão de submissão;
    const formData = new FormData(form, submitter);

    // Apaga o contato do localStorage
    localStorage.removeContactFromLocalStorage(
      "contacts",
      formData.get("contact_id")
    );
    // Redireciona a aplicação
    location.replace("/index.html");
  } catch (e) {
    console.error(e);
  }
});

// Go back button
// Botão para voltar
document.getElementById("go_back").addEventListener("click", () => {
  location.replace("/index.html");
});
