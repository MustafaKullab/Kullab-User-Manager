import { defineStore } from "pinia";
export const useUsersStore = defineStore("users", {
  state: () => ({
    users: [],
    currentUser: null,
    isAuthenticated: false,
    admin: {
      name: "admin",
      password: "admin",
    },
  }),
  getters: {
    totalUsers() {
      return this.users.length;
    },
  },
  actions: {
    init() {
      if (localStorage.getItem("users")) {
        this.users = JSON.parse(localStorage.getItem("users"));
      }
      const storageAuthenticated = localStorage.getItem("isAuthenticated");
      const storageCurrentUser = localStorage.getItem("currentUser");

      if (storageCurrentUser && storageAuthenticated === "true") {
        this.isAuthenticated = true;
        this.currentUser = storageCurrentUser;
      }

      if (localStorage.getItem("newPass")) {
        this.admin.password = localStorage.getItem("newPass");
      }
    },
    storeUser(user) {
      this.users.push(user);
      localStorage.setItem("users", JSON.stringify(this.users));
    },
    deleteUser(id) {
      this.users = this.users.filter((user) => user.id !== id);
      localStorage.setItem("users", JSON.stringify(this.users));
    },
    updateUser(id, userDetails) {
      const myUser = this.users.find((user) => user.id === id);
      if (!myUser) {
        return;
      } else if (userDetails.type === "name") {
        myUser.name = userDetails.newVal;
      } else if (userDetails.type === "email") {
        myUser.email = userDetails.newVal;
      } else {
        myUser.password = userDetails.newVal;
      }
      localStorage.setItem("users", JSON.stringify(this.users));
    },
  },
});
