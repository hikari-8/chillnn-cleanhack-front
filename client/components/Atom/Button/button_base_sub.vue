ButtonBaseの中抜きをしたボタン。ネガティブなアクション（戻るやキャンセル等）に使う
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
export default class ButtonBaseSub extends Vue {
    @Prop({ default: false }) public disabled?: boolean
    @Prop({ default: 'primary' }) public color?: string

    get disableClass() {
        return 'text-chillnn-inactive bg-transparent cursor-not-allowed'
    }

    get enableClass() {
        switch (this.color) {
            case 'primary':
                return 'border-chillnn-primary text-chillnn-primary bg-transparent hover:border-chillnn-primary-hover hover:text-chillnn-primary-hover'
        }
    }

    @Emit('click')
    public click() {}
}
</script>

<style lang="stylus" scoped></style>
