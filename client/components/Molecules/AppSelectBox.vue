<template>
    <div>
        <validation-provider :name="name" :rules="rule" v-slot="{ errors }">
            <div class="relative">
                <div
                    class="relative rounded-md border border-chillnn-border-base bg-white after:pointer-events-none after:absolute after:top-3.5 after:right-2.5 after:h-2 after:w-2 after:rotate-45 after:transform after:border-0 after:border-b-2 after:border-r-2 after:border-chillnn-base after:content-['']"
                    :class="{
                        'items-center after:top-3.5': large,
                        'bg-chillnn-bg-layer-4 text-chillnn-inactive': disabled,
                        'mr-1.5': !noMargin,
                    }"
                    :style="getWidth"
                >
                    <select
                        class="relative w-full min-w-[60px] cursor-pointer appearance-none border-none bg-transparent px-3 py-2 text-sm outline-none"
                        :class="{ ' cursor-not-allowed': disabled }"
                        :style="getWidth"
                        v-model="localValue"
                    >
                        <template v-for="(data, idx) in localKV">
                            <chillnn-app-select-box-list-item
                                :key="`${data.key}#${idx}`"
                                :text="data.key"
                                :target="data.value"
                            />
                        </template>
                    </select>
                </div>
                <chillnn-app-error-text
                    v-if="errors.length"
                    :errorText="errors[0]"
                />
            </div>
        </validation-provider>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit } from 'nuxt-property-decorator'
// import { KeyValueObject } from 'chillnn-abr-hotel'
// component
import ChillnnAppSelectBoxListItem from '@/components/Molecules/ListItem.vue'

@Component({
    components: {
        ChillnnAppSelectBoxListItem,
    },
})
export default class ChillnnAppSelectBoxList extends Vue {
    // @Prop({ default: () => false }) public disabled!: boolean
    // @Prop() public value!: string
    // @Prop() public name!: string
    // @Prop({ required: true }) public dataSets!: Array<
    //     KeyValueObject | string | number
    // >
    // @Prop() public rule!: string
    // @Prop() public widthSize?: number
    // @Prop() public minWidthSize?: number
    // @Prop({ default: false }) public large!: boolean
    // @Prop({ default: () => false }) public noMargin!: boolean
    // public get localKV(): KeyValueObject[] {
    //     return this.dataSets.map((item) => {
    //         if (typeof item === 'string' || typeof item === 'number') {
    //             return {
    //                 key: item as unknown as string,
    //                 value: item as unknown as string,
    //             }
    //         }
    //         return item
    //     })
    // }
    // public get getWidth() {
    //     if (this.widthSize) {
    //         return { maxWidth: this.widthSize + 'px' }
    //     } else if (this.minWidthSize) {
    //         return { minWidth: this.minWidthSize + 'px' }
    //     }
    // }
    // @Emit('input')
    // public input(_: string) {}
    // @Emit('change')
    // public change() {}
    // public get localValue(): string {
    //     return this.value
    // }
    // public set localValue(value: string) {
    //     this.input(value)
    //     this.change()
    // }
}
</script>

<style lang="stylus" scoped></style>
