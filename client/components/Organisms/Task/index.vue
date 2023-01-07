<template>
    <div
        class="mx-auto pb-32 auth_container w-600px"
        v-if="userModel && taskMasterObjectModel"
    >
        <!-- 掃除場所のマスターデータ -->
        <div class="mb-20">
            <edit-task
                :user-model="userModel"
                :taskMasterObjectModel="taskMasterObjectModel"
            />
        </div>
    </div>
</template>
<script lang="ts">
import { UserModel, TaskMasterObjectModel } from 'chillnn-cleanhack-abr'
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
