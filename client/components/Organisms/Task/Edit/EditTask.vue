<template>
    <div class="slack_rimind_edit_container h-full">
        <!-- マスターデータ: くじの編集 -->
        <div class="font-semibold mb-8 text-2xl mt-20 mb-16">
            掃除場所設定 🧹
        </div>

        <div class="task_edit_container">
            <div
                class="px-12 py-8 bg-white border border-gray-200 rounded-lg shadow-md"
            >
                <div class="label font-semibold mb-4">
                    掃除場所のマスターデータ
                </div>
                <task-list
                    :user-model="userModel"
                    :taskMasterObjectModel="taskMasterObjectModel"
                    :activeTasks="activeTasks"
                    :headCountSum="headCountSum"
                    @registered="registerTask"
                />
            </div>
            <!-- task edit -->

            <div class="mb-8 text-sm text-gray-500 mt-4">
                ＊くじの基盤となるデータです。これを元に、各回のくじを作成します。
            </div>
        </div>

        <!-- マスターデータ: リマインド時間の編集 -->
        <div class="font-semibold mb-8 text-2xl mt-14">
            くじ引きリマインド設定 ⏰
        </div>
        <slack-remind-time
            :user-model="userModel"
            :taskMasterObjectModel="taskMasterObjectModel"
            :groupModel="groupModel"
        />
    </div>
</template>
<script lang="ts">
import {
    UserModel,
    TaskMasterObjectModel,
    GroupModel,
    TaskMastModel,
} from 'chillnn-cleanhack-abr'
import { Vue, Component, Prop } from 'nuxt-property-decorator'
// component
import TaskList from '@/components/Organisms/Task/modules/TaskList.vue'
import SlackRemindTime from '@/components/Organisms/Task/modules/SlackRemindTime.vue'
import AppButton from '@/components/Atom/Button/AppButton.vue'
import AppTitle from '@/components/Atom/Text/AppTitle.vue'
import AppText from '@/components/Atom/Text/AppText.vue'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'
import axios from 'axios'
const schedule = require('node-schedule')

@Component({
    components: {
        TaskList,
        AppButton,
        AppTitle,
        AppText,
        SlackRemindTime,
    },
})
export default class EditTask extends Vue {
    @Prop({ required: true }) userModel!: UserModel
    @Prop({ required: true }) taskMasterObjectModel!: TaskMasterObjectModel
    @Prop({ required: true }) groupModel!: GroupModel
    @Prop({ required: true }) activeTasks!: TaskMastModel[]
    @Prop({ required: true }) headCountSum!: number
    public updatedMasterObjModel: TaskMasterObjectModel | null = null
    // public taskMasterObjectModel: TaskMasterObjectModel | null = null

    public async fetchUpdatedTask() {
        //アップデートしたものをfetchしてくる
        const groupID = this.userModel.groupID
        this.updatedMasterObjModel =
            await this.userModel.fetchTaskMasterDataObjByGroupID(groupID)
        if (this.updatedMasterObjModel) {
            this.taskMasterObjectModel = this.updatedMasterObjModel
        }
    }

    @AsyncLoadingAndErrorHandle()
    public async registerTask() {
        const groupID = this.userModel.groupID
        if (!groupID) {
            console.error('Group ID is required')
        }
        if (!this.taskMasterObjectModel || !groupID) {
            return console.error('Task Master Object Model or GroupID is null')
        } else {
            //アップデートしたものをfetchしてくる
            await this.taskMasterObjectModel.updateTaskMasterObj()
            this.updatedMasterObjModel =
                await this.userModel.fetchTaskMasterDataObjByGroupID(groupID)
            if (this.updatedMasterObjModel) {
                this.taskMasterObjectModel = this.updatedMasterObjModel
            }
        }
        this.$emit('registered')
    }
}
</script>
<style lang="stylus" scoped>
.user_edit_container {
    .button_container {
        padding-top: 10px;
        display: flex;
        justify-content: center;
    }
}
</style>
