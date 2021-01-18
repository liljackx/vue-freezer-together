<template>
  <div class="root">
    <div class="container">
       <div class="banner">
            <img id="banner" src="http://127.0.0.1:10069/banner.png" alt="">
        </div>
        <div class="header">
            <h5>Share your room:</h5>
            <h4>{{$root.room.shareUri}}</h4>
            <autocomplete placeholder="Search" :search="search" @submit="submit" />
            <div id="spinner" v-if="playback.loading">
                <b-spinner label="Loading..."></b-spinner>
            </div>
        </div>
        <div v-if="$root.show">
            <hr id="separator">
            <!-- <Card :track="playingTrack"/> -->
            <b-row class="justify-content-md-center">
                <b-col cols="4">
                    <PlayerCard :track="$root.playingTrack" />
                </b-col>
                <b-col cols="3">
                    <QueueList />
                </b-col>
                <b-col cols="3">
                    <UsersList />
                </b-col>
            </b-row>
            <hr>

        </div>
    </div>
    <Results :show="showResults" :results="results" id="modal"/>

</div>
</template>

<script>
// import shortid from 'shortid';
import QueueList from './QueueList'
import UsersList from './UsersList'
import PlayerCard from './PlayerCard'
import Results from './Results'
import axios from 'axios'

export default {
    name: "HomePage",
    components: {
        PlayerCard,
        QueueList,
        UsersList,
        Results
    },
    data() {
        return {
            // TODO: create better objects in here such as currTrack: {} etc.
            show: false,
            showResults: false,
            queue: true,
            prova: [], // temp
            input: null,
            results: {},
            room: {
                id: null,
                joinRoomId: null,
                shareUri: null,
                queue: [], // Add socket TODO
                users: [],
            },
            track: {
                uri: null,
                cover: null,
                title: null,
                artist: '',
                duration: null,
                stream: null,
                started: false,
            },
            playingTrack: {
                uri: null,
                cover: null,
                title: null,
                artist: '',
                duration: null,
                stream: null,
            },
            playback: {
                audio: null,
                playing: false,
                loading: false,
                endListener: null,
            },
            bar: {
                value: 0,
                variant: "primary",
            }
        };
    },
    sockets: {
        connect: function() {
            console.log("Connected to socket!");
        },
        // play: function(data) {
        //     if (data.pause == true && this.playback.audio) {
        //         this.playback.audio.pause();
        //         this.playback.playing = false;
        //     } else if (data.pause == false && this.playback.audio) {
        //         // this.playback.audio.play();
        //         this.playback.playing = true;
        //     }
        // },
        // userDisconnected: function() {
        //     // Remove user
        // },
        // message: function(message) {
        //     console.log(message);
        // },
        // joined: function() {
        //     this.room.users.push("User " + parseInt(Math.random(1, 10000)*10))
        // },
        // requestCurrent: function() {
        //     if (this.playback.audio) {
        //         console.log("Requested")
        //         let currentAudio = {
        //             "currentSrc": this.playback.audio.currentSrc,
        //             "currentTime": this.bar.value,
        //             "cover": this.track.cover,
        //             "artist": this.track.artists,
        //             "duration": this.track.duration,
        //             "title": this.track.title,
        //         }
        //         this.$socket.emit("current", currentAudio)
        //     }
        // },
        // audioUpdate: function(data) {
        //     if (!this.playback.audio) {
        //         console.log(data)
        //         let audio = new Audio(data.audio.currentSrc);
        //         this.playback.audio = audio;
        //         this.$playback.audio = audio;
        //         this.playback.audio.currentTime = data.audio.currentTime;
        //         this.bar.value = data.audio.currentTime+10; // Connection delay (better way ?)
        //         console.log(this.bar.value);
        //         // this.playback.audio.play();
        //         this.track.cover = data.audio.cover;
        //         this.track.artist = data.audio.artist;
        //         this.track.title = data.audio.title;
        //         this.track.started = false;
        //         this.track.duration = data.audio.duration;
        //         this.timer = setInterval(() => {
        //             if (this.playback.playing) {
        //                 this.bar.value += 1;
        //             }
        //         }, 1000)
        //     }
        // },
        roomId: function(roomId) {
            this.$root.room.id = roomId.id;
            this.$root.room.shareUri = window.location.href + "room/" + String(this.$root.room.id);
        },
        // trackChanged: function(track) {
        //     this.track = track;
        //     this.trackUpdate();
        // }
    },
    mounted() {
        const uri = window.location.href;
        if (uri.includes("room")) {
            console.log("Joining room...")
            let roomId = uri.split("room/")[1];
            this.show = true;
            this.room.shareUri = window.location.href;
            this.room.id = roomId;
            this.$socket.emit("joinRoom", {id: roomId});
        } else {
            console.log("Creating new room...")
            this.$socket.emit("createRoom");
        }
    },
    methods: {
        submit: async function(choosed) {
            console.log(choosed)
            const request = await axios.get(`http://localhost:10069/search?q=${choosed}`)
            const results = await request.data
            console.log(results)
            this.results = results;
            this.showResults = !this.showResults;
        },
        search: async function(input) {
            const request = await axios.get(`http://localhost:10069/suggestions/${input}`)
            const suggestions = await request.data;
            let results = []
            if (suggestions.length > 0) {
                results = suggestions
            } else if (suggestions.length == 0) {
                console.log("zerooo")
                results.push(input)
            }
            return results
        },
    }
}
</script>

<style scoped>

    @import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
    body {
        font-family: 'Montserrat', sans-serif !important;
    }

    #joinRoom {
        margin-top: 10px;
    }

    .header {
        text-align: center;
    }

    #cover {
        border-radius: 10%;
    }

    #player {
        margin-top: 30px;
        text-align: center;
        margin: auto;
    }

    #play-track {
        /* float: right; */
        margin-left: -30px;
        margin-top: -30px;
        float: right;
    }

    #banner {
        max-width: 400px;
        margin-top: 40px;
    }

    .banner {
        text-align: center;
        margin-bottom: 40px;
    }

    #roomInput {
        margin: auto;
        margin-top: 5%;
        max-width: 500px;
        background-color: rgba(51, 51, 51, 0.466) !important;
        color: white;
    }

    #spinner {
        margin-top: 30px;
    }

    .track-info {
        margin-top: 10px;
    }

    .autocomplete-result {
        color: black !important;
    }

    .autocomplete {
        margin: auto !important;
    }

    /* #progress-bar {
        margin: auto;
        /* margin-left: 10px;
        max-width: 400px;
    } */

    /* .controllers {
        text-align: center;
        /* margin-left: -10px;
        margin: auto;
    } */

    .autocomplete-result-list
     {
         text-align: left;
         /* max-width: 500px; */
     }

    #uriInput {
        background-color: #333 !important;
        border: none;
        color: white;
    }

    #uriInput:focus {
        border-color: white !important;
    }

    .users {
        /* float: right; */
        /* max
        -height: 20px !important; */
    }
    /* #player-card {
        margin: auto;
        max-width: 500px;
        border-color: rgba(255, 255, 255, 0.356) !important;
    } */
</style>