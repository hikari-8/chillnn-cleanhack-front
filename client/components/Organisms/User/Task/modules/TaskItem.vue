<template>
    <div
        class="flex items-center border-b border-solid border-chillnn-border-base py-[15px]"
    >
        <!-- 順番 -->
        <div class="w-[10%] text-center flex-grow-0">
            <span>{{ index + 1 }}</span>
        </div>
        <!-- ドラッグ&ドロップを実装するなら、ここ必要 -->
        <!-- <div class="w-[7%] text-center">
            <span v-if="!orderChange">{{ idx + 1 }}</span>
            <hamburger-small v-else />
        </div> -->
        <!-- 掃除場所名 -->
        <div class="mr-[55px] text-black flex-grow">
            <app-text :bold="true" :value="task.name" />
            <!-- <app-text :bold="true" :value="plan.name.default" /> -->
        </div>
        <!-- 人数 -->
        <div class="w-[10%] text-center flex-grow-0">
            <template>
                <span>{{ task.headcount }}</span>
            </template>
        </div>

        <div class="w-[25%] flex-grow-0">
            <div class="flex justify-center gap-[10px]">
                <!-- ボタン -->
                <table-button>
                    <img
                        class="w-4"
                        src="@/assets/img/icon/trash-alt-regular.svg"
                    />
                </table-button>
                <!-- <table-button @click="showModal = true" explanation="削除">
                    <img
                        class="w-4"
                        src="@/assets/img/icon/trash-alt-regular.svg"
                    />
                </table-button> -->
            </div>
        </div>
    </div>
</template>
<script lang="ts">
type ExampleTask = {
    idx: number
    name: string
    headcount: number
}
import { Component, Vue, Prop, Emit } from 'nuxt-property-decorator'
// component
import AppText from '@/components/Atom/Text/AppText.vue'
import ButtonBase from '@/components/Atom/Button/button_base.vue'
import ButtonBaseSub from '@/components/Atom/Button/button_base_sub.vue'
import AppBaseInput from '@/components/Atom/Input/AppBaseInput.vue'
import TableButton from '@/components/Atom/Button/TableButton.vue'

export const planTableHeader = ['プラン名', '残在庫', '単価', '']

@Component({
    components: {
        AppText,
        AppBaseInput,
        ButtonBase,
        ButtonBaseSub,
        TableButton,
    },
})
export default class TaskItem extends Vue {
    @Prop({ default: false }) public task!: Object
    @Prop({ default: false }) public index!: number
    public taskIndex: number = 0
    public exampleTaskObj: Object = []
    // @Prop({ default: false }) public orderChange!: number
    public showModal: boolean = false
    public outDate: boolean = false
    public outStock: boolean = false
    public isShowSummaryModal: boolean = false

    public get getTask() {
        return (this.exampleTaskObj = this.task)
    }
    public get getTaskIndex() {
        return (this.taskIndex = this.index)
    }

    // @AsyncLoadingAndErrorHandle()
    // public async created() {
    //     this.outDate =
    //         this.plan.saleTypeForTerm === 'LIMITED' &&
    //         !!this.plan.saleStart &&
    //         !!this.plan.saleEnd &&
    //         !(
    //             this.plan.saleStart <= dayjs().format('YYYY-MM-DD') &&
    //             dayjs().format('YYYY-MM-DD') <= this.plan.saleEnd
    //         )

    //     if (this.plan.maxStockNum) {
    //         this.outStock = this.plan.maxStockNum === this.plan.soldNumTotal
    //     }
    //     this.planMastDto =
    //         await hostPlanDtoInteractor.fetchPlanByHotelIDAndPlanID(
    //             this.plan.hotelID,
    //             this.plan.planID
    //         )
    // }

    // public get mainKVUrl(): string {
    //     return hostStorageInteractor.getImageUrl(this.plan.mainKeyVisual)
    // }

    // public goEdit() {
    //     this.$router.push({
    //         name: 'hotelID-items-plan-edit-planID',
    //         params: {
    //             hotelID: this.plan.hotelID,
    //             planID: this.plan.planID,
    //         },
    //     })
    // }
    // public goCopy() {
    //     this.$router.push({
    //         name: 'hotelID-items-plan-edit-new_plan',
    //         params: {
    //             hotelID: this.plan.hotelID,
    //         },
    //         query: {
    //             planID: this.plan.planID,
    //         },
    //     })
    // }
    // public goGuest() {
    //     window.open(getPlanDetailUrl(this.plan.hotelID, this.plan.planID))
    // }

    // @Emit('delete-emit') public deleteEmit() {}
    // @AsyncLoadingAndErrorHandle() public async deletePlan() {
    //     await planInteractor.deletePlanMast(this.plan.hotelID, this.plan.planID)
    //     this.deleteEmit()
    //     this.showModal = false
    // }

    // public get getSaleUnitStatement() {
    //     let retval = ''
    //     switch (this.plan.billingTypeTerm) {
    //         case BillingTypeTerm.PER_DATE:
    //             retval += '１泊ごと'
    //             break
    //         case BillingTypeTerm.PER_RESERVATION:
    //             retval += '宿泊を通して'
    //             break
    //     }
    //     switch (this.plan.billingTypeTarget) {
    //         case BillingTypeTarget.PERSON:
    //             retval += 'お１人様あたり'
    //             break
    //         case BillingTypeTarget.ROOM:
    //             retval += '１部屋あたり'
    //             break
    //         case BillingTypeTarget.GROUP:
    //             retval += '団体様あたり'
    //             break
    //     }
    //     return retval
    // }
}
</script>
