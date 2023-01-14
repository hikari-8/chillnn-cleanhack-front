<template>
    <div class="name_input_container" v-if="!userModel.groupID && groupModel">
        <div class="label font-semibold mb-4">{{ label }}</div>
        <div class="flex">
            <div>
                <!-- name -->
                <div class="flex gap-x-3 items-center w-72 mr-4">
                    <app-base-input
                        v-model="groupModel.groupName"
                        class="w-full"
                    />
                </div>
            </div>
            <div>
                <div class="">
                    <!-- button -->
                    <app-button @click="registerGroup">作成</app-button>
                </div>
            </div>
        </div>
        <div class="mt-2 text-sm text-gray-500" v-if="description">
            ＊くじを作成するには、グループ名を設定してグループを作成してください。
        </div>
    </div>
</template>
<script lang="ts">
import { GroupModel, UserModel } from 'chillnn-cleanhack-abr'
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import AppBaseInput from '@/components/Atom/Input/AppBaseInput.vue'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'
import AppButton from '@/components/Atom/Button/AppButton.vue'

@Component({
    components: {
        AppBaseInput,
        AppButton,
    },
})
export default class AddGroup extends Vue {
    @Prop({ required: true }) label!: string | number
    //ユーザー名の説明をつけるかどうか(ここ、注意文言の赤文字に設定し直してもいいかも ex.)ユーザー名は必須です)
    @Prop({ required: false }) public description!: boolean
    @Prop({ required: true }) userModel!: UserModel
    @Prop({ required: true }) groupModel!: GroupModel
    // public groupModel: GroupModel | null = null

    // public async created() {
    //     this.groupModel = this.userModel.createNewGroup()
    //     console.log('AppGroupEditのgroupModelです', this.groupModel)
    // }

    @AsyncLoadingAndErrorHandle()
    public async registerGroup() {
        if (!this.groupModel) {
            return console.error(
                'registerGroupメソッドで、groupModelがnullです'
            )
        } else {
            await this.groupModel.register()
            this.$emit('registered')
        }
    }
}
</script>
<style lang="stylus" scoped></style>
