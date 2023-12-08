import localStorage from "../utilities/localStorage";

// Error label
// Função responsável por gerar os labels de erro para os campos de texto da página
function addErrorLabel(inputFieldId, description) {
  // Pega o pai do elemento de campo de texto
  const firstNameParent = document.getElementById(inputFieldId).parentNode;
  // Cria um label
  const label = document.createElement("label");
  // Define nome, id, tamanho de fonte e cor para o label
  label.className = "error-label";
  label.id = `${inputFieldId}-error`;
  label.style.fontSize = "0.75rem";
  label.style.color = "red";
  label.innerText = description;
  // Adiciona o label como último filho da div
  firstNameParent.appendChild(label);
}

// Evento de escuta que permite a remoção do label de erro, caso a informação digitada atenda aos requisitos de validação
// Caso o nome tenha mais de um caracter, o erro é removido
document
  .getElementById("contact_firstname")
  .addEventListener("keyup", (event) => {
    const firstNameParent =
      document.getElementById("contact_firstname").parentNode;
    if (
      event.target.value.length > 1 &&
      firstNameParent.lastChild.id === "contact_firstname-error"
    ) {
      firstNameParent.removeChild(firstNameParent.lastChild);
    }
  });

// Evento de escuta que permite a remoção do label de erro, caso a informação digitada atenda aos requisitos de validação
// Caso o sobrenome tenha mais de um caracter, o erro é removido
document
  .getElementById("contact_lastname")
  .addEventListener("keyup", (event) => {
    const firstNameParent =
      document.getElementById("contact_lastname").parentNode;
    if (
      event.target.value.length > 1 &&
      firstNameParent.lastChild.id === "contact_lastname-error"
    ) {
      firstNameParent.removeChild(firstNameParent.lastChild);
    }
  });

// Evento de escuta que permite a remoção do label de erro, caso a informação digitada atenda aos requisitos de validação
// Caso o número de telefone tenha 6 dígitos, o erro é removido, caso exista
document
  .getElementById("contact_phonenumber")
  .addEventListener("keyup", (event) => {
    const firstNameParent = document.getElementById(
      "contact_phonenumber"
    ).parentNode;
    if (
      event.target.value.length > 6 &&
      firstNameParent.lastChild.id === "contact_phonenumber-error"
    ) {
      firstNameParent.removeChild(firstNameParent.lastChild);
    }
  });

// Busca pelo id "form" e, em sua submissão, executa o código de cadastro de contato, exibido abaixo
document.getElementById("form").addEventListener("submit", (event) => {
  try {
    // Previne que a página recarregue após a submissão
    event.preventDefault();
    // Busca pelo formulário através do seu id
    const form = document.querySelector("#form");
    // Busca pelo botão de submissão através do seu id
    const submitter = document.querySelector("#add_contact");
    // Cria um formulário com o form e o botão de submissão;
    const formData = new FormData(form, submitter);
    // Array de erros
    const errors = [];

    // validation
    if (formData.get("firstname").length < 1) {
      addErrorLabel(
        "contact_firstname",
        "First name must be, at least, 1 character long"
      );
      errors.push("First name must be, at least, 1 character long\n\n");
    }
    if (formData.get("lastname").length < 1) {
      addErrorLabel(
        "contact_lastname",
        "Last name must be, at least, 1 character long"
      );
      errors.push("Last name must be, at least, 1 character long\n\n");
    }
    if (String(formData.get("phone_number")).length < 6) {
      addErrorLabel(
        "contact_phonenumber",
        "Phone number must be, at least, 6 characters long"
      );
      errors.push("Phone number must be, at least, 6 characters long\n\n");
    }

    // Caso haja erros, lança-os para o usuário
    if (errors.length > 0) {
      throw new Error(errors.join(""));
    }

    // Salva os dados do contato no localStorage, caso não exista erro
    localStorage.addContactToLocalStorage("contacts", {
      firstname: formData.get("firstname"),
      lastname: formData.get("lastname"),
      phone_number: String(formData.get("phone_number")),
    });
    // Redireciona a aplicação
    location.replace("/index.html");
  } catch (e) {
    console.error(e);
  }
});

// Go back button
// Botão de/para voltar
document.getElementById("go_back").addEventListener("click", () => {
  location.replace("/index.html");
});
