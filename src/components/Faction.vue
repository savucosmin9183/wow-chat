<template>
  <div class="faction_div" 
    :class="{
      'alliance_div': alliance == true,
      'horde_div': alliance == false }">
    <form @submit.prevent :class="{'alliance_form': alliance == true,
                                    'horde_form': alliance == false}">
      <label class="form_label" for="name">Enter your name:</label>
      <img v-if="avatar" class="avatar" :src="avatar.src" :alt="avatar.alt">
      <input class="form_input grey" type="text" name="name" v-model="name">
      <p v-if="feedback" class="red-text">{{feedback}}</p>
      <div>
        <button @click="chooseAvatar" class="btn enter_button">Choose avatar</button>
        <button @click="enterChat" class="btn enter_button">Enter Chat</button>
      </div>
    </form>
    <modal name="popup" height="420">
        <div class="popup">
          <h1>Choose an avatar:</h1>
            <vue-select-image :dataImages="images"
                    @onselectimage="onSelectImage">
            </vue-select-image>
          <button @click="submit_clicked" class="btn choose_button">Close</button>
        </div>
    </modal>
  </div>
</template>

<script>
import VueSelectImage from 'vue-select-image'
import db from '@/firebase/init'
// add stylesheet
require('vue-select-image/dist/vue-select-image.css')

export default {
  name: 'Faction',
  data () {
    return {
      name: null,
      images: [],
      avatar: null,
      feedback: null,
    }
  },
  props: ['alliance'],
  components: {
    VueSelectImage
  },
  methods: {
    enterChat(){
      if(this.name && this.avatar){
        this.$router.push({
          name: 'Chat',
          params: { name: this.name,
                    avatar: this.avatar,
                    alliance: this.alliance }
        })
      }else{
        this.feedback = 'You must have a name and an avatar!'
      }
    },
    chooseAvatar(){
      this.$modal.show('popup')
    },
    onSelectImage(image){
      this.avatar = image;
    },
    submit_clicked(){
      this.$modal.hide('popup')
    }
  },
  created(){
      db.collection(this.alliance ? 'alliance_leaders' : 'horde_leaders').get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let image = {};
          let img = doc.data();
          image.src = img.image;
          image.alt = img.name;
          image.id = doc.id;
          this.images.push(image);
        })
      })
      .catch(err => {
        console.log(err);
      })

    this.music = this.alliance ? [this.swsong] : [this.orgsong];
    
  }
}
</script>


<style>

@font-face {
  font-family: wowfont;
  src: url('../assets/fonts/LifeCraft_Font.woff');
}



.faction_div{
  height: 100vh;
  width: 100vw;
  background-size: cover; /* or contain depending on what you want */
  background-position: center center;
  background-repeat: no-repeat;
}
.alliance_div{
   background-image: url('../assets/images/alliance_background.jpg');
}

.horde_div{
  background-image: url('../assets/images/horde_background.jpg');
}

.btn{
  font-family: wowfont;
}
.enter_button{
  margin-right: 10px;
}

.btn:hover{
  box-shadow: 0 0 9px 2px black;
}

.alliance_div .vue-select-image__thumbnail--selected{
  background: #255fb0;
}

.horde_div .vue-select-image__thumbnail--selected {
    background: #800103;
}

.horde_div .choose_button{
  background-color: #800103;
  margin-top: 20px;
  padding-left: 30px;
  padding-right: 30px;
  font-size: 20px;
  color: black;
  margin-bottom: 20px;
}

.alliance_div .choose_button{
  background-color: #255fb0;
  margin-top: 20px;
  padding-left: 30px;
  padding-right: 30px;
  font-size: 20px;
  color: black;
  margin-bottom: 20px;
}

.faction_div .form_label{
  color: white;
  font-family: wowfont;
  font-size: 60px;
  
}

.horde_form{
  position:absolute;
  right: 10%;
  top: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  
}


.alliance_form{
  position:absolute;
  left: 5%;
  top: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  
}



.faction_div input[type="text"].form_input{
  color: white;
  font-family: wowfont;
  width: 200px;
  font-size: 30px;
  background-color: #536270;
  margin-bottom: 25px;

  
  
}

.faction_div .enter_button{
  background-color: #536270;
}

.popup{
  width: 100%;
  height: 100%;
  background-color: #536270;
  text-align: center;
}

.horde_div .popup{
  background-color: #d85757;
}

.alliance_div .popup{
  background-color:#5767d8 ;
}

.popup h1{
  font-size: 40px;
  margin: 0;
  font-family: wowfont;
  padding-top: 15px;
}

.avatar{
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 25px;
}

.vue-select-image__wrapper{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-left: 0;
  justify-content: space-between;
  margin-top: 20px;
}

.vm--modal{
  width: 35% !important;
  min-width: 505px !important;
}
.vue-select-image__item{
  width:25%;
}

.vue-select-image__thumbnail{
    border: none;
    width: 120px;
    height: 120px;
  }
.vue-select-image__img{
  width: 110px;
  height: 110px;
  border-radius: 50%;
  cursor: pointer;
}





@media screen and (max-device-width: 800px){
  .faction_div .form_label{
    font-size: 30px;
    
  }

  .horde_form{
    position:absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    top: 35%;
    
  }


  .alliance_form{
    position:absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    top: 35%;
    
  }
  .vm--modal{
    position: absolute !important;
    width: 360px !important;
    min-width: 0 !important;
    left: calc(50vw - 180px) !important;
  }

  .vue-select-image__thumbnail{
    border: none;
    width: 110px;
    height: 110px;
  }
.vue-select-image__img{
  width: 100px;
  height: 100px;
  border-radius: 50%;
  cursor: pointer;
}
}



</style>