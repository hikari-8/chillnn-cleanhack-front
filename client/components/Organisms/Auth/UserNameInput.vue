<template>
    <div class="auth_input_container">
        <div class="label font-semibold mb-4">{{ label }}</div>

        <div class="flex w-3/5 gap-x-3 items-center justify-center">
            <app-input v-model="localValue" :type="type" />
            <!-- <div class="w-1/5">さん</div> -->
        </div>
        <div class="mt-2 text-sm text-gray-500" v-if="description">
            ＊メンバーに表示される自分の名前です。
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Prop } from 'nuxt-property-decorator'
// component
import AppInput from '@/components/Atom/AppInput.vue'

@Component({
    components: {
        AppInput,
    },
})
export default class UserNameInput extends AppInput {
    @Prop({ required: true }) label!: string | number
    //ユーザー名の説明をつけるかどうか(ここ、注意文言の赤文字に設定し直してもいいかも ex.)ユーザー名は必須です)
    @Prop({ required: false }) public description!: boolean
}
</script>
<style lang="stylus" scoped></style>
