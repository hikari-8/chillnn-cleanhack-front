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
            <div v-if="isOptionView && !isModalOpen" class="flex">
                <div class="w-[15%] flex-grow-0"></div>
                <div
                    v-if="task.optionItem"
                    class="font-medium text-gray-900 mt-2 mb-2 w-[15%] flex-shrink-0 align-center"
                >
                    <!-- optionマーク -->
                    <admin-status-mark />
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
                    class="w-[8%] flex-grow-0 items-center justify-center mt-1"
                >
                    <!-- モーダルを閉じる -->
                    <button
                        type="button"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                        @click="closeOptionModal"
                    >
                        <svg
                            aria-hidden="true"
                            class="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <div
                    class="text-sm font-medium text-gray-900 mt-2 mb-2 w-[15%] flex-grow-0 align-center"
                >
                    <!-- optionマーク  -->
                    <admin-status-mark />
                    <!-- <span>option</span> -->
                </div>

                <app-base-input
                    v-model="task.optionItem"
                    class="input_option w-[60%]"
                ></app-base-input>
                <div class="w-[10%] flex-grow-0">
                    <div class="flex justify-center">
                        <!-- 追加ボタン -->
                        <span title="追加">
                            <table-button
                                :disabled="!task.optionItem"
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
import AdminStatusMark from '~/components/Atom/Mark/AdminStatusMark.vue'
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
        AdminStatusMark,
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
    public isModalOpen: boolean = false

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
            this.isModalOpen = true
        }
    }

    public closeOptionModal() {
        if (this.task) {
            this.isShowOptionModal = !this.isShowOptionModal
            // this.isModalOpen = !this.isModalOpen
            if (!this.task.optionItem || this.task.optionItem === '') {
                this.isModalOpen = !this.isModalOpen
            } else {
                const result = window.confirm(
                    'Optionを追加・更新する場合は、＋ボタンを押してください。このまま実行するとOptionが削除されますがよろしいですか？'
                )
                if (result) {
                    this.task.optionItem = ''
                } else {
                    this.isShowOptionModal = !this.isShowOptionModal
                }
            }
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
        if (!this.task.optionItem || this.task.optionItem === '') {
            window.alert('オプションを追加する場合は、オプション名が必須です')
        } else {
            this.isShowOptionModal = false
            this.isOptionView = true
            this.isModalOpen = false
            this.$emit('registered')
        }
    }

    public async deleteRaffle() {
        this.task.taskStatus = TaskStatus.DELETED
        await this.taskMasterObjectModel.updateTaskMasterObj()
        this.$emit('registered')
    }
}
</script>
