<template>
  <div id="app">
    <div>
      <h5>Massinger</h5>
      <img alt="Vue logo" src="./assets/messenger-icon.jpg"> 
      <br>
      <button @click="logout">Logout</button>
    </div>
    <router-view/>
  </div>
</template> 

<script>
//import {database} from '@/fire.js'
import firebase from 'firebase';
export default {
  
  methods:{
    
    logout: function(){
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    }
  }
}
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<!-- message de chat sin login
<template>
  <div id="app">
    <div v-if="!username">
      You can't chat without a name. What's your name? <br />
      <input type="text" placeholder="Name" v-on:keyup.enter="updateUsername">
    </div>
    <div v-else>
      <div>
        From : {{username}}<br />
        Message:<br />
        <textarea name="" id="" cols="30" rows="10" 
        placeholder="New Message" v-on:keyup.enter="sendMessage">

        </textarea>
      </div>
      <hr>
      <div class="messages">
        <h3>Messages</h3>
        <div class="message" v-for="message in messages" :key="message.username">
          <strong>{{message.username}}</strong>
          <p>{{message.text}}</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {database} from '@/fire.js'
export default {
  name: 'app',
  data() {
    return {
      username: '',
      messages: []
    }
  },
  methods: {
    updateUsername(e) {
      e.preventDefault();
      if(e.target.value){
        this.username = e.target.value;
      }
    },
    sendMessage(e) {
      e.preventDefault();
      if(e.target.value){
        
        const message = {
          username: this.username,
          text: e.target.value
        }
        database.ref('messages').push(message);
        e.target.value = ''
      }
    }
  },
  mounted(){
    let vm = this;
    //console.log(fire)
    const itemsRef = database.ref('messages');
    itemsRef.on('value', snapshot => {
      let data = snapshot.val();
      let messages = [];
      Object.keys(data).forEach(key => {
        messages.push({
          id: key,
          username: data[key].username,
          text: data[key].text
        });
      });
      vm.messages = messages;
    })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.messages {
  text-align: left;
}
.message {
  border: #000 solid 2px;
  padding: 5px;
  margin: 5px;
  width: 200px;
}
</style> -->