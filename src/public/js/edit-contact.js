import localStorage from "../../utilities/localStorage";

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
      console.log({ key });
      const fieldToUpdate = document.getElementById(
        `contact_` + key.replace("_", "")
      );
      console.log(fieldToUpdate);
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
    event.preventDefault();
    const form = document.querySelector("#form");
    const submitter = document.querySelector("#edit_contact");
    const formData = new FormData(form, submitter);

    // validation
    if (formData.get("firstname").length < 1) {
      throw new Error(
        JSON.stringify({
          firstname: "First name must be, at least, 1 character long",
        })
      );
    }
    if (formData.get("lastname").length < 1) {
      throw new Error(
        JSON.stringify({
          lastname: "Last name must be, at least, 1 character long",
        })
      );
    }
    if (String(formData.get("phone_number")).length < 6) {
      throw new Error(
        JSON.stringify({
          phone_number: "Phone number must be, at least, 6 character long",
        })
      );
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
