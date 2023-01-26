<template>
    <div class="mx-auto py-32 auth_container w-600px">
        <div class="font-semibold mb-8 text-2xl">グループ設定 👤</div>
        <div class="input_container" v-if="userModel">
            <!-- グループ追加 -->
            <add-group
                :description="true"
                :userModel="userModel"
                :groupModel="groupModel"
                :isGroupIDNull="isGroupIDNull"
                @registerGroup="registerGroup"
                class="mb-8"
            />

            <!-- adminstatus付与 -->
            <give-admin-status
                v-if="!isGroupIDNull"
                :groupModel="groupModel"
                :userModel="userModel"
                label="管理者権限の付与"
                :description="true"
                @registerGroup="registerGroup"
                class="mb-4"
            />
        </div>
    </div>
</template>
<script lang="ts">
import { GroupModel, UserModel } from 'chillnn-cleanhack-abr'
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator'
// component
import AddGroup from '@/components/Organisms/Group/modules/AddGroup.vue'
import AppButton from '@/components/Atom/Button/AppButton.vue'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'
import GiveAdminStatus from '@/components/Organisms/Group/modules/GiveAdminStatus.vue'

@Component({
    components: {
        AppButton,
        AddGroup,
        GiveAdminStatus,
    },
})
export default class AppGroupEdit extends Vue {
    @Prop({ required: true }) groupModel!: GroupModel
    @Prop({ required: true }) userModel!: UserModel
    @Prop({ required: true }) isGroupIDNull!: boolean
    public blancGroupModel: GroupModel | null = null

    public async created() {
        console.log(this.userModel)
        console.log('groupIDisNull?', this.isGroupIDNull)
        // console.log('userModel', this.userModel)
        // console.log('groupModel', this.groupModel)
        //動的に登録後、表示を分岐させるにはここの分岐を変更する必要がありそう
        // if (!this.userModel.groupID) {
        //     this.isGroupIDNull = true
        //     //ここで、そのままgorupModelに突っ込んだら怒られる(Avoid mutating prop)
        //     this.blancGroupModel = this.userModel.createNewGroup()
        // } else {
        //     this.isGroupIDNull = false
        // }
    }

    @AsyncLoadingAndErrorHandle()
    public async registerGroup() {
        this.$emit('registerGroup')
    }
}
</script>
<style lang="stylus" scoped>
.auth_container {
    width: 600px;
}
</style>
