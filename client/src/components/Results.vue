<template>
    <b-modal id="modal-scrollable" scrollable title="Scrollable Content" size="lg">
        <b-tabs content-class="mt-3">
            <b-tab title="Tracks" active><p>
                <b-list-group>
                    <b-list-group-item v-for="(res, index) in results.tracks" :key="index">
                        <b-row>
                            <b-col cols="8">
                                <img :src="res.albumArt.thumb" style="border-radius: 50%;margin-right:5px;" height="30" width="30">
                                {{res.title}} - {{res.artistString}}
                            </b-col>
                            <b-col cols="3" style="text-align:right;">
                                <button type="button" @click="playTrack(res)" id="button_bw" class="btn">
                                    <b-icon icon="play"></b-icon>
                                </button>
                                <button type="button" @click="addToQueue(res)" id="button_bw" class="btn">
                                    <b-icon icon="music-note-list"></b-icon>
                                </button>
                            </b-col>
                        </b-row>
                    </b-list-group-item>
                </b-list-group>
            </p></b-tab>
            <b-tab title="Album"><p>
                <b-list-group>
                    <b-list-group-item v-for="(res, index) in results.albums" :key="index">
                        <b-row>
                            <b-col cols="8">
                                <img :src="res.art.thumb" style="border-radius: 50%;margin-right:5px;" height="30" width="30">
                                {{res.title}} - {{res.artistString}}
                            </b-col>
                            <b-col cols="3" style="text-align:right;">
                                <!-- dubbio: come riprodurre un album ? -->
                                <button type="button" id="button_bw" class="btn">
                                    <b-icon icon="play"></b-icon>
                                </button>
                                <button type="button" id="button_bw" class="btn">
                                    <b-icon icon="music-note-list"></b-icon>
                                </button>
                            </b-col>
                        </b-row>
                    </b-list-group-item>
                </b-list-group>
            </p></b-tab>
        </b-tabs>
    </b-modal>
</template>

<script>
export default {
    name: "Results",
    props: {
        results: Object,
        show: Boolean,
    },
    watch: {
        show: function() {
            this.$bvModal.show("modal-scrollable")
        }
    },
    methods: {
        playTrack: function(track) {
            // track is an object
            if (this.$root.room.id && this.$root.playback.playing == false) {
                console.log("in")
                this.$root.playingTrack = track
                this.$root.show = true;
                this.$root.playback.audio = new Audio(`http://localhost:10069/stream/${track.streamUrl}`)
                this.$root.playback.audio.onended = this.onTrackEnd;
                // Socket emit to implement
                this.$bvModal.hide("modal-scrollable")
            }
        },
        addToQueue: function(track) {
            // More conditions ? 
            if (this.$root.room.id) {
                this.$root.room.queue.push(track)
            }
        },
        onTrackEnd: function() {
            this.$root.playingTrack = this.$root.room.queue[0];
            this.$root.room.queue.shift(); // Remove first element of the list
            // this.$playback.loading = true;
            this.$root.playback.audio = new Audio("http://localhost:10069/stream/"+this.$root.playingTrack.streamUrl);
            this.$root.playback.audio.onended = this.onTrackEnd;
            // this.$playback.loading = false;
            // this.bar.value = 0;
            // this.playback.playing = false;
            this.$root.playback.audio.play()
            // this.playback.playing = true;
        },
    },
}
</script>

<style>

</style>