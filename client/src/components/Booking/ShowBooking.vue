<template>
<center>
  <div>
    <main-header navsel="back"></main-header>
     &nbsp;
    <h1>ดูข้อมูลผู้ใช้</h1>
    <p>id: {{ booking.id }}</p>
    <p>ชื่อห้องพัก : {{ booking.name }} </p>
    <p>วันที่ : {{ booking.date }}</p>
    <p>จำนวนคน : {{ booking.num }}</p>
    <p>เบอร์ติดต่อ : {{ booking.tel }}</p>
  </div> </center>

</template>
<script>
import BookingService from "@/services/BookingService";

export default {
  data() {
    return {
      booking: null,
    };
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

