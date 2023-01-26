<template>
    <div class="task_list_container" v-if="raffleObjectModel">
        <!-- リスト -->
        <div class="flex border-b-2 border-solid border-black pb-2">
            <div class="w-[15%] text-center flex-grow-0"></div>
            <app-caption
                value="掃除場所名"
                :boldCenter="true"
                class="w-[55%]"
            />
            <app-caption
                value="人数"
                :boldCenter="true"
                class="w-[10%] text-center"
            />
        </div>
        <div class="">
            <div v-if="raffleObjectModel.tasks" class="tasks">
                <div
                    v-for="raffle in raffleObjectModel.tasks"
                    :key="raffle.raffleItemID"
                >
                    <effective-raffle-item
                        :raffle="raffle"
                        @registered="registered"
                    />
                </div>
                <div class="flex items-center py-[15px]">
                    <!-- 空白 -->
                    <div class="w-[68%] text-center flex-grow-0"></div>
                    <!-- 人数 -->
                    <div class="w-[12%] text-center flex-grow-0">
                        <span class="text-sm font-medium"> 計</span>
                        <span class="text-pink-600 text-lg font-semibold">
                            {{ headCountSum }}
                        </span>
                        <span class="text-sm font-medium"> 人</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import {
    RaffleObjectModel,
    RaffleStatus,
    TaskMastModel,
    UserModel,
} from 'chillnn-cleanhack-abr'
// component
import AppTitle from '@/components/Atom/Text/AppTitle.vue'
import AppCaption from '@/components/Atom/Text/AppText.vue'
import AppText from '@/components/Atom/Text/AppText.vue'
import AppBaseInput from '@/components/Atom/Input/AppBaseInput.vue'
import draggable from 'vuedraggable'
import ButtonBase from '@/components/Atom/Button/button_base.vue'
import ButtonBaseSub from '@/components/Atom/Button/button_base_sub.vue'
import AppModal from '@/components/Organisms/Common/AppModal/index.vue'
import AddTask from '@/components/Organisms/Task/modules/AddTask.vue'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'
import AppButton from '@/components/Atom/Button/AppButton.vue'
import EffectiveRaffleItem from '@/components/Organisms/Raffle/modules/EffectiveRaffleitem.vue'

@Component({
    components: {
        AppTitle,
        AppText,
        AppModal,
        AddTask,
        AppBaseInput,
        ButtonBase,
        ButtonBaseSub,
        AppButton,
        AppCaption,
        draggable,
        EffectiveRaffleItem,
    },
})
export default class EffectiveRaffleList extends Vue {
    @Prop({ required: true }) raffleObjectModel!: RaffleObjectModel
    public orderChange: boolean = false
    public taskMastItem: TaskMastModel | null = null
    public taskModel: TaskMastModel | null = null
    public headCountSum: number = 0
    public async created() {
        this.headCountSumFunc
    }

    public async registered() {
        this.raffleObjectModel.raffleStatus = RaffleStatus.EFFECTIVE_AND_FIXED
        await this.raffleObjectModel?.register()
        this.headCountSumFunc
        this.$emit('registered')
    }

    public get headCountSumFunc() {
        this.headCountSum = 0
        for (const task of this.raffleObjectModel.tasks) {
            this.headCountSum += task.headCount
        }
        return this.headCountSum
    }
}
</script>
<style lang="stylus" scoped></style>
