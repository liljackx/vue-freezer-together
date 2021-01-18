<template>
    <b-card id="player-card">
        <div id="player" v-if="!this.$root.playback.loading">
            <img v-if="track.albumArt.thumb" id="cover" width="150" height="150" :src="track.albumArt.thumb">
            <div class="track-info">
                <h5 id="track-name">{{track.title}}</h5>
                <h6 id="artist-name">{{track.artistString}}</h6>
            </div>
            <div class="controllers">
                <b-progress id="progress-bar" height="3px" :value="bar.value" :max="track.duration/1000" :variant="bar.variant" :key="bar.variant"></b-progress>
                <button type="button" id="button_bw" class="btn" @click="previous">
                    <b-icon icon="skip-backward"></b-icon>
                </button>
                <button type="button" id="button_bw" class="btn" @click="playPause">
                    <b-icon v-if="!playing" icon="play"></b-icon>
                    <b-icon v-if="playing" icon="pause"></b-icon>
                </button>
                <button type="button" id="button_bw" class="btn" @click="next">
                    <b-icon icon="skip-forward"></b-icon>
                </button>
                <!-- <button type="button" class="btn" @click="showHideQueue">
                    <b-icon icon="list-task"></b-icon>
                </button> -->
            </div>
        </div>
        <div id="spinner" v-if="$root.playback.loading">
            <b-spinner label="Loading..."></b-spinner>
        </div>
    </b-card> 
</template>

<script>
// const API = "http://localhost:10069/"

export default {
    name: 'PlayerCard',
    props: {
        track: Object,
    },
    data() {
        return {
            bar: {
                value: 0,
                variant: "primary",
            },
            playing: false,
        }
    },
    methods: {
        previous: function() {

        },
        playPause: function() {
            this.$emit("playing")
            if (!this.playing) {
                console.log("playing...")
                this.$root.playback.audio.play();
                this.$socket.emit("playback", {
                    pause: false,
                })
            } else {
                console.log("pausing...")
                this.$root.playback.audio.pause();
                this.$socket.emit("playback", {
                    pause: true,
                })
            }
            if (!this.$root.trackStarted) {
                console.log("starting progress bar")
                this.timer = setInterval(() => {
                    if (this.playing) {
                        this.bar.value += 1;
                    }
                }, 1000);
                this.$root.trackStarted = true;
            }
            this.playing = !this.playing;   
        },
        next: function() {
            this.$root.playback.audio.currentTime = this.track.duration/1000;
            this.playing = false;
            this.bar.value = 0;
        },
    },
    watch: {
        track: function (newTrack) {
            console.log(newTrack)
            this.playing = true;
        }
    },
    mounted() {

    }
}
</script>

<style scoped>
    #player-card {
        margin: auto;
        max-width: 500px;
        border-color: rgba(255, 255, 255, 0.356) !important;
    }

    .controllers {
        text-align: center;
        /* margin-left: -10px; */
        margin: auto;
    }

    #progress-bar {
        margin: auto;
        /* margin-left: 10px; */
        max-width: 400px;
    }

    .track-info {
        margin-top: 10px;
    }

    #player {
        margin-top: 30px;
        text-align: center;
        margin: auto;
    }

    #cover {
        border-radius: 10%;
    }
</style>