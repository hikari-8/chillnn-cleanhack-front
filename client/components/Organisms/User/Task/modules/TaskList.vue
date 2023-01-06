<template>
    <div class="task_list_container">
        <!-- 仮デザ -->
        <!-- ボタン部分 -->
        <div class="my-[10px] flex items-center justify-between mb-2">
            <template>
                <button-base-sub>↕︎並び替え</button-base-sub>
            </template>
            <div class="flex items-center">
                <!-- ドラッグアンドドロップ -->
                <!-- <button-base>並び替えを終了する</button-base>
                <app-caption
                    class="pl-2"
                    value="売り出し中のプランをドラッグ&ドロップで並び替えてください"
                /> -->

                <div class="flex">
                    <button-base @click="openModal">新規追加＋</button-base>
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

        <div class="flex border-b-2 border-solid border-black pb-2">
            <app-caption value="順番" :boldCenter="true" class="w-[10%]" />
            <app-caption
                value="掃除場所名"
                :boldCenter="true"
                class="w-[55%]"
            />
            <app-caption value="人数" :boldCenter="true" class="w-[10%]" />
        </div>
        <div class="mb-[25px]">
            <!-- <draggable v-if="exampleTasks" class="task_draggable"> -->
            <div v-show="exampleTasks" class="task_draggable">
                <div v-for="(task, index) in exampleTasks" :key="task.idx">
                    <!-- {{ name }} -->
                    <task-item :task="task" :index="index" />
                </div>
                <div class="mt-7 text-center">
                    くじを作成するために、掃除場所データを登録してください。
                </div>
            </div>
            <!-- </draggable> -->
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from 'nuxt-property-decorator'
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
import TaskItem from '@/components/Organisms/User/Task/modules/TaskItem.vue'
import AppModal from '@/components/Organisms/Common/AppModal/index.vue'
import AddTask from '@/components/Organisms/User/Task/modules/AddTask.vue'
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
    public isShowModal: boolean = false
    public orderChange: boolean = false
    public updatedMasterObjModel: TaskMasterObjectModel | null = null
    public taskMasterObjectModel: TaskMasterObjectModel | null = null
    public taskMastItem: TaskMastModel | null = null
    public taskModel: TaskMastModel | null = null
    public exampleTasks: { idx: number; name: string; headcount: number }[] = [
        { idx: 1, name: '洗面所', headcount: 2 },
        { idx: 2, name: '床', headcount: 3 },
        { idx: 3, name: 'トイレ', headcount: 1 },
    ]

    public async created() {
        //taskMasterObjectModelをgroupIDでfetchしてくる
        if (this.userModel) {
            this.taskMasterObjectModel =
                await this.userModel.fetchTaskMasterDataObjByGroupID(
                    this.userModel.groupID!
                )
            console.log('Attention', this.taskMasterObjectModel)
        }
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
    public async registered() {
        const groupID = this.userModel.groupID
        if (!groupID) {
            console.error('Group ID is required')
        }
        if (!this.taskMasterObjectModel || !groupID) {
            return console.error('Task Master Object Model or GroupID is null')
        } else {
            //アップデートしたものをfetchしてくる
            this.updatedMasterObjModel =
                await this.userModel.fetchTaskMasterDataObjByGroupID(groupID)
            if (this.updatedMasterObjModel) {
                this.taskMasterObjectModel = this.updatedMasterObjModel
            }
        }
        console.log(
            'registered後のthis.taskMasterObjectModel',
            this.taskMasterObjectModel
        )
        this.taskMastItem = null
        this.isShowModal = false
    }
}
</script>
<style lang="stylus" scoped></style>
