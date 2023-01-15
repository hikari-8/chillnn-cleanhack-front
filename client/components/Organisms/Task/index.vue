<template>
    <div>
        <div
            class="mx-auto pb-32 auth_container w-600px"
            v-if="userModel && taskMasterObjectModel"
        >
            <!-- 掃除場所のマスターデータ -->
            <div class="mb-20">
                <edit-task
                    :user-model="userModel"
                    :taskMasterObjectModel="taskMasterObjectModel"
                    :groupModel="groupModel"
                />
            </div>
        </div>
        <div v-else>
            <div class="mx-auto pb-32 auth_container w-600px text-gray-700">
                <div class="font-semibold mb-8 text-sm mt-20">
                    💡くじを設定するには、グループを作成する必要があります。
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import {
    UserModel,
    GroupModel,
    TaskMasterObjectModel,
} from 'chillnn-cleanhack-abr'
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
    @Prop({ required: true }) taskMasterObjectModel!: TaskMasterObjectModel
    @Prop({ required: true }) groupModel!: GroupModel
    public get isShowLink() {
        return this.$route.params.userID !== this.userModel.userID
    }
}
</script>
<style lang="stylus" scoped>
.auth_container {
    width: 600px;
}
</style>
