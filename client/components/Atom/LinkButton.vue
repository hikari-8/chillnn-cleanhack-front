<template>
    <div class="link_button_container">
        <nuxt-link :to="to" class="link" tag="div">
            <slot />
        </nuxt-link>
    </div>
</template>
<script lang="ts">
import { RawLocation } from 'vue-router/types/router'
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class LinkButton extends Vue {
    @Prop({ required: true }) to!: RawLocation
}
</script>
<style lang="stylus" scoped>
.link_button_container {
    display: inline-block;
    text-decoration: none;
    font-size: 12px;

    .link {
        cursor: pointer;
    }
}
</style>
