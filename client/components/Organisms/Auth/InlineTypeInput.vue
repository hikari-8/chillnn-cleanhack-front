<template>
    <div class="auth_input_container mb-20">
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
export default class AuthInput extends AppInput {
    @Prop({ required: true }) label!: string | number
    //表示名の説明をつけるかどうか
    @Prop({ required: false }) public description!: boolean
}
</script>
<style lang="stylus" scoped></style>
