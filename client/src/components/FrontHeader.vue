<template>
  <div>
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
            <li class="nav-item active" role="presentation">
              <router-link :to="{ name: 'front' }"><i class="fas fa-home"></i>หน้าหลัก&nbsp;&nbsp;</router-link>
            </li>
            <li class="nav-item" v-if="!isUserLoggedIn" role="presentation">
              <a href="#" v-on:click.prevent="showLogin = true"> <i class="fas fa-users"></i>ล็อกอิน&nbsp;&nbsp;</a>
            </li>
            <li class="nav-item" v-if="!isUserLoggedIn" role="presentation">
              <a href="#" v-on:click.prevent="showRegister = true"><i class="fas fa-user-circle "></i>ลงทะเบียน</a>
            </li>
            <transition name="fade">
              <li v-if="isUserLoggedIn" role="presentation">
                <router-link v-bind:to="{ name: 'login' }">{{
                  user.name
                }}</router-link>
              </li>
            </transition>
            <li class="nav-item" v-if="isUserLoggedIn" role="presentation">
              <a href="/booking" ><i class="fas fa-arrow-alt-circle-down"></i>&nbsp;จองห้องพัก</a>
            </li>
            
            <li class="nav-item" v-if="isUserLoggedIn" role="presentation">
              <a href="#" v-on:click.prevent="logout">&nbsp;<i class="fas fa-sign-out-alt"></i>ออกจากระบบ</a>
            </li>
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
    <div class="modal" v-if="showLogin">
      <transition name="fade">
        <div class="login-wrapper">
          <h3><i class="fas fa-sign-out-alt"></i>เข้าสู่ระบบ</h3>
          <form v-on:submit.prevent="clientLogin" class="form-horizontal">
            <div class="form-group">
              <label class="control-label col-md-4"><i class="fas fa-envelope"></i>อีเมล:</label>
              <div class="col-md-9">
                <input
                  placeholder="email"
                  type="text"
                  v-model="email"
                  class="form-control"
                />
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-md-4"><i class="fas fa-unlock"></i>รหัสผ่าน:</label>
              <div class="col-md-9">
                <input
                  type="password"
                  placeholder="password"
                  v-model="password"
                  class="form-control"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="col-md-offset-3 col-md-9">
                <button class="btn btn-success btn-sm" type="submit">
                  <i class="fas fa-sign-in-alt"></i> เข้าสู่ระบบ
                </button>
                <button
                  v-on:click.prevent="showLogin = false"
                  class="btn btn-danger btn-sm"
                  type="button"
                >
                <i class="far fa-window-close"></i> ปิด
                </button>
              </div>
            </div>
            <div class="error">
              <p v-if="error">{{ error }}</p>
            </div>
          </form>
        </div>
      </transition>
    </div>
    <div class="modal" v-if="showRegister">
      <transition name="fade">
        <div class="login-wrapper">
          <h3><i class="fas fa-registered"></i>สมัครสมาชิก</h3>
          <form v-on:submit.prevent="clientRegister" class="form-horizontal">
            <div class="form-group">
              <label class="control-label col-md-4"><i class="fas fa-envelope"></i>อีเมล:</label>
              <div class="col-md-9">
                <input
                  required
                  placeholder="email"
                  type="email"
                  v-model="user.email"
                  class="form-control"
                />
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-md-4"><i class="fas fa-unlock"></i>รหัสผ่าน:</label>
              <div class="col-md-9">
                <input
                  required
                  type="password"
                  placeholder="password"
                  v-model="user.password"
                  class="form-control"
                />
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-md-3"><i class="fas fa-user"></i>ชื่อ:</label>
              <div class="col-md-9">
                <input
                  required
                  type="text"
                  placeholder="name"
                  v-model="user.name"
                  class="form-control"
                />
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-md-4"><i class="fas fa-user"></i>นามสกุล:</label>
              <div class="col-md-9">
                <input
                  required
                  type="text"
                  placeholder="lastname"
                  v-model="user.lastname"
                  class="form-control"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="col-md-offset-3 col-md-9">
                <button class="btn btn-success btn-sm" type="submit">
                 <i class="far fa-registered"></i> ลงทะเบียน
                </button>
                <button
                  v-on:click.prevent="showRegister = false"
                  class="btn btn-danger btn-sm"
                  type="button"
                >
                  <i class="far fa-window-close"></i> ปิด
                </button>
              </div>
            </div>
            <div class="error">
              <p v-if="error">{{ error }}</p>
            </div>
          </form>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div v-if="resultUpdated != ''" class="popup-msg">
        <p>{{ resultUpdated }}</p>
      </div>
    </transition>
  </div>
</template>
<script>
import { mapState } from "vuex";
import AuthenService from "@/services/AuthenService";
import UsersService from "@/services/UsersService";
export default {
  data() {
    return {
      email: "",
      password: "",
      error: "",
      showLogin: false,
      showRegister: false,
      resultUpdated: "",
      user: {
        name: "",
        lastname: "",
        email: "",
        password: "",
        status: "active",
        type: "user",
      },
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user"]),
  },
  methods: {
    logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      // this.$router.push({
      // name: 'login'
      // })
      this.resultUpdated = "Logout successful.";
      setTimeout(() => (this.resultUpdated = ""), 3000);
    },
    async clientLogin() {
      console.log(`acc: ${this.email} -${this.password}`);
      try {
        const response = await AuthenService.clientLogin({
          email: this.email,
          password: this.password,
        });
        this.error = "";
        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);
        // this.$router.push({
        // name: 'blogs'
        // })
        // console.log(response.data)
        (this.email = ""), (this.password = ""), (this.showLogin = false);
        this.resultUpdated = "Login successful.";
        setTimeout(() => (this.resultUpdated = ""), 3000);
      } catch (error) {
        console.log(error);
        this.error = error.response.data.error;
        this.email = "";
        this.password = "";
        setTimeout(() => (this.error = ""), 3000);
      }
    },
    async clientRegister() {
      try {
        await UsersService.post(this.user);
        this.$router.push({
          name: "front",
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<style scoped>
.error {
  color:#79994a;
  text-align: center;
}
.popup-msg {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  border: solid 1px #88c4d1;
  background: #3d9ab1;
  max-width:250px;
  padding: 5px;
  position: fixed;
  bottom: 0;
  right: 0;
  border-radius: 5px;
  margin-bottom: 5px;
  margin-right: 5px;
}
.bg-light {
    background-color: #88c4d1!important;
}
.modal {
  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 10; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color:#543689(0, 0, 0); /* Fallback color */
  background-color: #857350(0, 0, 0, 0.4); /* Black w/ opacity */
}
.login-wrapper {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  border: solid 1px #6598;
  width: 420px;
  padding: 10px 30px 20px 30px;
  background-color: #88c4d1;
  margin: 15% auto; /* 15% from the top and centered */
  /* padding: 20px; */
}
.login-wrapper h3 {
  text-align: center;
  padding-bottom: 10px;
}
</style>
