<template>
    <div
        class="fixed top-0 left-0 right-0 z-50 overflow-x-hidden overflow-y-auto"
    >
        <div
            v-show="localValue"
            class="modal_wrapper"
            @click.self="localValue = false"
        >
            <div class="inner w-2/3">
                <slot />
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class AppModal extends Vue {
    @Prop({ required: true }) value!: boolean
    public get localValue() {
        return this.value
    }

    public set localValue(input: boolean) {
        this.$emit('input', input)
    }
}
</script>
<style lang="stylus" scoped>
.modal_wrapper {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);

    .inner {
        // overflow-y: scroll;
        // overflow-x: none;
        box-sizing: border-box;
        // max-width: 800px;
        width: 50%;
        max-height: 70%;
        background-color: white;
        padding: 40px 40px;
        border-radius: 25px;

        @media only screen and (max-width: $spSize) {
            font-size: 14px;
            padding: 40px 40px;
            width: 70%;
        }
    }
}
</style>
