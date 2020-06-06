<template>
  <div>
    <div v-if="nofaction" class="welcome">
      <h2>Choose your faction</h2>
      <div class="factions">
        <a @click.prevent="activate_alliance"><img class="logo alliance" src="../assets/images/alliance-logo.png" alt="alliance-logo"></a>
        <a @click.prevent="activate_horde"><img class="logo horde" src="../assets/images/horde-logo.png" alt="alliance-logo"></a>
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
  background-image: url('../assets/images/test2.jpg');
  background-size: cover; /* or contain depending on what you want */
  background-position: center center;
  background-repeat: no-repeat;
  text-align: center;
}

.welcome h2{
  margin: 0;
  padding-top: 5%;
  font-family: wowfont;
  font-size: 100px;
}

.welcome .factions{
  width: 100vw;
  position: relative;
  padding-top: 10%;
}

.welcome .factions .logo{
  cursor: pointer;
}

.welcome .factions .horde{
  width: 300px;
  height: 250px;
  position: absolute;
  right: 20%;
  transition: all .2s ease-in-out;
}
.welcome .factions .alliance{
  width: 200px;
  height: 250px;
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

</style>
