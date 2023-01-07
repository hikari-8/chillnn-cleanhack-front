<template>
    <div class="user_detail_container">
        <div>userホーム画面</div>
        <div v-if="userModel" class="mx-auto py-32 auth_container w-600px">
            <div class="font-semibold mb-8 text-2xl">ユーザー設定 👤</div>

            <!-- ユーザー名 -->
            <div class="alluser_area mb-14">
                <user-edit
                    :user-model="userModel"
                    label="ユーザー名"
                    :description="true"
                    class="mb-4"
                />
                <div class="button_container">
                    <app-button @click="register">更新</app-button>
                </div>
            </div>

            <div class="admin_area mb-10">
                <!-- これ以降は管理者のみ表示 -->
                <div class="font-semibold mb-8 text-2xl">グループ設定 🤝</div>
                <!-- グループ名 -->
                <div class="mb-14" v-show="groupModel">
                    <edit-group
                        v-if="groupModel"
                        :group-model="groupModel"
                        :user-model="userModel"
                    />
                    <div class="button_container">
                        <!-- button -->
                        <app-button @click="registerGroup">更新する</app-button>
                    </div>
                </div>

                <div class="font-semibold mb-8 text-2xl">掃除場所設定 🧹</div>
                <!-- 掃除場所のマスターデータ -->
                <div class="mb-20">
                    <edit-task :user-model="userModel" />
                    <div class="mb-8 text-sm text-gray-500 mt-2">
                        ＊くじの基盤となるデータです。これを元に、各回のくじを作成します。
                    </div>
                </div>

                <div>テストボタン</div>
                <!-- 全ての掃除場所設定を登録する -->
                <div class="button_container">
                    <!-- button -->
                    <app-button @click="updateTaskMasterObj"
                        >更新する</app-button
                    >
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import AppTitle from '@/components/Atom/Text/AppTitle.vue'
import AppInput from '@/components/Atom/AppInput.vue'
import AppSelectWeekday from '@/components/Atom/AppSelectWeekday.vue'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'
import { UserModel, GroupModel } from 'chillnn-cleanhack-abr'
import { userInteractor } from '~/api'
import UserEdit from '@/components/Organisms/User/Edit/modules/UserEdit.vue'
import AppModal from '@/components/Organisms/Common/AppModal/index.vue'
import AppButton from '@/components/Atom/Button/AppButton.vue'
// @ts-ignore --pagesの配下からGUIで引っ張ってきたので、tsがパスに対してwarnを出している
import EditGroup from '@/components/Organisms/Group/index.vue'
import EditTask from '~/components/Organisms/User/Task/EditTask.vue'
// component
@Component({
    components: {
        AppTitle,
        AppInput,
        AppSelectWeekday,
        UserEdit,
        AppModal,
        EditGroup,
        AppButton,
        EditTask,
    },
})
export default class UserPage extends Vue {
    public userModel: UserModel | null = null
    public myUserModel: UserModel | null = null
    public groupModel: GroupModel | null = null
    public isShowModal: boolean = false
    public message: Object = {}
    public slackURL: string = ''
    public params: Object = {}
    public pattern: any = null
    public weekdayKey: string = ''
    public timeKey: string = ''

    public async created() {
        const userID = this.$route.params.userID
        this.myUserModel = await userInteractor.fetchMyUserModel()
        this.userModel = await userInteractor.fetchUserModelByUserID(userID)
        this.groupModel = await this.myUserModel.fetchGroupDataByGroupID()
        console.log('groupModel', this.groupModel)
        console.log('userModel', this.userModel)
    }

    public get isMyPage() {
        return (
            this.myUserModel &&
            this.myUserModel.userID === this.$route.params.userID
        )
    }

    // なんかこここんぽーねんと分割できない
    @AsyncLoadingAndErrorHandle()
    public async register() {
        if (!this.myUserModel?.name) {
            return console.error('ユーザー名を入力してください')
        }
        await this.myUserModel.register()
        this.$emit('registered')
    }
    // なんかこここんぽーねんと分割できない
    @AsyncLoadingAndErrorHandle()
    public async registerGroup() {
        if (!this.myUserModel) {
            return console.error('registerGroupメソッドで、userModelがnullです')
        } else {
            const groupID = this.myUserModel.groupID
            await this.groupModel!.updateGroupMast()
            this.$emit('registered')
            this.groupModel = await this.myUserModel.fetchGroupDataByGroupID()
        }
    }

    @AsyncLoadingAndErrorHandle()
    public async updateTaskMasterObj() {
        console.log('テストです')
    }
}
</script>
<style lang="stylus" scoped>
.auth_container {
    width: 600px;
}
</style>
