<template>
  <div><center>
    <main-header navsel="back"></main-header>
       &nbsp;
    <h1>แก้ไขข้อมูลผู้ใช้</h1>
    <form v-on:submit.prevent="editBooking">
      <p>ชื่อห้องพัก: <input class="form-control" style="width: 30%; " type="text" v-model="booking.name" /></p>
      <p>วันที่: <input class="form-control" style="width: 30%; "  type="text" v-model="booking.date" /></p>
      <p>จำนวนคน: <input class="form-control" style="width: 30%; " type="text" v-model="booking.num" /></p>
      <p>เบอร์ติดต่อ: <input class="form-control" style="width: 30%; " type="text" v-model="booking.tel" /></p>
      <p><button class="btn btn-outline-info" type="submit">edit booking</button></p>
    </form>
    <hr />
    <div>
      <p>ชื่อห้องพัก: {{ booking.name }}</p>
      <p>วันที่: {{ booking.date }}</p>
      <p>จำนวนคน: {{ booking.num }}</p>
      <p>เบอร์ติดต่อ: {{ booking.tel }}</p>
      <p></p>
    </div></center>
  </div>
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
    async editBooking() {
      try {
        await BookingService.put(this.booking);
        this.$router.push({
          name: "booking",
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
  async created() {
    try {
      let bookingId = this.$route.params.bookingId;
      this.booking = (await BookingService.show(bookingId)).data;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
<style scoped>
</style>