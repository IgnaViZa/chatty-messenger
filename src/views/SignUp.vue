<template>
    <div class="sign-up">
        <p>Let's create anew account! Yeeei </p>
        <input type="text" v-model="email" placeholder="Email"><br>
        <input type="password" v-model="password" placeholder="Password"><br>
        <button @click="signUp">Sign Up</button>
        <span>Or go back to the shadows<router-link to="/login"> login </router-link>.</span>
    </div>    
</template>

<script>
    //import firebase from 'firebase';
    import {database, auth} from '@/fire.js'
export default {
    name:'signUp',
    data(){
        return{
            email: '',
            password: ''
        }
    },
    methods:{
        signUp: function() {
            auth.createUserWithEmailAndPassword(this.email, this.password).then(
                (user) => {
                    alert('your account has been created my son!!')
                    const logged = { //VAR WHO WILL PUSH THE DATA TO TABLE FIREBASE
                            email: this.email,
                            password: this.password
                        }
                        database.ref('users').push(logged)
                    this.$router.replace('home')
                },
                (err) => {
                    alert('Whopsi error: ' + err.message)
                }
            );
            
        }
    }
}       

</script>

<style scoped>
    .signUp{
        margin-top: 40pc;
    }
    input{
        margin: 10px 0;
        width: 20%;
        padding: 15px;
    }
    button{
        margin-top: 10px;
        width: 10%;
        cursor: pointer;
    }
    span{
        display: block;
        margin-top: 20px;
        font-size: 11px;
    }
</style>
