<template>
    <div>
        <div class="name_input_container" v-if="groupModel">
            <div v-if="isGroupIDNull" class="label font-semibold mb-4">
                グループ追加
            </div>
            <div v-else class="label font-semibold mb-4">グループ名</div>
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
                        <app-button v-if="isGroupIDNull" @click="registerGroup"
                            >作成</app-button
                        >
                        <app-button v-else @click="registerGroup"
                            >更新</app-button
                        >
                    </div>
                </div>
            </div>
            <div v-if="isGroupIDNull" class="mt-2 text-sm text-gray-500">
                ＊くじを作成するには、グループ名を設定してグループを作成してください。
            </div>
            <div v-else class="mt-2 text-sm text-gray-500">
                ＊くじを割り当てるメンバーが所属するグループの名前です。
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { GroupModel, UserModel } from 'chillnn-cleanhack-abr'
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import AppBaseInput from '@/components/Atom/Input/AppBaseInput.vue'
import { userInteractor } from '~/api'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'
import AppButton from '@/components/Atom/Button/AppButton.vue'

@Component({
    components: {
        AppBaseInput,
        AppButton,
    },
})
export default class AddGroup extends Vue {
    @Prop({ required: false }) public description!: boolean
    @Prop({ required: true }) userModel!: UserModel
    @Prop({ required: true }) groupModel!: GroupModel
    @Prop({ required: true }) isGroupIDNull!: boolean
    public blancGroupModel: GroupModel | null = null

    @AsyncLoadingAndErrorHandle()
    public async registerGroup() {
        if (!this.groupModel) {
            return console.error(
                'registerGroupメソッドで、groupModelがnullです'
            )
        } else {
            await this.groupModel.register()
            await this.userModel.addGroupIDToUserModel(this.groupModel.groupID)
            // await this.userModel.fetchGroupDataByGroupID()
            // this.$emit('registered')
            this.$emit('registerGroup')
        }
    }
}
</script>
<style lang="stylus" scoped></style>
