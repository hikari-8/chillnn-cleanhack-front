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
            class="border-b border-solid border-chillnn-border-base py-[15px]"
        >
            <div class="flex items-center py-[15px]">
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
                        <table-button
                            @click="openOptionModal"
                            explanation="オプションの追加"
                        >
                            <img
                                class="w-5"
                                src="@/assets/img/icon/edit-icon.svg"
                            />
                        </table-button>
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
                        {{ task.optionItem }}
                    </span>
                </div>
            </div>
            <!-- モーダルの中身 -->
            <div v-if="isShowOptionModal" class="flex">
                <div
                    class="text-sm font-medium text-gray-900 mt-2 mb-2 w-[10%] flex-grow-0 align-center"
                >
                    <span>option</span>
                </div>

                <app-base-input
                    v-model="task.optionItem"
                    class="input_option w-[70%]"
                ></app-base-input>
                <div class="w-[10%] flex-grow-0">
                    <div class="flex justify-center">
                        <!-- 追加ボタン -->
                        <span title="追加">
                            <table-button
                                :disabled="!task"
                                @click="registerOption"
                            >
                                <img
                                    class="w-5"
                                    src="@/assets/img/icon/plus-edit.svg"
                                />
                            </table-button>
                        </span>
                    </div>
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
    public isShowOptionModal: boolean = false
    public isOptionView: boolean = false

    public created() {
        if (this.task.optionItem) {
            this.isOptionView = true
        }
    }

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

    public openOptionModal() {
        if (this.task) {
            this.isShowOptionModal = true
            this.isOptionView = false
        }
    }

    public async registered() {
        this.isShowModal = false
        this.$emit('registered')
    }

    public async undoRegister() {
        this.isShowModal = false
    }

    public registerOption() {
        this.isShowOptionModal = false
        this.isOptionView = true
        this.$emit('registered')
    }

    public async deleteRaffle() {
        this.task.taskStatus = TaskStatus.DELETED
        await this.taskMasterObjectModel.updateTaskMasterObj()
        this.$emit('registered')
    }
}
</script>
