<template>
    <div><center>
        <main-header navsel="back"></main-header>
        <hr>
        <h2>รีวิวทั้งหมด</h2>
        
        <hr><h4>จำนวนการรีวิว : {{comments.length}} ครั้ง</h4></center>
        <table class="table table-bordered">
            
            
            <tr v-for="comment in comments" v-bind:key="comment.id" >
            <td><b>id:</b> {{ comment.id }}</td>
            <td><b>Roomid:</b> {{ comment.blogId }}</td>
            <td><b>รีวิว ข้อความ:</b> {{ comment.comment }}</td>
            <td>
                <button class="btn btn-outline-danger" v-on:click="deleteComment(comment)"><i class="fas fa-trash-alt"></i>&nbsp;ลบข้อมูล</button>
            </td>
            </tr>
            </table>
            <hr>
        </div>
    
</template>
<script>
import CommentsService from '@/services/CommentsService'
import {mapState} from 'vuex'

export default {
    data () {
        return {
            comments: []
        }
    },
    async created () {
        this.comments = (await CommentsService.index()).data
    },
    methods: {
        logout () {
            this.$store.dispatch('setToken', null)
            this.$store.dispatch('setComment', null)
            this.$router.push({
                name: 'login'
            })
        },
        navigateTo (route) {
            this.$router.push(route)
        },
        async deleteComment (comment) {
            try {
                await CommentsService.delete(comment)
                this.refreshData()
            } catch (err) {
                console.log(err)
            }
        },
        async refreshData() {
            this.comments = (await CommentsService.index()).data
        },
        async editComment(){
            try{
                await CommentsService.put(comment)
            }catch(err){
                console.log(err)
            }
        }
    }
}
</script>
<style scoped>
</style>