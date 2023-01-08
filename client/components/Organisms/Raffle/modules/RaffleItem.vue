<template>
    <div
        v-if="raffle"
        class="flex items-center border-b border-solid border-chillnn-border-base py-[15px]"
    >
        <!-- ポチ -->
        <div class="w-[15%] text-center flex-grow-0">
            <span class="text-gray-600">⚫︎</span>
        </div>
        <!-- 掃除場所名 -->
        <div class="w-[55%] text-black flex-grow">
            <app-text :bold="true" :value="raffle.taskName" />
        </div>
        <!-- 人数 -->
        <div class="w-[10%] text-center flex-grow-0">
            <template>
                <span>{{ raffle.headCount }}</span>
            </template>
        </div>

        <div class="w-[20%] flex-grow-0">
            <div class="flex justify-center gap-[10px]">
                <table-button>
                    <img
                        class="w-4"
                        src="@/assets/img/icon/trash-alt-regular.svg"
                    />
                </table-button>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
// component
import AppText from '@/components/Atom/Text/AppText.vue'
import ButtonBase from '@/components/Atom/Button/button_base.vue'
import ButtonBaseSub from '@/components/Atom/Button/button_base_sub.vue'
import AppBaseInput from '@/components/Atom/Input/AppBaseInput.vue'
import TableButton from '@/components/Atom/Button/TableButton.vue'
import { RaffleObjectModel } from 'chillnn-cleanhack-abr'

@Component({
    components: {
        AppText,
        AppBaseInput,
        ButtonBase,
        ButtonBaseSub,
        TableButton,
    },
})
export default class RaffleItem extends Vue {
    @Prop({ default: false }) public raffle!: RaffleObjectModel
    // @Prop({ default: false }) public task!: Object
    // @Prop({ default: false }) public index!: number
    public taskIndex: number = 0
    // @Prop({ default: false }) public orderChange!: number
    public showModal: boolean = false
    public outDate: boolean = false
    public outStock: boolean = false
    public isShowSummaryModal: boolean = false
}
</script>
