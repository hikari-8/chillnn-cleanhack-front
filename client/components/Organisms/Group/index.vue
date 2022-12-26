<template>
    <div class="group_edit_container">
        <div class="input_container">
            <!-- user edit -->
            <group-edit-name :group-model="groupModel" />
        </div>
    </div>
</template>
<script lang="ts">
import { GroupModel, UserModel } from 'chillnn-cleanhack-abr'
import { Vue, Component, Prop } from 'nuxt-property-decorator'
// component
import GroupEditName from '@/components/Organisms/Group/modules/EditGroupName.vue'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'

@Component({
    components: {
        GroupEditName,
    },
})
export default class EditGroup extends Vue {
    @Prop({ required: true }) groupModel!: GroupModel
    @Prop({ required: true }) userModel!: UserModel

    @AsyncLoadingAndErrorHandle()
    public async registerGroup() {
        await this.userModel!.updateGroupMast()
        this.$emit('registered')
        console.log(this.groupModel!.groupName, '子コンポーネント')
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
