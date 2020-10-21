<template>
  <div>
    <main-header navsel="back"></main-header>
    <center><hr><h2>ข้อมูลการจองห้องพักทั้งหมด</h2>
    <hr><h4>จำนวนการจอง : {{ booking.length }} ครั้ง</h4></center>
    
    <table class="table table-bordered">
            
          <thead class="thead-blue">
            <tr class="table-info">
              <th scope="col">id</th>
              <th scope="col">ชื่อห้อง</th>
              <th scope="col">วันที่เข้าพัก</th>
              <th scope="col">จำนวนคน</th>
              <th scope="col">เบอร์ติดต่อ</th>
              <th scope="col">ลบ</th>
              <th scope="col">ดู</th>
              <th scope="col">แก้ไข</th>
              
            </tr>
          </thead>
          
       <tr v-for="booking in booking" v-bind:key="booking.id">
      <th>{{ booking.id }}</th>
      <td>{{ booking.name }}</td>
      <td>{{ booking.date }}</td>
     <td>{{ booking.num }}</td>
      <td>{{ booking.tel }}</td>
      <td><button class="btn btn-outline-danger" v-on:click="deleteBooking(booking)">
        <i class="fas fa-trash-alt"></i>ลบข้อมูล</button>
        <td>
                <button   class="btn btn-outline-success btn-sm" v-on:click="navigateTo('/booking/' + booking.id)">
                  <i class="far fa-eye"></i>ดูข้อมูลการจอง
                </button>
              </td>
              <td>
                <button class="btn btn-outline-info btn-sm" v-on:click="navigateTo('/booking/edit/' + booking.id)">
                  <i class="far fa-edit"></i>แก้ไขข้อมูลการจอง
                </button>
              </td>
       </tr>
          
          
        </table>
      
      <!--<button v-on:click="navigateTo('/booking/' + booking.id)">ดูข้อมูล</button> 
      <button v-on:click="navigateTo('/booking/edit/' + booking.id)">
        แก้ไขข้อมูล
      </button>-->
      
      
      
      <hr />
      
    </div>
    
  
  
</template>
<script>
import BookingService from "@/services/BookingService";

export default {
  data() {
    return {
      booking: [],
    };
  },
  async created() {
    this.booking = (await BookingService.index()).data;
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
    async deleteBooking(booking) {
      try {
        await BookingService.delete(booking);
        this.refreshData();
      } catch (err) {
        console.log(err);
      }
    },
    async refreshData() {
      this.booking = (await BookingService.index()).data;
    },
  },
};
</script>
<style scoped>
</style>