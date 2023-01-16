<template>
    <div
        v-if="task"
        class="flex items-center border-b border-solid border-chillnn-border-base py-[15px]"
    >
        <!-- ポチ -->
        <div class="w-[15%] text-center flex-grow-0">
            <span class="text-gray-600">⚫︎</span>
        </div>
        <!-- 掃除場所名 -->
        <div class="w-[45%] text-black flex-grow">
            <app-text :bold="true" :value="task.taskName" />
            <!-- <app-text :bold="true" :value="plan.name.default" /> -->
        </div>
        <!-- 人数 -->
        <div class="w-[10%] text-center flex-grow-0">
            <template>
                <span>{{ task.headCount }}</span>
            </template>
        </div>

        <div class="w-[30%] flex-grow-0">
            <div class="flex justify-center gap-[10px]">
                <!-- ボタン -->
                <table-button>
                    <img class="w-4" src="@/assets/img/icon/edit-regular.svg" />
                </table-button>
                <table-button @click="deleteRaffle" explanation="削除">
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
import {
    TaskMasterObjectModel,
    TaskStatus,
    TaskMastModel,
} from 'chillnn-cleanhack-abr'

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
    @Prop({ default: false }) public task!: TaskMastModel
    @Prop({ required: true }) taskMasterObjectModel!: TaskMasterObjectModel
    // @Prop({ default: false }) public task!: Object
    // @Prop({ default: false }) public index!: number
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

    public deleteRaffle() {
        this.task.taskStatus = TaskStatus.DELETED
        console.log('Deleting')
        this.taskMasterObjectModel.updateTaskMasterObj()
        this.$emit('filterTasks')
    }
}
</script>
