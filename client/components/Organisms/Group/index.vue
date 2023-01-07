<template>
    <div
        class="mx-auto py-32 auth_container w-600px"
        v-if="groupModel && userModel"
    >
        <div class="font-semibold mb-8 text-2xl">グループ設定 👤</div>
        <div class="input_container">
            <!-- ユーザー名変更 -->
            <edit-group
                :group-model="groupModel"
                label="グループ名"
                :description="true"
                class="mb-4"
            />
            <div class="button_container">
                <!-- button -->
                <app-button @click="registerGroup">更新</app-button>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { GroupModel, UserModel } from 'chillnn-cleanhack-abr'
import { Vue, Component, Prop } from 'nuxt-property-decorator'
// component
import EditGroup from '@/components/Organisms/Group/modules/EditGroup.vue'
import AppButton from '@/components/Atom/Button/AppButton.vue'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'

@Component({
    components: {
        EditGroup,
        AppButton,
    },
})
export default class AppGroupEdit extends Vue {
    @Prop({ required: true }) groupModel!: GroupModel
    @Prop({ required: true }) userModel!: UserModel

    @AsyncLoadingAndErrorHandle()
    public async registerGroup() {
        if (!this.userModel) {
            return console.error('registerGroupメソッドで、userModelがnullです')
        } else {
            await this.groupModel!.updateGroupMast()
            this.$emit('registered')
            await this.userModel.fetchGroupDataByGroupID()
        }
    }
}
</script>
<style lang="stylus" scoped>
.auth_container {
    width: 600px;
}
</style>
