<template>
    <div class="mx-auto py-32 auth_container w-600px" v-if="userModel">
        <div class="font-semibold mb-8 text-2xl">Home 🏠</div>
        <div class="input_container flex font-semibold mb-4">
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
}
</script>
<style lang="stylus" scoped>
.auth_container {
    width: 600px;
}
</style>
