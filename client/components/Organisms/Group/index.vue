<template>
    <div class="mx-auto py-32 auth_container w-600px">
        <div class="font-semibold mb-8 text-2xl">グループ設定 👤</div>
        <div class="input_container">
            <!-- グループ追加 -->
            <add-group
                v-if="isGroupIDNull"
                label="グループ追加"
                :description="true"
                :user-model="userModel"
                :group-model="blancGroupModel"
                class="mb-4"
                @registered="registered"
            />
            <!-- ユーザー名変更 -->
            <edit-group
                v-else
                :group-model="groupModel"
                :user-model="userModel"
                label="グループ名"
                :description="true"
                class="mb-4"
            />
        </div>
    </div>
</template>
<script lang="ts">
import { GroupModel, UserModel } from 'chillnn-cleanhack-abr'
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator'
// component
import EditGroup from '@/components/Organisms/Group/modules/EditGroup.vue'
import AddGroup from '@/components/Organisms/Group/modules/AddGroup.vue'
import AppButton from '@/components/Atom/Button/AppButton.vue'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'

@Component({
    components: {
        EditGroup,
        AppButton,
        AddGroup,
    },
})
export default class AppGroupEdit extends Vue {
    @Prop({ required: true }) groupModel!: GroupModel
    @Prop({ required: true }) userModel!: UserModel
    public blancGroupModel: GroupModel | null = null
    public isGroupIDNull: boolean = false

    public async created() {
        console.log('userModel', this.userModel)
        console.log('groupModel', this.groupModel)
        //動的に登録後、表示を分岐させるにはここの分岐を変更する必要がありそう
        if (!this.userModel.groupID) {
            this.isGroupIDNull = true
            this.blancGroupModel = this.userModel.createNewGroup()
        } else {
            this.isGroupIDNull = false
            this.blancGroupModel = await this.groupModel.fetchGroupMast()
        }
    }

    public get isShowAfterRegisteredGroup() {
        if (!this.blancGroupModel) {
            return (this.isGroupIDNull = true)
        } else {
            return (this.isGroupIDNull = false)
        }
    }

    // @Watch('isGroupIDNull')
    // public async update() {
    //     await this.userModel.fetchGroupDataByGroupID()
    // }

    @AsyncLoadingAndErrorHandle()
    public async registered() {
        //ここで、updateをかけると元のuserdataが入ってしまう。
        // await this.userModel.register()
        //ここで動的に切り替わらせたい
        //groupをupdate
        this.isGroupIDNull = false
        // await this.blancGroupModel?.fetchGroupMast()
        // this.isShowAfterRegisteredGroup
    }
}
</script>
<style lang="stylus" scoped>
.auth_container {
    width: 600px;
}
</style>
