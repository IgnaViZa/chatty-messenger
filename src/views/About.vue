<template>
  <div id="app">
    <div>
      <strong> ESTA ES LA PAGINA PARA CHAT PRIVADO ASI TAL CUAL </strong>
      <div>
           <!-- <div v-for="message in messages" :key="message.username">
            <p><router-link to="/about" target="_blank">Chat with {{message.username}} :D</router-link> </p></div>
           -->
            <h3>Chateando con {{ide}}</h3>
      </div>

      <div>
        Yo : {{username}}<br />
        Mi mensaje:<br />
        <textarea name="" id="" cols="30" rows="10" 
        placeholder="New Message" v-on:keyup.enter="sendMessage">
        </textarea>
      </div>

      <hr>
      <div class="messages">
        <h3>Chat</h3>
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
        
        const message = {
          username: this.username,
          username2: this.$route.params.nameprivate,
          text: e.target.value
        }
        database.ref('messagesprivates').push(message);
        e.target.value = ''
      }
    }
  },
  mounted(){
    let vm = this;
    this.username = auth.currentUser.email
    this.ide = this.$route.params.nameprivate //taking the param from tag route-link
    const itemsRef = database.ref('messagesprivates');
    itemsRef.on('value', snapshot => {
      let data = snapshot.val();
      let messages = [];
      Object.keys(data).forEach(key => {
      // Making "if" to ask wich username is wich username
       if ((this.username == data[key].username &&  this.ide == data[key].username2)
       || (this.username == data[key].username2 &&  this.ide == data[key].username))
         { 
          messages.push({
            id: key,
            username: data[key].username,
            username2: data[key].username2,
            text: data[key].text
          });
        }
      });
      vm.messages = messages;
      
    })
  }
}
</script>

<style>
</style>