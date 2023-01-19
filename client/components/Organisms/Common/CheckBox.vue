<template>
    <label class="relative box-border pr-1 text-base">
        <input
            type="checkbox"
            value="option.optionName"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            :id="id"
            v-model="localValue"
        />
        <span
            class="relative cursor-pointer pl-9 text-sm text-chillnn-base before:absolute before:top-[3px] before:left-[2px] before:z-0 before:box-border before:inline-block before:h-[15px] before:w-[15px] before:rounded-sm before:border before:border-chillnn-border-base before:content-[''] after:absolute after:-top-[6px] after:-left-[3px] after:z-0 after:my-2.5 after:mx-2.5 after:box-border after:inline-block after:h-2.5 after:w-1.5 after:rotate-45 after:transform after:border-r-2 after:border-b-2 after:border-chillnn-base after:opacity-0 after:transition-all after:duration-200 after:content-[''] peer-checked:after:opacity-[1]"
        ></span>
    </label>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit } from 'nuxt-property-decorator'

@Component({})
export default class CheckBox extends Vue {
    @Prop() public value!: boolean
    @Prop({ required: false, default: '' }) public id!: string

    @Emit('input')
    public input(_: boolean) {}

    public get localValue(): boolean {
        return this.value
    }

    public set localValue(value: boolean) {
        this.input(value)
    }
}
</script>

<style lang="stylus" scoped></style>
