<template>
    <div>
        <div
            class="mx-auto pb-32 auth_container w-600px"
            v-if="userModel && taskMasterObjectModel && groupModel"
        >
            <!-- 掃除場所のマスターデータ -->
            <div class="mb-20">
                <edit-task
                    :user-model="userModel"
                    :taskMasterObjectModel="taskMasterObjectModel"
                    :groupModel="groupModel"
                    :activeTasks="activeTasks"
                    :headCountSum="headCountSum"
                    @registered="registered"
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
    TaskMastModel,
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
    public activeTasks: TaskMastModel[] = []
    public headCountSum: number = 0
    public get isShowLink() {
        return this.$route.params.userID !== this.userModel.userID
    }

    public async created() {
        await this.filterActiveTasks()
        this.headCountSumFunc
    }

    public get headCountSumFunc() {
        this.headCountSum = 0
        for (const task of this.activeTasks) {
            this.headCountSum += task.headCount
        }
        return this.headCountSum
    }

    @AsyncLoadingAndErrorHandle()
    public async filterActiveTasks() {
        this.activeTasks = await this.taskMasterObjectModel.filterActiveTasks()
    }
    @AsyncLoadingAndErrorHandle()
    public async registered() {
        await this.filterActiveTasks()
        this.headCountSumFunc
        this.$emit('registered')
    }
}
</script>
<style lang="stylus" scoped>
.auth_container {
    width: 600px;
}
</style>
