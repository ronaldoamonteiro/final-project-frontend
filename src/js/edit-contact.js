import localStorage from "../utilities/localStorage";

async function retrieveItemData(id) {
  return localStorage.getContactByIdFromLocalStorage("contacts", id);
  // const response = await fetch(`http://localhost:3000/contact/${id}`);
  // const data = await response.json();
  // return data;
}
const queryParams = new URLSearchParams(window.location.search);

(async () => {
  // We must pass the window.location.search, because the URLSearchParams does not understand full URL
  if (queryParams.has("id")) {
    const data = await retrieveItemData(queryParams.get("id"));
    Object.keys(data).forEach((key) => {
      const fieldToUpdate = document.getElementById(
        `contact_` + key.replace("_", "")
      );
      if (fieldToUpdate) {
        fieldToUpdate.value = data[key];
      }
    });
  } else {
    throw new Error("Id not found!");
  }
})();

// Error label
function addErrorLabel(inputFieldId, description) {
  const firstNameParent = document.getElementById(inputFieldId).parentNode;
  const label = document.createElement("label");
  label.className = "error-label";
  label.id = `${inputFieldId}-error`;
  label.style.fontSize = "0.75rem";
  label.style.color = "red";
  label.innerText = description;

  firstNameParent.appendChild(label);
}

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

// In the edit process, we pass the id to a hidden input
document.getElementById("form").addEventListener("submit", async (event) => {
  try {
    event.preventDefault();
    const form = document.querySelector("#form");
    const submitter = document.querySelector("#edit_contact");
    const formData = new FormData(form, submitter);

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

    if (errors.length > 0) {
      throw new Error(errors.join(""));
    }

    localStorage.updateContactFromLocalStorage(
      "contacts",
      formData.get("contact_id"),
      {
        firstname: formData.get("firstname"),
        lastname: formData.get("lastname"),
        phone_number: String(formData.get("phone_number")),
      }
    );
    location.replace("/index.html");
    // fetch(`http://localhost:3000/contact/${formData.get("contact_id")}`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     firstname: formData.get("firstname"),
    //     lastname: formData.get("lastname"),
    //     phone_number: String(formData.get("phone_number")),
    //   }),
    // })
    //   .then(() => {
    //     location.replace("/index.html");
    //   })
    //   .catch((error) => console.error(error));
  } catch (e) {
    console.error(e);
  }
});

// Go back button
document.getElementById("go_back").addEventListener("click", () => {
  location.replace("/index.html");
});
