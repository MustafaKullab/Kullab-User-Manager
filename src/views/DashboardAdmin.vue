<template>
  <div class="DashboardAdmin">
    <div class="container-fluid mx-3 mx-md-0">
      <div class="row">
        <div class="col-md-2 sidebar text-light">
          <div class="logo text-center">
            <h2 class="text-uppercase my-3">Kullab</h2>
          </div>
          <ul class="links list-unstyled">
            <li class="p-2 mb-2">
              <router-link class="text-decoration-none text-light" :to="{ name: 'dashboard' }"
                >Dashboard</router-link
              >
            </li>
            <li class="p-2 mb-2">
              <router-link class="text-decoration-none text-light" :to="{ name: 'users' }"
                >Users</router-link
              >
            </li>
            <li class="p-2 mb-2">
              <router-link class="text-decoration-none text-light" :to="{ name: 'settings' }"
                >Settings</router-link
              >
            </li>
            <li class="p-2 mb-2">
              <router-link class="text-decoration-none text-light" :to="{ name: 'reports' }"
                >Reports</router-link
              >
            </li>
          </ul>
        </div>
        <div class="col-md-10 p-0">
          <NavBar />
          <div class="row justify-content-center">
            <div class="col-md-11 cards row justify-content-between my-5 mx-3">
              <div
                class="col-md-3 flex-column flex-lg-row mb-3 mb-md-0 d-flex justify-content-between gap-3 totalUsers bg-white p-3 rounded-3"
              >
                <div class="icon text-center text-lg-start">
                  <i class="bi bi-people fs-2"></i>
                </div>
                <div class="details text-center text-lg-end">
                  <p class="m-0">Total Registered Users</p>
                  <span class="fs-3">{{ totalUsers }}</span>
                </div>
              </div>
              <div
                class="col-md-3 flex-column flex-lg-row mb-3 mb-md-0 d-flex justify-content-between gap-3 adminLoggedin bg-white p-3 rounded-3"
              >
                <div class="icon text-center text-lg-start">
                  <i class="bi bi-person-vcard fs-2"></i>
                </div>
                <div class="details text-center text-lg-end">
                  <p class="m-0">Admin Logged In</p>
                  <span class="fs-3">{{ currentUser }}</span>
                </div>
              </div>
              <div
                class="col-md-3 flex-column flex-lg-row mb-3 mb-md-0 d-flex justify-content-between gap-3 systemStatus bg-white p-3 rounded-3"
              >
                <div class="icon text-center text-lg-start">
                  <i class="bi bi bi-activity fs-2"></i>
                </div>
                <div class="details text-center text-lg-end">
                  <p class="m-0">System Status</p>
                  <span class="fs-3">Active</span>
                </div>
              </div>
            </div>
          </div>
          <div
            class="header-table mx-4 px-3 d-flex justify-content-between align-items-center rounded-top-2"
          >
            <div class="title rounded-top-2">
              <h4 class="m-0">Recent User Overview (Mini Table)</h4>
              <p class="m-0">Recently Joined Users Preview (Last 5)</p>
            </div>
            <div
              class="link d-flex gap-2 p-2 cursor-pointer"
              @click="router.push({ name: 'users' })"
            >
              <div class="icon">
                <i class="bi bi-box-arrow-up-right"></i>
              </div>
              <div class="text">Go To Manage Users</div>
            </div>
          </div>
          <div class="table">
            <div class="responsive-table mx-4 px-1">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="user in users.slice(-5).reverse()" :key="user.id">
                    <td>{{ user.id }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.password }}</td>
                    <td>
                      <div class="actions d-flex align-items-center gap-2">
                        <div class="edit cursor-pointer" @click="editUser(user.id)">
                          <i class="bi bi-pencil"></i>
                        </div>
                        <div class="trash cursor-pointer" @click="deleteUser(user.id)">
                          <i class="bi bi-trash"></i>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <div class="overlay" v-if="userEditState" @click.self="userEditState = false">
        <div class="userEdit">
          <div class="title">
            <h2 class="text-light">User Update</h2>
            <p>User id is {{ userEditId }}</p>
          </div>
          <form>
            <select name="edit" id="edit" v-model="typeToUpdate.type">
              <option value="name">Name</option>
              <option value="email">Email</option>
              <option value="password">Password</option>
            </select>
            <input
              type="text"
              placeholder="New Name"
              class="form-control"
              v-model="typeToUpdate.newVal"
              v-if="typeToUpdate.type === 'name'"
            />
            <input
              type="text"
              placeholder="New Email"
              class="form-control"
              v-model="typeToUpdate.newVal"
              v-if="typeToUpdate.type === 'email'"
            />
            <input
              type="text"
              placeholder="New Password"
              class="form-control"
              v-model="typeToUpdate.newVal"
              v-if="typeToUpdate.type === 'password'"
            />
            <button class="btn w-100 mb-0 text-light" @click.prevent="updateUser">
              Update User
            </button>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import NavBar from "@/components/NavBar.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUsersStore } from "@/stores/usersStore";
