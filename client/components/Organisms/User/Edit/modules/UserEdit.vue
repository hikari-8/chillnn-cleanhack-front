<template>
    <div class="">
        <div>ユーザー名</div>
        <div class="name">
            <!-- name -->
            <div class="name_inner">
                <!-- <app-input v-model="this.userModel.name" class="input" /> -->

                <div>さん</div>
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
    @Prop({ required: true }) userModel!: UserModel

    get userName() {
        return this.userModel
    }

    @AsyncLoadingAndErrorHandle()
    public async register() {
        await this.userModel.register()
        this.$emit('registered')
        console.log(this.userModel.name)
    }
}
</script>
<style lang="stylus" scoped></style>
