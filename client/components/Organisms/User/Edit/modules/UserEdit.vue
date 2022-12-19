<template>
    <div class="">
        <div>表示名</div>
        <div class="name">
            <!-- name -->
            <div class="name_inner">
                <!-- <app-input v-model="this.userModel.name" class="input" /> -->
                <div>さん</div>
            </div>
            <div class="button">
                <app-button :disabled="!name" @click="register"
                    >登録</app-button
                >
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { UserModel } from 'chillnn-cleanhack-abr'
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'
import AppInput from '@/components/Atom/AppInput.vue'
import AppButton from '@/components/Atom/AppButton.vue'

@Component({
    components: {
        AppInput,
        AppButton,
    },
})
export default class UserEdit extends Vue {
    @Prop({ required: false }) userModel!: UserModel
    public name: string = ''

    get userName() {
        return this.userModel.name
    }

    @AsyncLoadingAndErrorHandle()
    public async register() {
        // await this.userModel.name =
        await this.userModel.register()
        this.$emit('registered')
    }
}
</script>
<style lang="stylus" scoped></style>
