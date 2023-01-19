<template>
    <div v-if="raffle">
        <add-item-area v-model="isShowModal" class="" v-if="raffle">
            <edit-raffle-head-count
                :raffle="raffle"
                @registered="registered"
                @undoRegister="undoRegister"
            />
        </add-item-area>
        <div class="border-b border-solid border-chillnn-border-base">
            <div v-if="!isShowModal" class="flex items-center py-[15px]">
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
                        <table-button @click="openModal" explanation="編集">
                            <img
                                class="w-4"
                                src="@/assets/img/icon/edit-regular.svg"
                            />
                        </table-button>
                    </div>
                </div>
            </div>
            <div v-if="isOptionView" class="flex">
                <div class="w-[15%] flex-grow-0"></div>
                <div
                    class="font-medium text-gray-900 mt-2 mb-2 w-[15%] flex-shrink-0 align-center"
                >
                    <!-- optionマーク -->
                    <span
                        class="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                    >
                        <span
                            class="w-2 h-2 mr-1 bg-green-500 rounded-full"
                        ></span>
                        Option
                    </span>
                </div>
                <div
                    class="text-sm font-medium text-gray-900 mt-3 mb-3 flex-grow-0 align-center"
                >
                    <span>
                        {{ raffle.optionItem.optionName }}
                    </span>
                </div>
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
import { RaffleMastModel, RaffleObjectModel } from 'chillnn-cleanhack-abr'
import EditRaffleHeadCount from '@/components/Organisms/Raffle/modules/EditRaffleHeadCount.vue'
import AddItemArea from '@/components/Organisms/Common/AddItemArea/index.vue'

@Component({
    components: {
        AppText,
        AppBaseInput,
        ButtonBase,
        ButtonBaseSub,
        TableButton,
        EditRaffleHeadCount,
        AddItemArea,
    },
})
export default class EffectiveRaffleItem extends Vue {
    @Prop({ default: false }) public raffle!: RaffleMastModel
    // @Prop({ default: false }) public task!: Object
    // @Prop({ default: false }) public index!: number
    public taskIndex: number = 0
    // @Prop({ default: false }) public orderChange!: number
    public showModal: boolean = false
    public outDate: boolean = false
    public outStock: boolean = false
    public isShowModal: boolean = false
    public isShowOptionModal: boolean = false
    public isOptionView: boolean = false

    public created() {
        if (this.raffle.optionItem.optionName !== '') {
            this.isOptionView = true
        }
    }

    public editRaffle() {
        this.$emit('registered')
    }
    public openModal() {
        if (this.raffle) {
            this.isShowModal = true
        }
    }

    public async registered() {
        this.isShowModal = false
        this.$emit('registered')
    }

    public async undoRegister() {
        this.isShowModal = false
    }
}
</script>
