<template>
    <div class="title">
        <slot />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class AuthTitle extends Vue {
    @Prop({ required: false, default: false }) disabled!: boolean
}
</script>
<style lang="stylus" scoped></style>
