<template>
    <div class="user_edit_container h-full">
        <div class="label font-semibold mb-4">{{ label }}</div>
        <div class="input_container">
            <!-- task edit -->
            <task-list :user-model="userModel" />
            <!-- <edit-tasks :user-model="userModel" /> -->
        </div>
    </div>
</template>
<script lang="ts">
import {
    UserModel,
    TaskMasterObjectModel,
    TaskMastModel,
} from 'chillnn-cleanhack-abr'
import { Vue, Component, Prop } from 'nuxt-property-decorator'
// component
import TaskList from '~/components/Organisms/User/Task/modules/TaskList.vue'
import AppButton from '@/components/Atom/Button/AppButton.vue'
import AppTitle from '@/components/Atom/Text/AppTitle.vue'
import AppText from '@/components/Atom/Text/AppText.vue'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'

@Component({
    components: {
        TaskList,
        AppButton,
        AppTitle,
        AppText,
    },
})
export default class EditTask extends Vue {
    @Prop({ required: true }) userModel!: UserModel
    @Prop({ required: true }) label!: string | number

    // public get isShowLink() {
    //     return this.$route.params.userID !== this.userModel.userID
    // }
    // @AsyncLoadingAndErrorHandle()
    // public async register() {
    //     await this.userModel.register()
    //     this.$emit('registered')
    // }
}
</script>
<style lang="stylus" scoped>
.user_edit_container {
    .button_container {
        padding-top: 10px;
        display: flex;
        justify-content: center;
    }
}
</style>
