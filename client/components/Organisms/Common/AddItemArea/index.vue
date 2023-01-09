<template>
    <div class="overflow-x-hidden overflow-y-auto x-50">
        <div
            v-show="localValue"
            class="modal_wrapper"
            @click.self="localValue = false"
        >
            <div class="inner">
                <slot />
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class AddItemArea extends Vue {
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
// .modal_wrapper {
//     justify-content: center;
//     align-items: center;

//     .inner {
//         // overflow-y: scroll;
//         // overflow-x: none;
//         box-sizing: border-box;
//         // max-width: 800px;
//         width: 50%;
//         max-height: 70%;
//         background-color: white;
//         padding: 40px 40px;
//         border-radius: 25px;

//         @media only screen and (max-width: $spSize) {
//             font-size: 14px;
//             padding: 40px 40px;
//             width: 70%;
//         }
//     }
// }
</style>
