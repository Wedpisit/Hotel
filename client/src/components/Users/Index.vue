<template>
  <div>
    
      <main-header navsel="back"></main-header>
      <hr><center><h2>ข้อมูลผู้ใช้</h2>
      <hr><h4>จำนวนผู้ใช้งาน : {{ user.length }} คน</h4>
      <p>
        <button class="btn btn-outline-secondary" v-on:click="navigateTo('/user/create')">สร้างผู้ใช้งาน</button>
      </p></center>
          <table class="table table-bordered">
            
          <thead class="thead-blue">
            <tr class="table-info">
              <th scope="col">id:</th>
              <th scope="col">ชื่อ:</th>
              <th scope="col">นามสกุล:</th>
              <th scope="col">email:</th>
              <th scope="col">password:</th>
              <th scope="col">ดู</th>
              <th scope="col">แก้ไข</th>
              <th scope="col">ลบ</th>
            </tr>
          </thead>
          
      
          <tbody>
            <tr v-for="user in user" v-bind:key="user.id">
              <th >{{ user.id }}</th>
              <th>{{ user.name }}</th>
              <th>{{ user.lastname }}</th>
              <th>{{ user.email }}</th>
              <th>{{ user.password }}</th>
              <th>
                <button   class="btn btn-outline-success btn-sm" v-on:click="navigateTo('/user/' + user.id)">
                  <i class="far fa-eye"></i>ดูข้อมูล
                </button>
              </th>
              <th>
                <button class="btn btn-outline-info btn-sm" v-on:click="navigateTo('/user/edit/' + user.id)">
                  <i class="far fa-edit"></i>แก้ไขข้อมูล
                </button>
              </th>
              <th><button class="btn btn-outline-danger btn-sm" v-on:click="deleteUser(user)"><i class="fas fa-trash-alt"></i>ลบข้อมูล</button></th>
            </tr>
          </tbody>
        </table>
        <!--<p><button v-on:click="logout">Logout</button></p>-->
        <hr />
      </div>
   
  
</template>
<script>
import UsersService from "@/services/UsersService";
export default {
  data() {
    return {
      user: [],
    };
  },
  async created() {
    this.user = (await UsersService.index()).data;
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
    logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      this.$router.push({
        name: "login",
      });
    },
    async deleteUser(user) {
      try {
        await UsersService.delete(user);
        this.refreshData();
      } catch (err) {
        console.log(err);
      }
    },
    async refreshData() {
      this.user = (await UsersService.index()).data;
    },
  },
};
</script>
<style scoped>
</style>
