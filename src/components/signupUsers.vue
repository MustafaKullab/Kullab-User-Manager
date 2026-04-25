<template>
  <div class="SignUpUsers">
    <div class="container-lg">
      <button class="btn btn-outline-secondary back position-absolute" @click="router.go(-1)">
        <i class="bi bi-arrow-left"></i> Back
      </button>
      <div class="row justify-content-center align-items-center">
        <div class="col-md-5">
          <div class="title text-center">
            <h1 class="mb-2 text-light">Create New Account</h1>
            <p class="subtitle">Join KULLAB and start your coding journey</p>
          </div>
          <form class="py-3 px-4 rounded-3">
            <label for="username" class="form-label text-light">Username : </label>
            <div class="mb-3 input-group">
              <div class="input-group-text text-muted"><i class="bi bi-person"></i></div>
              <input
                type="text"
                class="form-control"
                placeholder="Enter Your Name"
                v-model="user.name"
              />
            </div>
            <label for="email" class="form-label text-light text-start">Email</label>
            <div class="mb-3 input-group">
              <div class="input-group-text text-muted"><i class="bi bi-envelope"></i></div>
              <input
                type="email"
                class="form-control"
                id="email"
                placeholder="name@example.com"
                v-model="user.email"
              />
            </div>
            <label for="password" class="form-label text-light">Password : </label>

            <div class="mb-3 input-group">
              <div class="input-group-text"><i class="bi bi-lock"></i></div>
              <input
                type="password"
                class="form-control"
                placeholder="Enter Your Password"
                v-model="user.password"
                ref="pass"
              />
              <div class="show input-group-text cursor-pointer" @click="showToggle1(pass)">
                <i class="bi bi-eye" v-if="show1"></i>
                <i class="bi bi-eye-slash" v-else></i>
              </div>
            </div>
            <label for="confpassword" class="form-label text-light">Confirm Password : </label>
            <div class="input-group">
              <div class="input-group-text"><i class="bi bi-lock"></i></div>
              <input
                type="password"
                class="form-control"
                placeholder="Confirm Password"
                v-model="user.confPass"
                ref="confPass"
              />
              <div class="show input-group-text cursor-pointer" @click="showToggle2(confPass)">
                <i class="bi bi-eye" v-if="show2"></i>
                <i class="bi bi-eye-slash" v-else></i>
              </div>
            </div>
            <div class="validateMsg mt-3 mb-0 text-start text-danger" v-if="userExist">
              <p class="mb-1">{{ userExist }}</p>
            </div>
            <button
              class="signupButton btn btn-lg rounded-pill text-light w-100 mt-3"
              @click.prevent="signUpUser"
            >
              Sign Up
            </button>
            <div class="haveAccount text-center mt-3">
              Already have an account?
              <router-link class="text-light text-decoration-none" :to="{ name: 'login' }"
                >Login</router-link
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
import { useUsersStore } from "@/stores/usersStore";
const userStore = useUsersStore();
const router = useRouter();
const user = ref({
  email: "",
  name: "",
  password: "",
  confPass: "",
});
const show1 = ref(false);
const show2 = ref(false);
const pass = ref(null);
const confPass = ref(null);
const userExist = ref("");

// Show And Hide Confirm Password
const showToggle1 = (password) => {
  show1.value = !show1.value;
  if (show1.value === true) {
    password.type = "text";
  } else {
    password.type = "password";
  }
};

// Show And Hide Confirm Password
const showToggle2 = (password) => {
  show2.value = !show2.value;
  if (show2.value === true) {
    password.type = "text";
  } else {
    password.type = "password";
  }
};

//Sign Up User
const signUpUser = () => {
  const checkUser = userStore.users.find((us) => us.email === user.value.email);
  if (!user.value.password || !user.value.name || !user.value.email || !user.value.confPass) {
    userExist.value = "Not allow to let any field empty!";
    return;
  } else if (checkUser) {
    userExist.value = "User Is Exist!";
    return;
  } else if (user.value.password != user.value.confPass) {
    userExist.value = "Both Password Must Be Equal!";
    return;
  }
  userStore.storeUser({ ...user.value, id: Date.now() });
  user.value = {
    email: "",
    name: "",
    password: "",
    confPass: "",
  };
  userExist.value = "";
};
</script>

<style lang="scss" scoped>
.title {
  .subtitle {
    color: var(--text-white-muted);
  }
}
.cursor-pointer {
  cursor: pointer;
}
.row {
  height: 100vh;
}
.back {
  top: 50px;
}
form {
  background-color: var(--background-form);
  .signupButton {
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
