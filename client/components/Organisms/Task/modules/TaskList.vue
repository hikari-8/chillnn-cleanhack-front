<template>
    <div class="task_list_container">
        <!-- ボタン -->
        <div class="my-[10px] flex mb-2 justify-end">
            <div class="flex">
                <div class="flex">
                    <app-button @click="openModal">新規追加＋</app-button>
                </div>

                <!-- モーダル -->
                <app-modal v-model="isShowModal">
                    <add-task
                        v-if="taskMastItem"
                        :task-master-obj-model="taskMasterObjectModel"
                        :task-mast-item="taskMastItem"
                        :user-model="userModel"
                        @registered="registered"
                    />
                </app-modal>
            </div>
        </div>

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
        <div class="mb-[20px]">
            <div v-if="taskMasterObjectModel" class="tasks">
                <div
                    v-for="task in taskMasterObjectModel.tasks"
                    :key="task.taskID"
                >
                    <task-item :task="task" />
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
    TaskMasterObjectModel,
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
import TaskItem from '@/components/Organisms/Task/modules/TaskItem.vue'
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
        TaskItem,
        draggable,
    },
})
export default class TaskList extends Vue {
    @Prop({ required: true }) userModel!: UserModel
    @Prop({ required: true }) taskMasterObjectModel!: TaskMasterObjectModel
    public isShowModal: boolean = false
    public orderChange: boolean = false
    public taskMastItem: TaskMastModel | null = null
    public taskModel: TaskMastModel | null = null

    public openModal() {
        if (this.taskMasterObjectModel) {
            //taskMastを新規作成している
            this.taskMastItem = this.userModel.createTaskMast()
            console.log('TaskMast作成', this.taskMastItem)
            this.isShowModal = true
        }
    }

    @AsyncLoadingAndErrorHandle()
    public async registered() {
        this.$emit('registered')
        this.taskMastItem = null
        this.isShowModal = false
    }
}
</script>
<style lang="stylus" scoped></style>
