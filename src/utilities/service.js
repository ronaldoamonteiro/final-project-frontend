class ContactApi {
  constructor() {
    this.baseURL = "http://localhost:3000";
  }

  async addContact(contact) {
    console.log("Contact");
    return await fetch(`${this.baseURL}/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    });
  }

  async getContacts() {
    return await fetch(`${this.baseURL}/contacts`);
  }

  async getContactById(id) {
    return await fetch(`${this.baseURL}/contacts/${id}`);
  }

  async updateContact(id, contact) {
    return await fetch(`${this.baseURL}/contacts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    });
  }

  async deleteContact(id) {
    return await fetch(`${this.baseURL}/contacts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export default new ContactApi();
