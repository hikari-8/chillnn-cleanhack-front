<template>
    <div class="mx-auto pb-32 auth_container w-600px" v-if="userModel">
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
            <app-button @click="updateTaskMasterObj">更新する</app-button>
        </div>
    </div>
</template>
<script lang="ts">
import { UserModel } from 'chillnn-cleanhack-abr'
import { Vue, Component, Prop } from 'nuxt-property-decorator'
// component
import EditTask from '@/components/Organisms/Task/Edit/EditTask.vue'
import AppButton from '@/components/Atom/Button/AppButton.vue'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'

@Component({
    components: {
        EditTask,
        AppButton,
    },
})
export default class AppTaskEdit extends Vue {
    @Prop({ required: true }) userModel!: UserModel

    public get isShowLink() {
        return this.$route.params.userID !== this.userModel.userID
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
