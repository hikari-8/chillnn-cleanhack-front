<template>
    <div class="name_input_container mt-12" v-if="groupModel">
        <div class="label font-semibold mb-4">{{ label }}</div>
        <div
            class="w-full max-w-md p-4 bg-white border rounded-lg shadow-md sm:p-8 mt-4"
        >
            <div class="flex items-center justify-between mb-4">
                <div class="font-semibold mb-4 text-gray-900">
                    グループメンバー 🤝
                </div>
            </div>
            <div class="tasks">
                <div v-for="memberID in memberIDArray" :key="memberID">
                    <admin-status-card
                        :memberID="memberID"
                        :groupModel="groupModel"
                        :userModel="userModel"
                        @registerAdmin="registerAdmin"
                    />
                </div>
            </div>
        </div>
        <div class="mt-6 text-sm text-gray-500" v-if="description">
            ＊管理者はグループメンバーに管理者権限を付与することができます。<br />
            　管理者はくじを編集・実行できます。
        </div>
    </div>
</template>
<script lang="ts">
import { GroupModel, UserModel } from 'chillnn-cleanhack-abr'
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import AppBaseInput from '@/components/Atom/Input/AppBaseInput.vue'
import AppButton from '@/components/Atom/Button/AppButton.vue'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'
import AdminStatusCard from '@/components/Organisms/Group/modules/AdminStatusCard.vue'

@Component({
    components: {
        AppBaseInput,
        AppButton,
        AdminStatusCard,
    },
})
export default class GiveAdminStatus extends Vue {
    @Prop({ required: true }) groupModel!: GroupModel
    @Prop({ required: true }) userModel!: UserModel
    @Prop({ required: true }) label!: string | number
    //ユーザー名の説明をつけるかどうか(ここ、注意文言の赤文字に設定し直してもいいかも ex.)ユーザー名は必須です)
    @Prop({ required: false }) public description!: boolean
    public memberIDArray: string[] = []

    public created() {
        console.log(this.groupModel.members)
        this.memberIDArray = this.groupModel.members
        console.log(this.memberIDArray, 'this.memberIDArray')
    }

    get groupName() {
        return this.groupModel.groupName
    }

    @AsyncLoadingAndErrorHandle()
    public async registerAdmin() {
        this.$emit('registerAdmin')
    }
}
</script>
<style lang="stylus" scoped></style>
