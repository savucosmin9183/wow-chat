<template>
  <div>
    <div v-if="nofaction" class="welcome">
      <h2>Choose your faction</h2>
      <div class="factions">
        <a @click.prevent="activate_alliance"><img class="alliance" src="../assets/images/alliance-logo.png" alt="alliance-logo"></a>
        <a @click.prevent="activate_horde"><img class="horde" src="../assets/images/horde-logo.png" alt="alliance-logo"></a>
      </div>
    </div>
    <Faction v-else :alliance="alliance"/>
  </div>
</template>

<script>

import Faction from './Faction'

export default {
  name: 'Welcome',
  data () {
    return {
      nofaction: true,
      alliance: false
    }
  },
  components:{
    Faction
  },
  methods:{
    activate_alliance(){
      this.nofaction = false;
      this.alliance = true;
    },
    activate_horde(){
      this.nofaction = false;
    }

  }


}
</script>


<style>

@font-face {
  font-family: wowfont;
  src: url('../assets/fonts/LifeCraft_Font.woff');
}

html{
  width: 100vw;
  height: 100vh;
}

.welcome{
  height: 100vh;
  width: 100vw;
  background-image: url('../assets/images/main_background.jpg');
  background-size: cover; /* or contain depending on what you want */
  background-position: center center;
  background-repeat: no-repeat;
  text-align: center;
}

.welcome h2{
  margin: 0;
  padding-top: 5%;
  font-family: wowfont;
  font-size: 5vw;
}

.welcome .factions{
  width: 100vw;
  height: 30vh;
  position: absolute;
  top: calc(50vh - (30vh/2));
}

.welcome .factions .logo{
  cursor: pointer;
}

.welcome .factions .horde{
  width: 15vw;
  height: 25vh;
  min-width: 170px;
  min-height: 117px;
  position: absolute;
  right: 20%;
  transition: all .2s ease-in-out;
}
.welcome .factions .alliance{
  width: 10vw;
  height: 25vh;
  min-width: 115px;
  min-height: 117px;
  position: absolute;
  left: 20%;
  transition: all .2s ease-in-out;
}

.welcome .factions .horde:hover{
  transform: scale(1.2);
}

.welcome .factions .alliance:hover{
  transform: scale(1.2);
}


@media screen and (max-device-width: 800px) and (orientation: portrait){
  /* some CSS here */
    .welcome{
      background-image: url('../assets/images/mobile_background.png');
  }

  .welcome h2{
    font-size: 30px;
    color: white;
  }

  .welcome .factions{
    height: 100vh;
    top: 0;
  }


  .welcome .factions .horde{
    width: 55vw;
    height: 24vh;
    margin-left: calc((55vw / 2) * -1);
    left: 50%;
    bottom: calc(25vh - (24vh / 2));
  }
  .welcome .factions .alliance{
    width: 40vw;
    height: 15vh;
    left: 50%;
    margin-left: calc((40vw / 2) * -1);
    top: calc(25vh - (15vh/2));
  }

}


</style>
