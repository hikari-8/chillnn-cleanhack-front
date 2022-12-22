<template>
    <div class="container">
        <div class="input_area">
            <app-base-input
                v-model="this.taskMasterObjectModel.remindSlackWeek"
            />
            <app-base-input
                v-model="this.taskMasterObjectModel.remindSlackTime"
            />
        </div>

        <div class="button">
            <app-button :disabled="!taskMasterObjectModel" @click="register"
                >登録</app-button
            >
        </div>
    </div>
</template>
<script lang="ts">
/* eslint-disable no-console */
import { TaskMasterObjectModel } from 'chillnn-cleanhack-abr'
import { Component, Prop, Vue } from 'nuxt-property-decorator'
// component
import AppButton from '@/components/Atom/AppButton.vue'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'
import AppBaseInput from '@/components/Atom/Input/AppBaseInput.vue'

@Component({
    components: {
        AppButton,
        AppBaseInput,
    },
})
export default class UpdateMasterData extends Vue {
    @Prop({ required: true }) taskMasterObjectModel!: TaskMasterObjectModel

    @AsyncLoadingAndErrorHandle()
    public async register() {
        await this.taskMasterObjectModel.register()
        this.$emit('registered')
    }
}
</script>
<style lang="stylus" scoped></style>
