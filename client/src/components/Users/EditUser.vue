<template>
  <div><center>
    <main-header navsel="back"></main-header>
       &nbsp;
    <h1>แก้ไขข้อมูลผู้ใช้</h1>
    <form v-on:submit.prevent="editUser">
      <p>name: <input class="form-control" style="width: 30%; " type="text" v-model="user.name" /></p>
      <p>lastname: <input class="form-control" style="width: 30%; "  type="text" v-model="user.lastname" /></p>
      <p>email: <input class="form-control" style="width: 30%; " type="text" v-model="user.email" /></p>
      <p>password: <input class="form-control" style="width: 30%; " type="text" v-model="user.password" /></p>
      <p><button class="btn btn-outline-info" type="submit">edit user</button></p>
    </form>
    <hr />
    <div>
      <p>name: {{ user.name }}</p>
      <p>lastname: {{ user.lastname }}</p>
      <p>email: {{ user.email }}</p>
      <p>password: {{ user.password }}</p>
      <p></p>
    </div></center>
  </div>
</template>
<script>
import UsersService from "@/services/UsersService";

export default {
  data() {
    return {
      user: {
        name: "",
        lastname: "",
        email: "",
        password: "",
        status: "active",
      },
    };
  },
  methods: {
    async editUser() {
      try {
        await UsersService.put(this.user);
        this.$router.push({
          name: "users",
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
  async created() {
    try {
      let userId = this.$route.params.userId;
      this.user = (await UsersService.show(userId)).data;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
<style scoped>
</style>