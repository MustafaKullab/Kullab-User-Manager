<template>
  <div class="SettingsPage">
    <div class="container-fluid">
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
        <div class="col-md-10 p-0"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  background-color: var(--sidebar-color);
  @media (min-width: 768px) {
    min-height: 100vh;
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
</style>
