<template>
  <div>
    <div v-if="nofaction" class="welcome">
      <h2>Choose your faction</h2>
      <div class="factions">
        <a class="factions__entry alliance__entry" @click.prevent="activate_alliance"><img class="alliance" src="../assets/images/alliance-logo.png" alt="alliance-logo"></a>
        <a class="factions__entry horde__entry" @click.prevent="activate_horde"><img class="horde" src="../assets/images/horde-logo.png" alt="alliance-logo"></a>
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
  height: 25vh;
  object-fit: contain;
  position: absolute;
  right: 20%;
  transition: all .2s ease-in-out;
}
.welcome .factions .alliance{
  height: 25vh;
  object-fit: contain;
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


@media screen and (max-width: 800px){
  /* some CSS here */
    .welcome{
    background-image: none;
  }

  .welcome h2{
    position: absolute;
    width: 100%;
    top: calc(50% - 33px);
    font-size: 45px;
    color: white;
    display: block;
    background: rgba(0,0,0,0.5);
    z-index: 10;
    display:flex;
    justify-content: center;
    align-items: center;
    padding: 0;
  }

  .welcome .factions{
    height: 100vh;
    top: 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    
  }
  .welcome .factions .factions__entry{
    display: block;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-size: cover; /* or contain depending on what you want */
    background-position: center center;
    background-repeat: no-repeat;
  }

  .alliance__entry{
    background-image: url('../assets/images/stormwind.jpg');
  }

  .horde__entry{
    background-image: url('../assets/images/orgrimmar.jpg');
  }


  .welcome .factions .horde{
    position: static;
    height: 24vh;
    object-fit: contain;
  }
  .welcome .factions .alliance{
    position: static;
    height: 24vh;
    object-fit: contain;
  }

}


</style>
