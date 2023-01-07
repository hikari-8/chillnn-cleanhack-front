<template>
    <div class="button_container inline-flex">
        <button
            :disabled="disabled"
            @click="click"
            class="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
        >
            <slot />
        </button>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class AppButton extends Vue {
    @Prop({ required: false, default: false }) disabled!: boolean
    public click() {
        this.$emit('click')
    }
}
</script>
<style lang="stylus" scoped></style>
