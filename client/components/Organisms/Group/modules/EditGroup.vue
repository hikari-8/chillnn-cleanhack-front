<template>
    <div class="name_input_container" v-if="groupModel">
        <div class="label font-semibold mb-4">{{ label }}</div>
        <!-- name -->
        <div class="flex gap-x-3 items-center">
            <app-base-input v-model="groupModel.groupName" class="w-4/5" />
        </div>
        <div class="mt-2 text-sm text-gray-500" v-if="description">
            ＊くじを割り当てるメンバーが所属するグループの名前です。
        </div>
    </div>
</template>
<script lang="ts">
import { GroupModel } from 'chillnn-cleanhack-abr'
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import AppBaseInput from '@/components/Atom/Input/AppBaseInput.vue'

@Component({
    components: {
        AppBaseInput,
    },
})
export default class EditGroup extends Vue {
    @Prop({ required: true }) groupModel!: GroupModel
    @Prop({ required: true }) label!: string | number
    //ユーザー名の説明をつけるかどうか(ここ、注意文言の赤文字に設定し直してもいいかも ex.)ユーザー名は必須です)
    @Prop({ required: false }) public description!: boolean

    get groupName() {
        return this.groupModel
    }
}
</script>
<style lang="stylus" scoped></style>
