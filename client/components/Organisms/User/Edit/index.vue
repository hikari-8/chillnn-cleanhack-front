<template>
    <div class="mx-auto py-32 auth_container w-600px" v-if="userModel">
        <div class="font-semibold mb-8 text-2xl">ユーザー設定 👤</div>
        <div class="input_container">
            <!-- ユーザー名変更 -->
            <user-edit
                :user-model="userModel"
                label="ユーザー名"
                :description="true"
                class="mb-4"
            />
            <div class="button_container">
                <!-- button -->
                <app-button @click="register">更新</app-button>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { UserModel } from 'chillnn-cleanhack-abr'
import { Vue, Component, Prop } from 'nuxt-property-decorator'
// component
import UserEdit from './modules/UserEdit.vue'
import AppButton from '@/components/Atom/Button/AppButton.vue'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'

@Component({
    components: {
        UserEdit,
        AppButton,
    },
})
export default class AppUserEdit extends Vue {
    @Prop({ required: true }) userModel!: UserModel

    public get isShowLink() {
        return this.$route.params.userID !== this.userModel.userID
    }

    @AsyncLoadingAndErrorHandle()
    public async register() {
        if (!this.userModel?.name) {
            return console.error('ユーザー名を入力してください')
        }
        await this.userModel.register()
        this.$emit('registered')
    }
}
</script>
<style lang="stylus" scoped>
.auth_container {
    width: 600px;
}
</style>
