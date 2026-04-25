<template>
  <div class="SettingsPage">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-2 sidebar text-light">
          <SideBar />
        </div>
        <div class="col-md-10 p-0">
          <NavBar class="mb-3" />
          <div class="header p-3">
            <div class="title">
              <h2 class="text-light">Mustafa's Account Preferences</h2>
            </div>
          </div>
          <div class="bigbox m-3 p-3 border border-2 rounded-3">
            <div class="row justify-content-between">
              <div class="profileSection col-md-5">
                <div class="title mb-4">
                  <h3>Profile Settings</h3>
                </div>
                <div class="avatar d-flex align-items-center gap-3">
                  <div class="image">
                    <img
                      src="/images/logo.jpg"
                      class="img-fluid rounded-pill"
                      style="width: 4rem"
                      alt=""
                    />
                  </div>
                  <div class="adminName rounded-3">
                    <p class="m-0">Mustafa Kullab</p>
                  </div>
                </div>

                <div class="adminDetails my-3">
                  <div class="fullName d-flex justify-content-between align-items-center">
                    <p class="m-0">Full Name</p>
                    <span class="boxVal rounded-3 border border-2">Mustafa Khalil Kullab</span>
                  </div>
                  <div class="email my-3 d-flex justify-content-between align-items-center">
                    <p class="m-0">Email Address</p>
                    <span class="boxVal rounded-3 border border-2">mustafakullab@gmail.com</span>
                  </div>
                </div>
              </div>
              <div class="changePasswordSection col-md-5">
                <div class="title">
                  <h3>Change Password</h3>
                </div>
                <form class="mt-4">
                  <input
                    type="text"
                    placeholder="Current Password"
                    class="form-control mb-3"
                    v-model="oldPass"
                  />
                  <input
                    type="text"
                    placeholder="New Password"
                    class="form-control mb-3"
                    v-model="newPass"
                  />
                  <input
                    type="text"
                    placeholder="Confirm Password"
                    class="form-control mb-3"
                    v-model="confPass"
                  />
                  <button class="btn changePassBtn" @click="changePass">Change Password</button>
                </form>
              </div>
            </div>
            <div class="logOut text-center mt-3" @click.prevent="logout">
              <router-link class="btn w-50" :to="{ name: 'login' }">Log out</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import SideBar from "@/components/SideBar.vue";
import NavBar from "@/components/NavBar.vue";
import { useUsersStore } from "@/stores/usersStore";
import { useRouter } from "vue-router";
const userStore = useUsersStore();
const router = useRouter();
const oldPass = ref("");
const newPass = ref("");
const confPass = ref("");
const validateMsg = ref("");

const logout = () => {
  localStorage.setItem("isAuthenticated", "false");
  localStorage.setItem("currentUser", null);
  userStore.isAuthenticated = false;
  userStore.currentUser = null;
  router.push({ name: "login" });
};
console.log(userStore.admin.password);
const changePass = () => {
  if (!oldPass.value || !newPass.value || !confPass.value) {
    validateMsg.value = "Not Allow To Let Any Field Empty";
    return;
  } else if (oldPass.value !== userStore.admin.password) {
    validateMsg.value = "Old Password Is Wrong";
    return;
  } else if (newPass.value !== confPass.value) {
    validateMsg.value = "All New Password must be equal";
    return;
  }
  localStorage.setItem("newPass", newPass.value);
  oldPass.value = "";
  newPass.value = "";
  confPass.value = "";
};
</script>

<style lang="scss" scoped>
.sidebar {
  background-color: var(--sidebar-color);
  @media (min-width: 768px) {
    min-height: 100vh;
  }
}
.bigbox {
  background-color: #2e3337 !important;
  color: #adadaf !important;
  border-color: #37595a !important;
  .adminName {
    padding: 10px;
    background-color: #3d464d !important;
    border: 2px solid #4c5154 !important;
    color: #b1b9bc !important;
  }
  .boxVal {
    background-color: #262b2f !important;
    width: 250px;
    padding: 10px;
    border-color: #37595a !important;
  }
  .changePasswordSection {
    input {
      background-color: #26292e !important;
      border-color: #37595a !important;
      border-width: 2px !important;
      box-shadow: none;
      color: #adadaf;
      &::placeholder {
        color: #adadaf;
      }
    }
  }
  .logOut {
    a {
      font-weight: bold;
      color: #adadaf !important;
      background-color: #202427 !important;
      &:hover {
        background-color: #1b1f21 !important;
      }
    }
  }
}
.changePassBtn {
  background-color: #202427;
  border: 2px solid #202528;
  color: #adadaf;
  transition: 0.4s;
  &:hover {
    background-color: #1b1f21;
  }
}
</style>
