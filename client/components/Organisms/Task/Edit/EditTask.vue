<template>
    <div class="slack_rimind_edit_container h-full">
        <!-- マスターデータ: リマインド時間の編集 -->
        <slack-remind-time
            :user-model="userModel"
            :taskMasterObjectModel="taskMasterObjectModel"
        />
        <!-- マスターデータ: くじの編集 -->
        <div class="label font-semibold mb-4">掃除場所のマスターデータ</div>
        <div class="task_edit_container">
            <!-- task edit -->
            <task-list
                :user-model="userModel"
                :taskMasterObjectModel="taskMasterObjectModel"
                @registered="registerTask"
            />
            <div class="mb-8 text-sm text-gray-500 mt-4">
                ＊くじの基盤となるデータです。これを元に、各回のくじを作成します。
            </div>
        </div>

        <div>テストボタン</div>
        <!-- 全ての掃除場所設定を登録する -->
        <div class="button_container">
            <!-- button -->
            <app-button @click="updateTaskMasterObj">更新する</app-button>
        </div>
    </div>
</template>
<script lang="ts">
import { UserModel, TaskMasterObjectModel } from 'chillnn-cleanhack-abr'
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
    public updatedMasterObjModel: TaskMasterObjectModel | null = null
    public taskMasterObjectModel: TaskMasterObjectModel | null = null
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
    }

    @AsyncLoadingAndErrorHandle()
    public async updateTaskMasterObj() {
        if (this.taskMasterObjectModel)
            this.taskMasterObjectModel.updateTaskMasterObj()
        const groupID = this.userModel.groupID
        if (groupID) {
            await this.userModel.fetchTaskMasterDataObjByGroupID(groupID)
        }
        console.log('テストです')
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
