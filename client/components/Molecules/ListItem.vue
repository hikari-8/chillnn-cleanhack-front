<template>
    <option type="radio" :value="target">{{ text }}</option>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component({})
export default class ChillnnAppSelectBoxListItem extends Vue {
    @Prop({ required: true }) public text!: string
    @Prop({ required: true }) public target!: string
}
</script>
<style lang="stylus" scoped></style>
