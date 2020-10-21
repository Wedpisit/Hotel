<template>
    <center><main-header navsel="back"></main-header><div>
        <h1>admin Login</h1>
        <form v-on:submit.prevent="onLogin">
            <p>Username: <input type="text" class="form-control" style="width: 30%; " v-model="email" /></p>
            <p>Password: <input type="password" class="form-control" style="width: 30%; " v-model="password" /></p>
            <p> <button type="submit" class="btn btn-outline-info">Login</button></p>
            <div class="error" v-if="error">{{error}}</div>
        </form>
    </div></center>
</template>
<script>
import AuthenService from '@/services/AuthenService'

export default {
    data () {
        return {
            email: '',
            password: '',
            error: null
        }
    },
    methods: {
        async onLogin () {
            try {
                const response = await AuthenService.login({
                    email: this.email,
                    password: this.password
                })

                this.$store.dispatch('setToken', response.data.token)
                this.$store.dispatch('setUser', response.data.user)
                this.$router.push({
                    name: 'users'
                })

                console.log(response)
            } catch (error) {
                console.log(error)
                this.error = error.response.data.error
                this.email = ''
                this.password = ''
            }
        }
    }
}
</script>
<style scoped>
    .error {
        color :#79994a;
    }
</style>