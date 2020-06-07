<template>
  <div class="chat_main_div">
    <Audio-player class="audio":sources="audioSources" :loop="true" :autoplay="true"></Audio-player>
    <div class="chat_block">
      <div class="messages" v-chat-scroll>
        <ul class="msgs">
          <li v-for="message in messages" :key="message.id">
            <img class="chat_avatar" :src="message.image" />
            <span
              :class="{'name_blue': message.alliance == true,
                                        'name_red': message.alliance == false}"
            >{{message.name}}</span>
            <span class="message">{{message.content}}</span>
            <span class="timestamp">{{message.timestamp}}</span>
          </li>
        </ul>
      </div>
      <input
        class="form_input"
        @keydown.enter="send_message"
        type="text"
        name="msg"
        v-model="new_msg"
      />
      <button @click="send_message" class="btn send_button">Send Message</button>
    </div>
  </div>
</template>

<script>
import AudioPlayer from "./Audio-player.vue";
import tavern from "../assets/songs/tavern.mp3";
import whisper from "../assets/songs/whisper.mp3"
import db from "@/firebase/init";
import moment from "moment";

export default {
  name: "Chat",
  props: ["name", "avatar", "alliance"],
  data() {
    return {
      audioSources: [tavern],
      new_msg: null,
      messages: [],
      whisper: true,
      size: null
    };
  },
  methods: {
    send_message() {
      if (this.new_msg) {
        this.whisper = false;
        db.collection("messages")
          .add({
            content: this.new_msg,
            name: `${this.name}: `,
            image: this.avatar.src,
            timestamp: Date.now(),
            alliance: this.alliance
          })
          .catch(err => {
            console.log(err);
          });
        this.new_msg = null;

      }
    }
  },
  components: {
    AudioPlayer
  },
  created() {

    db.collection('messages').get().then(snap => {
    this.size = snap.size // will return the collection size
    });

    this.whisper = false;
    db.collection("messages")
      .add({
        content: "has entered the chat",
        name: this.name,
        image: this.avatar.src,
        timestamp: Date.now(),
        alliance: this.alliance
      })
      .catch(err => {
        console.log(err);
      })
      .then(() => {
        this.whisper = false;
        let ref = db.collection("messages").orderBy("timestamp");
        ref.onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            if (change.type == "added") {
              if(this.whisper && this.messages.length > this.size)
                new Audio(whisper).play()
              let doc = change.doc;
              this.messages.push({
                id: doc.id,
                name: doc.data().name,
                content: doc.data().content,
                timestamp: moment(doc.data().timestamp).format("lll"),
                image: doc.data().image,
                alliance: doc.data().alliance
              });
            }
            this.whisper = true;
          });
        });
      });
  }
};
</script>


<style >
.chat_main_div {
  height: 100vh;
  width: 100vw;
  background-size: cover; /* or contain depending on what you want */
  background-position: center center;
  background-repeat: no-repeat;
  background-image: url("../assets/images/tavern.png");
}
.name_blue {
  color: blue;
}

.name_red {
  color: red;
}

.chat_block {
  width: 50%;
  height: 50%;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.chat_avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.messages {
  width: 100%;
  height: 100%;
  background-color: rgba(70, 69, 65, 0.5);
  overflow: auto;
}

.messages::-webkit-scrollbar {
  width: 3px;
}

.messages::-webkit-scrollbar-track {
  background: #ddd;
}

.messages:::-webkit-scrollbar-thumb {
  background: #aaa;
}

.form_input {
  color: #66ff00;
  font-family: wowfont;
}
.message {
  color: #66ff00;
}

.send_button {
  background-color: #464541;
}

.msgs span {
  font-family: wowfont;
  font-size: 1.5em;
}

.msgs .timestamp {
  display: block;
  font-size: 1.2em;
}
</style>