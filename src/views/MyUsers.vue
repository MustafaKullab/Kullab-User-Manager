<template>
  <div class="MyUsers">
    <div class="container-fluid">
      <div class="row justify-content-between">
        <div class="col-md-2 sidebar text-light p-0">
          <SideBar />
        </div>
        <div class="main col-md-10 p-0">
          <NavBar class="mb-3" />
          <div class="header d-flex justify-content-between align-items-center mx-4">
            <div class="titleSection">
              <div class="title text-light">
                <h3 class="m-0 mb-1">Users</h3>
                <p>Users Management</p>
              </div>
              <form>
                <div class="input-group">
                  <div class="input-group-text"><i class="bi bi-search"></i></div>
                  <input
                    type="text"
                    placeholder="Search Users..."
                    class="form-control"
                    v-model="searchResult"
                  />
                </div>
              </form>
            </div>
            <div class="addSection">
              <button class="btn btn-info text-light" @click="toggleAdduserState">
                <i class="bi bi-plus-lg"></i> Add New User
              </button>
            </div>
          </div>
          <div class="table mt-5">
            <div class="responsive-table mx-4 px-1">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="user in filterUsers" :key="user.id">
                    <td>{{ user.id }}</td>
                    <td>{{ new Date(user.id).toDateString() }}</td>
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
    <transition name="fade" mode="out-in">
      <div class="overlay" v-if="addNewUserState" @click.self="addNewUserState = false">
        <div class="addNewUser">
          <div class="header">
            <h3 class="title mb-3 text-light">Add New User</h3>
          </div>
          <form>
            <div class="input-group">
              <input type="text" placeholder="Name" class="form-control" v-model="user.name" />
            </div>
            <div class="input-group">
              <input type="email" placeholder="Email" class="form-control" v-model="user.email" />
            </div>
            <div class="input-group">
              <input
                type="text"
                placeholder="Password"
                class="form-control"
                v-model="user.password"
              />
            </div>
            <div class="validateMsg">
              <p class="text-danger">{{ userExist }}</p>
            </div>
            <button class="btn text-light" @click.prevent="addUser">Add User</button>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useUsersStore } from "@/stores/usersStore";
import SideBar from "@/components/SideBar.vue";
import NavBar from "@/components/NavBar.vue";
const userStore = useUsersStore();
const userEditState = ref(false);
const addNewUserState = ref(false);
const userExist = ref("");
const userEditId = ref(0);
const searchResult = ref("");
const typeToUpdate = ref({
  type: "name",
  newVal: "",
});
const user = ref({
  email: "",
  name: "",
  password: "",
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

const filterUsers = computed(() => {
  const search = searchResult.value.toLowerCase();
  return userStore.users.filter((user) => {
    return user.name.toLowerCase().includes(search) || user.email.toLowerCase().includes(search);
  });
});

const toggleAdduserState = () => {
  addNewUserState.value = !addNewUserState.value;
};

const addUser = () => {
  const checkUser = userStore.users.find((us) => us.email === user.value.email);
  if (!user.value.email || !user.value.name || !user.value.password) {
    userExist.value = "Fill All Fields";
    return;
  } else if (checkUser) {
    userExist.value = "User Is Exist!";
    return;
  }
  userStore.storeUser({ ...user.value, id: Date.now() });
  user.value = {
    email: "",
    name: "",
    password: "",
  };
  addNewUserState.value = !addNewUserState.value;
  userExist.value = "";
};
</script>

<style lang="scss" scoped>
.cursor-pointer {
  cursor: pointer;
}

.main {
  .header {
    input,
    .input-group-text {
      background: #22272d !important;
      color: #7d848a;
      border-color: #7d848a;
      box-shadow: none;
    }
    input {
      color: white;
    }
    input::placeholder {
      color: #7d848a;
    }
  }
  .responsive-table {
    overflow-x: auto;
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
      white-space: nowrap !important;
      padding: 20px;
    }
    thead {
      tr {
        border-radius: 10px;
        th {
          border: none;
          background-color: #3e4851 !important;

          &:first-of-type {
            border-top-left-radius: 10px;
          }
          &:last-of-type {
            border-top-right-radius: 10px;
          }
        }
      }
    }
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
  .addNewUser {
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
      .validateMsg {
        margin-right: auto;
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