import { storeToRefs } from "pinia";

const router = useRouter();
const userStore = useUsersStore();
const activeStore = storeToRefs(userStore);
const users = activeStore.users;
const totalUsers = activeStore.totalUsers;
const currentUser = activeStore.currentUser;
const userEditState = ref(false);
const userEditId = ref(0);
const typeToUpdate = ref({
  type: "name",
  newVal: "",
});

const deleteUser = (id) => {
  userStore.deleteUser(Number(id));
};

const editUser = (id) => {
  userEditState.value = !userEditState.value;
  userEditId.value = id;
};

const updateUser = () => {
  if (!typeToUpdate.value.newVal) {
    return;
  }
  userStore.updateUser(Number(userEditId.value), typeToUpdate.value);
  userEditId.value = "";
  typeToUpdate.value.newVal = "";
  userEditState.value = !userEditState.value;
};

// window.addEventListener("click", (e) => {
//   if (e.target.classList.contains("overlay")) {
//     userEditState.value = !userEditState.value;
//   }
// });

// const user = ref({
//   email: "",
//   name: "",
//   password: "",
// });
// const delId = ref("");
// const delMsg = ref("");
// const userId = ref("");
// // const userExist = ref("");

// const addUser = () => {
//   const checkUser = userStore.users.find((us) => us.email === user.value.email);
//   if (!user.value.email || !user.value.name || !user.value.password) {
//     userExist.value = "Fill All Fields";
//     return;
//   } else if (checkUser) {
//     userExist.value = "User Is Exist!";
//     return;
//   }
//   userStore.storeUser({ ...user.value, id: Date.now() });
//   user.value = {
//     email: "",
//     name: "",
//     password: "",
//   };
//   userExist.value = "";
// };

// const delUser = () => {
//   if (!delId.value) {
//     delMsg.value = "Not allow to let field empty";
//     return;
//   }
//   userStore.deleteUser(Number(delId.value));
//   delId.value = "";
//   delMsg.value = "";
// };
</script>

<style lang="scss" scoped>
.cursor-pointer {
  cursor: pointer;
}
.responsive-table {
  overflow-x: auto;
}

.sidebar {
  background-color: var(--sidebar-color);
  @media (min-width: 768px) {
    height: 100vh;
  }
}

.links {
  li {
    a {
      transition: 0.4s;
      &.router-link-active,
      &:hover {
        background-color: #1a3639 !important;
        padding: 10px;
        border-radius: 5px;
        position: relative;
        &::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 4px;
          background-color: #1aaa8f;
          border-top-right-radius: 2px;
          border-bottom-right-radius: 2px;
        }
      }
    }
  }
}

.cards {
  > div {
    background-color: #272c2f !important;
    color: #e2e4e3 !important;
    i {
      background-color: #354e52;
      box-shadow: 0px 0px 10px #24474b;
      padding: 5px 10px;
      border-radius: 10px;
    }
  }
}

.header-table {
  background-color: #272c2f !important;
  padding: 10px;
  color: #fcfcfc;
  .link {
    background-color: #272c2f !important;
    color: #f0f2f1 !important;
    border: 2px solid #c9c9c9;
    border-radius: 5px;
    transition: 0.2s;
    &:hover {
      background-color: #f0f2f1 !important;
      color: #272c2f !important;
    }
  }
  @media (max-width: 767px) {
    .title {
      display: none;
    }
    .link {
      text-align: center;
      margin: auto;
    }
  }
}
.responsive-table {
  background-color: #272c2f !important;
  .header {
    background-color: #272c2f !important;
    .title {
      background-color: #272c2f !important;
      h4 {
        color: #fcfcfc !important;
      }
      p {
        color: #b8c2c4 !important;
      }
    }
  }
  tr,
  td,
  th {
    background-color: #272c2f !important;
    border-color: #363e41 !important;
    color: #fdfffc !important;
  }
  tr th {
    border: none;
    background-color: #3e4851 !important;
  }
}

.overlay {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.321);
  backdrop-filter: blur(3px);
  display: flex;
  justify-content: center;
  align-items: center;
  .userEdit {
    padding: 20px;
    background-color: var(--background-color);
    border-radius: 10px;
    text-align: center;
    .title {
      p {
        color: #e2e4e3;
        margin: 0 0 5px;
      }
    }
    form {
      width: 350px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      input {
        box-shadow: none !important;
        background-color: var(--background-input);
        border-color: var(--border-color);
        color: rgb(218, 218, 218);
        &::placeholder {
          color: rgb(192, 192, 192);
        }
      }
      button {
        background-color: var(--sidebar-color);
      }
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
