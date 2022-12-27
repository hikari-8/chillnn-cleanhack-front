ページで主要となるアクション（保存や公開等）に使う
<template>
    <button
        class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 mb-8"
        :class="[disabled ? disableClass : enableClass]"
        @click="click"
        :disabled="disabled"
    >
        <div>
            <slot></slot>
        </div>
    </button>
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop } from 'nuxt-property-decorator'

@Component({})
export default class ButtonBase extends Vue {
    @Prop({ default: false }) public disabled?: boolean
    @Prop({ default: 'primary' }) public color?: string

    get disableClass() {
        return 'text-chillnn-inactive bg-transparent cursor-not-allowed'
    }

    get enableClass() {
        switch (this.color) {
            case 'primary':
                return 'bg-chillnn-primary border-chillnn-primary hover:text-chillnn-primary text-chillnn-bg-layer-0 hover:bg-transparent'
            case 'enable':
                return 'bg-chillnn-status-enable-green border-chillnn-status-enable-green hover:text-chillnn-status-enable-green text-chillnn-bg-layer-0 hover:bg-transparent'
            case 'disable':
                return 'bg-chillnn-status-disable-red border-chillnn-status-disable-red hover:text-chillnn-status-disable-red text-chillnn-bg-layer-0 hover:bg-transparent'
        }
    }

    @Emit('click')
    public click() {}
}
</script>

<style lang="stylus" scoped></style>
