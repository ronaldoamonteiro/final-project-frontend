import localStorage from "../../utilities/localStorage";

document.getElementById("form").addEventListener("submit", (event) => {
  try {
    event.preventDefault();
    const form = document.querySelector("#form");
    const submitter = document.querySelector("#add_contact");
    console.log({ submitter });
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

    localStorage.addContactToLocalStorage("contacts", {
      firstname: formData.get("firstname"),
      lastname: formData.get("lastname"),
      phone_number: String(formData.get("phone_number")),
    });

    location.replace("/index.html");
    // fetch("http://localhost:3000/contact", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // body: JSON.stringify({
    //   firstname: formData.get("firstname"),
    //   lastname: formData.get("lastname"),
    //   phone_number: String(formData.get("phone_number")),
    // }),
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
