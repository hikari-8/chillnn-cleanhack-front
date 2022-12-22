<template>
    <div class="group_edit_container">
        <div class="input_container">
            <!-- user edit -->
            <group-edit-name :group-model="groupModel" />
        </div>
        <div class="button_container">
            <!-- button -->
            <app-button @click="register">更新する</app-button>
        </div>
    </div>
</template>
<script lang="ts">
import { GroupModel } from 'chillnn-cleanhack-abr'
import { Vue, Component, Prop } from 'nuxt-property-decorator'
// component
import GroupEditName from '@/components/Organisms/Group/modules/EditGroupName.vue'
import AppButton from '@/components/Atom/AppButton.vue'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'

@Component({
    components: {
        GroupEditName,
        AppButton,
    },
})
export default class EditGroup extends Vue {
    @Prop({ required: true }) groupModel!: GroupModel

    @AsyncLoadingAndErrorHandle()
    public async register() {
        await this.groupModel.register()
        this.$emit('registered')
        console.log(this.groupModel.groupName, '子コンポーネント')
        console.log(this.groupModel)
    }
}
</script>
<style lang="stylus" scoped>
.user_edit_container {
    height: 100%;

    .title_container {
        text-align: center;
        padding-bottom: 30px;

        @media only screen and (max-width: $spSize) {
            padding-bottom: 10px;
        }
    }

    .input_container {
    }

    .button_container {
        padding-top: 10px;
        display: flex;
        justify-content: center;
    }
}
</style>
