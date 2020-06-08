<script>
  import VueHowler from 'vue-howler'
 
  export default {
    mixins: [VueHowler],
    data() {
      return {
        volume: 0.1,
        music: true
      }
    },
    methods: {
      toggle_music(){
        this.music = !this.music;
      }
    }
  }
</script>
 
<template>
  <div>
    <i class="material-icons medium" :class="{'icon_green': this.music == true, 'icon_red': this.music == false}" @click="togglePlayback(); toggle_music()">music_note</i>
  </div>
</template>

<style>

i.icon_green{
  color: green;
  cursor: pointer;
}

i.icon_red{
  color: red;
  cursor: pointer;
}

</style>