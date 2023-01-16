<template>
    <div class="task_list_container">
        <!-- ボタン -->
        <div class="my-[10px] flex mb-2 justify-end">
            <div class="flex">
                <div class="flex">
                    <app-button @click="openModal">新規追加＋</app-button>
                </div>
            </div>
        </div>

        <!-- リスト -->
        <div class="flex border-b-2 border-solid border-black pb-2">
            <div class="w-[15%] text-center flex-grow-0"></div>
            <app-caption
                value="掃除場所名"
                :boldCenter="true"
                class="w-[45%]"
            />
            <app-caption
                value="人数"
                :boldCenter="true"
                class="w-[10%] text-center"
            />
        </div>

        <!-- 追加するタスク -->
        <add-item-area v-model="isShowModal" class="">
            <add-task
                v-if="taskMastItem"
                :task-master-obj-model="taskMasterObjectModel"
                :task-mast-item="taskMastItem"
                :user-model="userModel"
                @registered="registered"
            />
        </add-item-area>
        <div v-if="taskMasterObjectModel" class="">
            <div class="tasks">
                <div v-for="task in activeTasks" :key="task.taskID">
                    <task-item
                        :task="task"
                        :taskMasterObjectModel="taskMasterObjectModel"
                    />
                    <!-- <task-item
                        :task="task"
                        :taskMasterObjectModel="taskMasterObjectModel"
                        @filterTasks="filterTasks"
                    /> -->
                </div>
            </div>
            <div class="flex items-center py-[15px]">
                <!-- 空白 -->
                <div class="w-[60%] text-center flex-grow-0"></div>
                <!-- 人数 -->
                <div class="w-[10%] text-center flex-grow-0">
                    <template>
                        計{{ headCountSum }}人
                        <!-- <span>{{  }}</span> -->
                    </template>
                </div>
                <div class="mt-7 text-center" v-show="!taskMasterObjectModel">
                    くじを作成するために、掃除場所データを登録してください。
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import {
    TaskMast,
    TaskMasterObjectModel,
    TaskMastModel,
    TaskStatus,
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
import TaskItem from '@/components/Organisms/Task/modules/TaskItem.vue'
import AppModal from '@/components/Organisms/Common/AppModal/index.vue'
import AddTask from '@/components/Organisms/Task/modules/AddTask.vue'
import {
    AsyncErrorHandle,
    AsyncLoadingAndErrorHandle,
} from '~/util/decorator/baseDecorator'
import AppButton from '@/components/Atom/Button/AppButton.vue'
import AddItemArea from '@/components/Organisms/Common/AddItemArea/index.vue'

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
        TaskItem,
        draggable,
        AddItemArea,
    },
})
export default class TaskList extends Vue {
    @Prop({ required: true }) userModel!: UserModel
    @Prop({ required: true }) taskMasterObjectModel!: TaskMasterObjectModel
    public isShowModal: boolean = false
    public orderChange: boolean = false
    public headCountSum: number = 0
    public taskMastItem: TaskMastModel | null = null
    public taskModel: TaskMastModel | null = null
    public activeTasks: TaskMastModel[] = []
    public taskArrayFixed: TaskMast[] = [
        {
            createdAt: 0,
            groupID: 'blanc',
            headCount: 0,
            taskID: 'blanc',
            taskName: 'blanc',
            updatedAt: 0,
            taskStatus: TaskStatus.ACTIVE,
        },
    ]

    public get getActiveTasks() {
        return this.activeTasks
    }

    public async created() {
        await this.filterActiveTasks()
        this.headCountSumFunc
    }

    public get headCountSumFunc() {
        this.headCountSum = 0
        for (const task of this.activeTasks) {
            this.headCountSum += task.headCount
        }
        return this.headCountSum
    }

    public async filterActiveTasks() {
        this.activeTasks = await this.taskMasterObjectModel.filterActiveTasks()
    }

    public openModal() {
        if (this.taskMasterObjectModel) {
            //taskMastを新規作成している
            this.taskMastItem = this.userModel.createTaskMast()
            console.log('TaskMast作成', this.taskMastItem)
            this.isShowModal = true
        }
    }

    @AsyncLoadingAndErrorHandle()
    public async filterTasks() {
        await this.filterActiveTasks()
        this.headCountSumFunc
    }

    @AsyncLoadingAndErrorHandle()
    public async registered() {
        this.$emit('registered')
        this.headCountSumFunc
        this.taskMastItem = null
        this.isShowModal = false
    }
}
</script>
<style lang="stylus" scoped></style>
