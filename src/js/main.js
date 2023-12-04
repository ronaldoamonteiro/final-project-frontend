import localStorage from "../utilities/localStorage";

// First render
window.addEventListener("load", async () => {
  const content = document.querySelector(".content");
  // Makes API call here
  try {
    // const response = await fetch("http://localhost:3000/contact");
    // const data = await response.json();
    const data = localStorage.getContactsFromLocalStorage("contacts");
    console.log({ data });
    content.innerHTML = retrieveCard(data);
    // contactCardEditProcess();
  } catch (error) {
    console.table(error);
    content.innerHTML = `${error.message}!`;
    content.style.color = "red";
  }
});

function goToAddContactPage() {
  location.replace(`/contacts/add.html`);
}

const handleEditButtonClick = (id) => {
  location.replace(`/contacts/edit.html?id=${id}`);
};
const handleDeleteButtonClick = (id) => {
  location.replace(`/contacts/delete.html?id=${id}`);
};

function retrieveCard(contacts) {
  let card = "";
  // const editImage = path.resolve("images", "delete.svg");
  const editImage = "/edit.svg";
  const deleteImage = "/delete.svg";
  const phoneImage = "/phone.svg";
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

window.goToAddContactPage = goToAddContactPage;
window.handleEditButtonClick = handleEditButtonClick;
window.handleDeleteButtonClick = handleDeleteButtonClick;
