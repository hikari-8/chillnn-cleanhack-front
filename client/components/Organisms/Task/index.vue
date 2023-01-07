<template>
    <div class="mx-auto pb-32 auth_container w-600px" v-if="userModel">
        <!-- 掃除場所のマスターデータ -->
        <div class="mb-20">
            <edit-task :user-model="userModel" />
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
