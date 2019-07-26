<template>
    <div class="comments-info">
        <commbox :id="$route.params.id"></commbox>
    </div>
</template>

<script>
import commbox from '../comments/comments.vue'
export default {
    components: {
        commbox
    }
}
</script>

<style>
    .comments-info {
        padding-bottom: 60px;
    }

    .comments-info h3 {
        margin: 0 !important;
        padding: 20px 0;
    }
</style>