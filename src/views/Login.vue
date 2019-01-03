<template>
    <div class="login">
        <h3>Sign I</h3>
        <input type="text" v-model="email" placeholder="Email"><br>
        <input type="password" v-model="password" placeholder="Password"><br>
        <button @click="login">Connection</button>
        <p> You don have an account ? You can<router-link to="/sign-up"> create one</router-link> </p>
    </div>
</template>
    
<script>
import firebase from 'firebase';

export default {
    name: 'login',
    data(){
        return{
            email: '',
            password: ''
        }
    },
    methods: {
        login: function() {
            firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
                (user) => {
                    console.log('Well done son ! You are now connected with me :v')
                    this.$router.replace('Home')
                },
                (err) => {
                    alert('Whoopsi ' + err.message)
                }
            );
        }
    }
}
</script>

<style scoped>
</style>