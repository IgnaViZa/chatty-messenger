<template>
  <!-- <div class="home"> 
    <img alt="Vue logo" src="../assets/logo.png"> 
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <button @click="logout">Logout</button>
  </div> -->
  <!-- intento de logear para chatear-->
  <div id="app">
    
     
    <div>

      <div>
            <h4>People in the chat:</h4>
            <div v-for="message in nouser" :key="message.username">
            <!--sending param from tag route-link to a other page-->  
            <p><router-link :to="{ name: 'About', params: {nameprivate: message.username} }"
            target="_blank">Chat with {{message.username}} :D</router-link> </p>
            
            </div>
            <!-- <ul>
               <li>{{username}}</li> 
            </ul> -->
      </div>

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
import {database, auth} from '@/fire.js'
export default {
  name: 'app',
  data() {
    return {
      username: '',
      messages: [],
      ide: null
    }
  },
  methods: {
    sendMessage(e) {
      e.preventDefault();
      if(e.target.value){
        
        const message = { //VAR WHO WILL PUSH THE DATA TO TABLE FIREBASE
          username: this.username,
          text: e.target.value
        }
        database.ref('messages').push(message); // INTERNAL PUSH TO TABLE DATABASE
        e.target.value = ''
      }
    }
  },
  mounted(){
    let vm = this;
    this.username = auth.currentUser.email//setting actual userlogged
    const itemsRef = database.ref('messages');//setting the ref to db
    itemsRef.on('value', snapshot => {
      let data = snapshot.val();
      let messages = [];
      Object.keys(data).forEach(key => { //getting all the datas from table messages 
        messages.push({
          id: key,
          username: data[key].username,
          text: data[key].text
        });
      });
      vm.messages = messages;
    })
    // deleting the same email as the logged user
    const itemsRefi = database.ref('users');
    itemsRefi.on('value', snapshot => {
      let data = snapshot.val();
      let messages = [];
      Object.keys(data).forEach(key => {
      // Making "if" to ask wich username is wich username
       if (this.username != data[key].email)
         { 
          messages.push({
            username: data[key].email,
          });
        }
      });
      vm.nouser = messages;
      console.log(nouser)
      //vm.users = Object.values(vm.nouser.reduce((prev,next)=>Object.assign(prev,{[next.username]:next}),{})); //Deleting from the array the equasl parameters
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
  margin-top: 30px;
}
.messages {
  text-align: center;
}
.message {
  border: #000 solid 4px;
  padding: 6px;
  margin: 6px;
  width: 500px;
}
</style>