各項目の見出しに使う
<template>
    <div class="app_title font-bold text-gray-500 text-2xl text-center">
        <slot />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component({})
export default class AppTitle extends Vue {}
</script>

<style lang="stylus" scoped></style>
