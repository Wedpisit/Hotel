<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">
        <img
          src="../assets/hotelone.png"
          width="30"
          height="30"
          class="d-inline-block align-top"
          alt=""
          loading="lazy"
        />
        <span class="font1">ระบบจองห้องพักในโรงแรม</span>
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active" v-if="isUserLoggedIn" role="presentation">
            <router-link :to="{ name: 'blogs' }"
              >ข้อมูลห้องพัก&nbsp;&nbsp;</router-link
            >
          </li>
          <li class="nav-item" v-if="isUserLoggedIn" role="presentation">
            <router-link :to="{ name: 'users' }"
              >ข้อมูลผู้ใช้&nbsp;&nbsp;</router-link
            >
          </li>
          <li class="nav-item" v-if="isUserLoggedIn" role="presentation">
            <a href="/bookings">ข้อมูลการจองห้องพัก&nbsp;&nbsp;</a>
          </li>
          <li class="nav-item" v-if="isUserLoggedIn" role="presentation">
            <router-link :to="{ name: 'comments' }"
              >รีวิวจากผู้ใช้&nbsp;&nbsp;</router-link
            >
          </li>
          <li class="nav-item" v-if="!isUserLoggedIn" role="presentation">
            <router-link :to="{ name: 'login' }">Login</router-link>
          </li>
          <li class="nav-item" v-if="isUserLoggedIn" role="presentation"><a v-on:click.prevent="logout" href="#">ออกจากระบบ</a></li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="ค้นหาห้องพัก"
            aria-label="Search"
          />
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
            ค้นหา
          </button>
        </form>
      </div>
    </nav>
  </div>
</template>
<script>
import { mapState } from "vuex";
import AuthenService from "@/services/AuthenService";
import UsersService from "@/services/UsersService";

export default {
  methods: {
    logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      this.$router.push({
        name: "login",
      });
    },
    navigateto(route){
      this.$router.push(route)
     
    },
    
  },
  computed: {
  ...mapState(["isUserLoggedIn", "user"]),
  },
};
</script>
<style scoped>
.bg-light {
  background-color: #88c4d1 !important;
}
</style>