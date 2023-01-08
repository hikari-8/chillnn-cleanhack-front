<template>
    <div class="mx-auto py-32 auth_container w-600px" v-if="userModel">
        <div class="font-semibold mb-8 text-2xl">Home 🏠</div>
        <div
            v-if="!isNameUpdated"
            class="input_container flex font-semibold mb-4"
        >
            <div class="mt-12">
                ようこそCLEAN HACKへ　🎉
                <br />
                ユーザー設定からお名前を登録してください！
            </div>
        </div>
        <div v-else class="input_container flex font-semibold mb-4">
            <div>おかえりなさい！</div>
            {{ userModel.name }}
            <div>さん！🎉</div>
        </div>
    </div>
</template>
<script lang="ts">
import { UserModel } from 'chillnn-cleanhack-abr'
import { Vue, Component, Prop } from 'nuxt-property-decorator'
// component

@Component({
    components: {},
})
export default class HomeBody extends Vue {
    @Prop({ required: true }) userModel!: UserModel
    isNameUpdated: boolean = false

    public created() {
        if (this.userModel.name !== '名無し') {
            this.isNameUpdated = true
        }
    }
}
</script>
<style lang="stylus" scoped>
.auth_container {
    width: 600px;
}
</style>
