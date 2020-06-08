<template>
  <div class="faction_div" 
    :class="{
      'alliance_div': alliance == true,
      'horde_div': alliance == false }">
    <Audio-player class="audio" key="allaince" :sources="music" :loop="true" :autoplay="true"></Audio-player>
    <form @submit.prevent :class="{'alliance_form': alliance == true,
                                    'horde_form': alliance == false}">
      <label class="form_label" for="name">Enter your name:</label>
      <input class="form_input grey" type="text" name="name" v-model="name">
      <img v-if="avatar" class="avatar" :src="avatar.src" :alt="avatar.alt">
      <p v-if="feedback" class="red-text">{{feedback}}</p>
      <div>
        <button @click="chooseAvatar" class="btn enter_button">Choose avatar</button>
        <button @click="enterChat" class="btn enter_button">Enter Chat</button>
      </div>
    </form>
    <modal name="popup" height="400">
        <div class="popup">
          <h1>Choose an avatar:</h1>
            <vue-select-image :dataImages="images"
                    @onselectimage="onSelectImage">
            </vue-select-image>
          <button @click="submit_clicked" class="btn choose_button">Select</button>
        </div>
    </modal>
  </div>
</template>

<script>
import AudioPlayer from './Audio-player.vue'
import swsong from '../assets/songs/stormwind.mp3'
import orgsong from '../assets/songs/orgrimmar.mp3'
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
      swsong,
      orgsong,
      music : null
    }
  },
  props: ['alliance'],
  components: {
    AudioPlayer,
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

.alliance_div .btn:hover{
  background-color: #255fb0;
}

.horde_div .btn:hover{
  background-color: #800103;
}

.alliance_div .vue-select-image__thumbnail--selected{
  background: #255fb0;
}

.horde_div .vue-select-image__thumbnail--selected {
    background: #800103;
}

.choose_button{
  background-color: #536270;
  margin-top: 20px;
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



.faction_div .form_input{
  color: white;
  font-family: wowfont;
  width: 200px !important;
  font-size: 30px !important;
  background-color: #536270 !important;
  
  
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

.popup h1{
  font-size: 25px;
  margin: 0;
  padding-top: 15px;
}

.avatar{
  width: 100px;
  height: 100px;
  border-radius: 50%;
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

.audio{
  position: absolute;
  top: 0;
  right: 5%;
}



@media screen and (max-device-width: 800px) and (orientation: portrait){
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