<template>
    <div class="name_input_container mb-4">
        <div class="label font-semibold mb-4">グループ名</div>
        <!-- name -->
        <div class="flex gap-x-3 items-center">
            <app-base-input v-model="groupModel.groupName" class="w-4/5" />
        </div>
    </div>
</template>
<script lang="ts">
/* eslint-disable no-console */
import { GroupModel } from 'chillnn-cleanhack-abr'
import { Component, Prop, Vue } from 'nuxt-property-decorator'
// component
import AppButton from '@/components/Atom/AppButton.vue'
import AppBaseInput from '@/components/Atom/Input/AppBaseInput.vue'

@Component({
    components: {
        AppButton,
        AppBaseInput,
    },
})
export default class EditGroup extends Vue {
    @Prop({ required: true }) groupModel!: GroupModel

    get userName() {
        return this.groupModel
    }
}
</script>
<style lang="stylus" scoped></style>
