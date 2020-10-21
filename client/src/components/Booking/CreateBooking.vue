<template>
  <center>
  <div>
    <main-header navsel="front"></main-header>
<br>
    <h1><i class="fas fa-hotel"></i>จองห้องพัก</h1> 
    <form v-on:submit.prevent="createBooking">
  
      <p><i class="fas fa-user"></i> ชื่อห้อง <input  type="text" class="form-control" v-model="booking.name" style="width: 30%; " /></p>
      <p><i class="far fa-calendar-alt"></i> วันที่ <input type="date" class="form-control" v-model="booking.date"  style="width: 30%; "/></p>
      <p><i class="fas fa-user-check"></i> จำนวนคน <input type="number" class="form-control" v-model="booking.num" style="width: 30%; " /></p>
      <p><i class="fas fa-phone-volume"></i> เบอร์ติดต่อ <input type="text" class="form-control" v-model="booking.tel" style="width: 30%; " /></p>
      <button type="submit" class="btn btn-outline-info">ส่ง</button>
    </form>
    <hr />
    <div>
      <p>ชื่อห้อง: {{ booking.name }}</p>
      <p>วันที่: {{ booking.date }}</p>
      <p>จำนวนคน: {{ booking.num }}</p>
      <p>เบอร์โทรติดต่อ: {{ booking.tel }}</p>
    </div>
  </div>
  </center>
</template>
<script>
import BookingService from "@/services/BookingService";

export default {
  data() {
    return {
      booking: {
        name: "",
        date: "",
        num: "",
        tel: "",
      },
    };
  },
  methods: {
    async createBooking() {
      try {
        await BookingService.post(this.booking);
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
</style>