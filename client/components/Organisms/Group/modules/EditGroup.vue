<template>
    <div class="name_input_container">
        <div class="label font-semibold mb-4">{{ label }}</div>
        <div class="flex" v-if="groupModel.groupName">
            <!-- name -->
            <div class="flex gap-x-3 items-center w-72 mr-4">
                <app-base-input v-model="groupModel.groupName" class="w-full" />
            </div>
            <!-- button -->
            <div class="">
                <app-button @click="registerGroup">更新</app-button>
            </div>
        </div>
        <div class="mt-2 text-sm text-gray-500" v-if="description">
            ＊くじを割り当てるメンバーが所属するグループの名前です。
        </div>
    </div>
</template>
<script lang="ts">
import { GroupModel, UserModel } from 'chillnn-cleanhack-abr'
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import AppBaseInput from '@/components/Atom/Input/AppBaseInput.vue'
import AppButton from '@/components/Atom/Button/AppButton.vue'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'

@Component({
    components: {
        AppBaseInput,
        AppButton,
    },
})
export default class EditGroup extends Vue {
    @Prop({ required: true }) groupModel!: GroupModel
    @Prop({ required: true }) userModel!: UserModel
    @Prop({ required: true }) label!: string | number
    //ユーザー名の説明をつけるかどうか(ここ、注意文言の赤文字に設定し直してもいいかも ex.)ユーザー名は必須です)
    @Prop({ required: false }) public description!: boolean

    get groupName() {
        return this.groupModel.groupName
    }

    @AsyncLoadingAndErrorHandle()
    public async registerGroup() {
        if (!this.userModel) {
            return console.error('registerGroupメソッドで、userModelがnullです')
        } else {
            await this.groupModel!.updateGroupMast()
            await this.userModel.fetchGroupDataByGroupID()
            this.$emit('registered')
        }
    }
}
</script>
<style lang="stylus" scoped></style>
