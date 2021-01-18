<template>
    <b-list-group style="max-width:250px;" v-if="this.$root.room.queue">
        <b-list-group-item>🎶 Track queue</b-list-group-item>
        <b-list-group-item v-if="this.$root.room.queue.length == 0">No tracks in queue</b-list-group-item>
        <b-list-group-item v-for="(track, index) in this.$root.room.queue" :key="index">
            <img :src="track.albumArt.thumb" width="40" height="40" style="border-radius: 50%; margin-right: 10px;"/>
            {{track.title}} - {{track.artistString}}
        </b-list-group-item>
    </b-list-group>  
</template>

<script>
export default {
    name: "QueueList",
    data() {
        return {
        }
    },
    methods: {

    },
}
</script>

<style>

</style>