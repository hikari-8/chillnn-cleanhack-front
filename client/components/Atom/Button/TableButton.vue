<template>
    <div
        class="h-9 w-9 cursor-pointer rounded-full bg-chillnn-bg-layer-0 text-center opacity-50 shadow-[0_1px_5px_0_rgba(0,0,0,0.3)] hover:opacity-100"
        target="_blanc"
    >
        <div
            class="relative flex h-full items-center justify-center"
            @mouseover="isShow = true"
            @mouseleave="isShow = false"
        >
            <slot />
        </div>
        <div>
            <transition name="tablebutton">
                <!-- <span class="relative text-xs" v-show="isShow">{{
                    explanation
                }}</span> -->
            </transition>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit } from 'nuxt-property-decorator'

@Component({})
export default class TableButton extends Vue {
    // @Prop() public explanation!: string
    public isShow: boolean = false

    // @Emit() public click() {}
}
</script>

<style lang="stylus" scoped>
img {
    max-width: 100%;
    margin-right: auto;
    margin-left: auto;
}

.tablebutton-enter-active, .tablebutton-leave-active {
    transition: opacity 0.5s;
}

.tablebutton-enter, .tablebutton-leave-to {
    opacity: 0;
}
</style>
