<template>
<center>
  <div>
    <main-header navsel="back"></main-header>
     &nbsp;
    <h1>ดูข้อมูลผู้ใช้</h1>
    <p>id: {{ user.id }}</p>
    <p>ชื่อ-นามสกุล : {{ user.name }} - {{ user.lastname }}</p>
    <p>email: {{ user.email }}</p>
    <p>password: {{ user.password }}</p>
  </div> </center>
</template>
<script>
import UsersService from "@/services/UsersService";

export default {
  data() {
    return {
      user: null,
    };
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