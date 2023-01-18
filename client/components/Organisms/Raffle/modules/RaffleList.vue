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
                    <raffle-item :raffle="raffle" />
                </div>
                <div class="flex items-center py-[15px]">
                    <!-- 空白 -->
                    <div class="w-[70%] text-center flex-grow-0"></div>
                    <!-- 人数 -->
                    <div class="w-[10%] text-center flex-grow-0">
                        <template>
                            計{{ headCountSum }}人
                            <!-- <span>{{  }}</span> -->
                        </template>
                    </div>
                </div>

                <div
                    class="mb-8 text-sm text-gray-500 mt-12"
                    v-if="!raffleObjectModel.tasks.length"
                >
                    くじを発行したい場合は、サイドバーのくじを編集するボタンからくじを登録してください。
                </div>
                <div class="mb-8 text-sm text-gray-500 mt-12" v-else>
                    ＊この内容で発行する場合は、上の"くじを発行する"ボタンを押してください。<br />
                    くじの内容を変更したい場合は、サイドバーの"くじを設定する"からくじを編集できます。
                    <br />
                    掃除場所それぞれの人数は、くじ発行後でも参加人数に合わせて調整できます。
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import {
    RaffleObjectModel,
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
import RaffleItem from '@/components/Organisms/Raffle/modules/RaffleItem.vue'
import AppModal from '@/components/Organisms/Common/AppModal/index.vue'
import AddTask from '@/components/Organisms/Task/modules/AddTask.vue'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'
import AppButton from '@/components/Atom/Button/AppButton.vue'

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
        RaffleItem,
        draggable,
    },
})
export default class RaffleList extends Vue {
    @Prop({ required: true }) raffleObjectModel!: RaffleObjectModel
    public orderChange: boolean = false
    public taskMastItem: TaskMastModel | null = null
    public taskModel: TaskMastModel | null = null
    public headCountSum: number = 0
    public async created() {
        this.headCountSumFunc
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
