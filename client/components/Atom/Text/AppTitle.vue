各項目の見出しに使う
<template>
    <div
        class="app_title font-semibold"
        :class="{ white: white }"
        v-html="value"
    ></div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component({})
export default class AppTextH1 extends Vue {
    @Prop() public value!: string
    @Prop({ default: false }) public white!: boolean
}
</script>

<style lang="stylus" scoped>
.white {
    color: white;
}
</style>
