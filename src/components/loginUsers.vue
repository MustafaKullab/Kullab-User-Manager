<template>
  <div class="LoginUsers">
    <div class="container-lg">
      <div class="row d-flex justify-content-center align-items-center loginRow">
        <div class="col-md-6">
          <div class="title text-center">
            <h1 class="mb-2 text-light">Login / Sign In</h1>
            <p class="subtitle">Welcome back to KULLAB</p>
          </div>
          <form class="py-3 px-4 rounded-3">
            <label for="name" class="form-label me-3 text-light">Name</label>
            <div class="mb-4 input-group">
              <div class="input-group-text"><i class="bi bi-envelope"></i></div>
              <input
                type="text"
                id="name"
                class="form-control"
                placeholder="Enter Your Name"
                v-model="inputName"
              />
            </div>
            <label for="pass" class="form-label me-3 text-light">Password:</label>
            <div class="input-group mb-4">
              <div class="input-group-text"><i class="bi bi-lock"></i></div>
              <input
                type="password"
                id="pass"
                class="form-control"
                placeholder="Enter Your Password"
                v-model="inputPassword"
                ref="passType"
              />
              <div class="show input-group-text cursor-pointer" @click="showToggle">
                <i class="bi bi-eye" v-if="show"></i>
                <i class="bi bi-eye-slash" v-else></i>
              </div>
            </div>
            <div class="validateMessage mt-2 text-start text-danger x" v-if="validateMsg">
              <p>{{ validateMsg }}</p>
            </div>
            <button
              class="signinButton btn rounded-pill text-light btn-lg w-100"
              @click.prevent="signInAdmin"
            >
              Sign In
            </button>
            <div class="signUp mt-3 text-start cursor-pointer">
              <router-link class="text-light text-decoration-none" :to="{ name: 'signup' }"
                >Sign Up?</router-link
              >
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUsersStore } from "../stores/usersStore";

const router = useRouter();
const userStore = useUsersStore();
const admin = {
  name: "admin",
  password: "admin",
};
const inputName = ref("");
const inputPassword = ref("");
const show = ref(false);
const passType = ref(null);
const validateMsg = ref("");

const showToggle = () => {
  show.value = !show.value;
  if (show.value === true) {
    passType.value.type = "text";
  } else {
    passType.value.type = "password";
  }
};

const signInAdmin = () => {
  if (!inputName.value && !inputPassword.value) {
    validateMsg.value = "Not allow to let fields empty";
    return;
  } else if (!inputName.value) {
    validateMsg.value = "Please enter your username";
    return;
  } else if (!inputPassword.value) {
    validateMsg.value = "Please enter your password";
    return;
  } else if (inputName.value === admin.name && inputPassword.value === admin.password) {
    userStore.currentUser = "admin";
    userStore.isAuthenticated = true;
    localStorage.setItem("currentUser", "admin");
    localStorage.setItem("isAuthenticated", "true");
    router.push({ name: "dashboard" });
    validateMsg.value = "";
  }
};
</script>

<style lang="scss" scoped>
.cursor-pointer {
  cursor: pointer;
}
.title {
  .subtitle {
    color: var(--text-white-muted);
  }
}
.loginRow {
  height: 100vh;
}
form {
  background-color: var(--background-form);
  .signinButton {
    background-color: var(--color-button);
    transition: 0.4s;
    &:hover {
      background-color: #078d86;
    }
  }
  .haveAccount {
    color: var(--text-white-muted);
    a {
      transition: 0.4s;
      &:hover {
        color: white !important;
      }
    }
  }
  .input-group {
    .input-group-text:last-of-type {
      transition: 0.4s;
      &:hover {
        background-color: rgba(0, 0, 0, 0.073) !important;
      }
    }
    input,
    .input-group-text {
      background-color: var(--background-input);
      border-color: var(--border-color) !important;
      box-shadow: none !important;
      color: var(--form-color) !important;
    }
    input {
      color: white !important;
    }
    input {
      &:focus {
        background-color: var(--background-input) !important;
      }
      &::placeholder {
        color: var(--form-color) !important;
      }
    }
  }
}
</style>
