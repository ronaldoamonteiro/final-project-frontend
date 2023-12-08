import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        addContact: resolve(__dirname, "src/contacts/add.html"),
        editContact: resolve(__dirname, "src/contacts/edit.html"),
        deleteContact: resolve(__dirname, "src/contacts/delete.html"),
      },
    },
  },
});
