<template>
    <div class="mx-auto py-32 auth_container w-600px" v-if="userModel">
        <div class="font-semibold mb-8 text-2xl">Home 🏠</div>
        <div
            v-if="!isNameUpdated"
            class="input_container flex font-semibold mb-4"
        >
            <div class="mt-12">
                ようこそCLEAN HACKへ　🎉
                <br />
                ユーザー設定からお名前を登録してください！
            </div>
        </div>
        <div v-else class="input_container font-semibold mb-4">
            <div>
                <div>
                    おかえりなさい！
                    {{ userModel.name }}
                    さん！🎉
                </div>
            </div>
        </div>
        <div v-if="userModel && groupModel" class="mt-24">
            <div
                class="p-6 bg-white border border-gray-200 rounded-lg shadow-md flex"
            >
                <div
                    class="mb-2 text-lg font-semibold tracking-tight text-gray-900"
                >
                    {{ groupModel.groupName }}のお掃除くじに招待されています。
                    <br />
                    参加しますか？🧼 🧹
                </div>
                <app-button class="my-3 ml-4" @click="joinGroup"
                    >参加する</app-button
                >
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { UserModel, GroupModel } from 'chillnn-cleanhack-abr'
import { Vue, Component, Prop } from 'nuxt-property-decorator'
// component
import AppButton from '@/components/Atom/Button/AppButton.vue'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'

@Component({
    components: {
        AppButton,
    },
})
export default class HomeBody extends Vue {
    @Prop({ required: true }) userModel!: UserModel
    @Prop({ required: true }) groupModel!: GroupModel
    isNameUpdated: boolean = false

    public created() {
        if (this.userModel.name !== '名無し') {
            this.isNameUpdated = true
        }
    }

    @AsyncLoadingAndErrorHandle()
    public async joinGroup() {}
}
</script>
<style lang="stylus" scoped>
.auth_container {
    width: 600px;
}
</style>
