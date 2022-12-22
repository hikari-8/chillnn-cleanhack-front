<template>
    <div class="app_input_container">
        <input
            v-model="localValue"
            :type="type"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700"
        />
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
@Component({})
export default class AppBaseInput extends Vue {
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
<style lang="stylus" scoped></style>
