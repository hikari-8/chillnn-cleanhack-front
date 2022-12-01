<template>
    <div class="app_input_container">
        <input v-model="localValue" :type="type" />
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
@Component({})
export default class AppInput extends Vue {
    @Prop({ required: true }) public value!: string | number
    @Prop({ default: () => 'text' }) public type!: string

    public get localValue() {
        return this.value
    }

    public set localValue(input: string | number) {
        this.$emit('input', input)
    }
}
</script>
<style lang="stylus" scoped>
.app_input_container {
    box-sizing: border-box;
    position: relative;
    width: 100%;

    input {
        box-sizing: border-box;
        width: 100%;
        border: 1px solid $borderColor;
        padding: 10px 10px;
        border-radius: 5px;

        &:focus {
            outline: 0;
            box-shadow: none;
            border: 1px solid $borderColor;
            background-color: #ffffff;
        }
    }
}
</style>
