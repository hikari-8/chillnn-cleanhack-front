<template>
    <div class="name_input_container" v-if="userModel">
        <div class="label font-semibold mb-4">{{ label }}</div>
        <!-- name -->
        <div class="flex gap-x-3 items-center">
            <app-base-input v-model="userModel.name" class="w-4/5" />
            <div class="w-1/5">さん</div>
        </div>
        <div class="mt-2 text-sm text-gray-500" v-if="description">
            ＊メンバーに表示される自分の名前です。
        </div>
    </div>
</template>
<script lang="ts">
import { UserModel } from 'chillnn-cleanhack-abr'
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import AppBaseInput from '@/components/Atom/Input/AppBaseInput.vue'

@Component({
    components: {
        AppBaseInput,
    },
})
export default class UserEdit extends Vue {
    @Prop({ required: true }) userModel!: UserModel
    @Prop({ required: true }) label!: string | number
    //ユーザー名の説明をつけるかどうか(ここ、注意文言の赤文字に設定し直してもいいかも ex.)ユーザー名は必須です)
    @Prop({ required: false }) public description!: boolean
}
</script>
<style lang="stylus" scoped></style>
