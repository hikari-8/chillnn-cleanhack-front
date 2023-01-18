<template>
    <div v-if="task">
        <add-item-area v-model="isShowModal" class="" v-if="task">
            <edit-task-details
                :task="task"
                :taskMasterObjectModel="taskMasterObjectModel"
                @registered="registered"
                @undoRegister="undoRegister"
            />
        </add-item-area>
        <div
            v-if="!isShowModal"
            class="flex items-center border-b border-solid border-chillnn-border-base py-[15px]"
        >
            <div></div>
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
                    <table-button @click="openModal" explanation="編集">
                        <img
                            class="w-4"
                            src="@/assets/img/icon/edit-regular.svg"
                        />
                    </table-button>
                    <table-button @click="deleteRaffle" explanation="削除">
                        <img
                            class="w-4"
                            src="@/assets/img/icon/trash-alt-regular.svg"
                        />
                    </table-button>
                </div>
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
import EditTaskDetails from '@/components/Organisms/Task/modules/EditTaskDetails.vue'
import AddItemArea from '@/components/Organisms/Common/AddItemArea/index.vue'

@Component({
    components: {
        AppText,
        AppBaseInput,
        ButtonBase,
        ButtonBaseSub,
        TableButton,
        EditTaskDetails,
        AddItemArea,
    },
})
export default class TaskItem extends Vue {
    @Prop({ default: false }) public task!: TaskMastModel
    @Prop({ required: true }) taskMasterObjectModel!: TaskMasterObjectModel
    public taskIndex: number = 0
    public exampleTaskObj: Object = []
    public showModal: boolean = false
    public outDate: boolean = false
    public outStock: boolean = false
    public isShowSummaryModal: boolean = false
    public isShowModal: boolean = false

    public get getTask() {
        return (this.exampleTaskObj = this.task)
    }

    public editRaffle() {
        this.$emit('registered')
    }
    public openModal() {
        if (this.task) {
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

    public deleteRaffle() {
        this.task.taskStatus = TaskStatus.DELETED
        this.taskMasterObjectModel.updateTaskMasterObj()
        this.$emit('registered')
    }
}
</script>
