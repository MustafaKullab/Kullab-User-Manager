<template>
  <div class="NavBar">
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand text-light" href="#">Admin Dashboard Overview</a>
        <div class="logo d-flex align-items-center gap-2">
          <div class="logo-card d-flex align-items-center gap-2">
            <div class="image">
              <img
                src="/images/logo.jpg"
                class="img-fluid rounded-pill"
                style="width: 2rem"
                alt="admin"
              />
            </div>
            <div class="name">Mustafa</div>
          </div>
          <div class="icon">
            <i class="bi bi-bell text-light"></i>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.NavBar {
  .navbar {
    background-color: var(--navbar-color) !important;
    .image {
      img {
        object-fit: cover;
      }
    }
    .logo-card {
      background-color: #3b424a !important;
      padding: 5px;
      border-radius: 8px;
      border: 2px solid #4e5659;
      color: white;
    }
  }
}
.navbar-brand {
  @media (max-width: 767px) {
    font-size: 16px !important;
  }
}
</style>
