<template>
    <div class="users">
        <b-list-group>
            <b-list-group-item>👪 Room's users</b-list-group-item>
            <b-list-group-item v-if="$root.room.users.length == 0">No Users</b-list-group-item> <!-- just you -->
            <b-list-group-item v-for="(user, index) in $root.room.users" :key="index">
                {{user}}
            </b-list-group-item>
        </b-list-group>
    </div>
</template>

<script>
export default {
    name: 'UserList'
}
</script>

<style>

</style>