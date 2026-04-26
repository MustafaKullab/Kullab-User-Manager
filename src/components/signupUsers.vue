<template>
  <div class="SignUpUsers">
    <div class="container-lg">
      <button class="btn btn-secondary back position-absolute" @click="router.go(-1)">
        <i class="bi bi-arrow-left"></i> Back to Login
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
                placeholder="Pick a username"
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
                :type="show1 ? 'text' : 'password'"
                class="form-control"
                placeholder="Enter Your Password"
                v-model="user.password"
              />
              <div class="show input-group-text cursor-pointer" @click="showToggle1()">
                <i class="bi bi-eye" v-if="show1"></i>
                <i class="bi bi-eye-slash" v-else></i>
              </div>
            </div>
            <label for="confpassword" class="form-label text-light">Re-type Password : </label>
            <div class="input-group">
              <div class="input-group-text"><i class="bi bi-lock"></i></div>
              <input
                :type="show2 ? 'text' : 'password'"
                class="form-control"
                placeholder="Confirm Password"
                v-model="user.confPass"
              />
              <div class="show input-group-text cursor-pointer" @click="showToggle2()">
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
import { toast } from "vue-sonner";

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
const userExist = ref("");
const regxPass = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
const regxEmail =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const showToggle1 = () => {
  show1.value = !show1.value;
};

// Show And Hide Confirm Password
const showToggle2 = () => {
  show2.value = !show2.value;
};

//Sign Up User
const signUpUser = () => {
  const checkUser = userStore.users.find((us) => us.email === user.value.email);
  if (!user.value.password || !user.value.name || !user.value.email || !user.value.confPass) {
    userExist.value = "Please complete all fields.";
    return;
  } else if (checkUser) {
    userExist.value = "Email already in use.";
    return;
  } else if (!regxEmail.test(user.value.email)) {
    userExist.value = "Invalid email format.";
    return;
  } else if (!regxPass.test(user.value.password)) {
    userExist.value = "Password too weak.";
    return;
  } else if (user.value.password != user.value.confPass) {
    userExist.value = "Passwords don't match.";
    return;
  }
  userStore.storeUser({ ...user.value, id: Date.now() });
  user.value = {
    email: "",
    name: "",
    password: "",
    confPass: "",
  };
  toast.success("Account created successfully!");
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
