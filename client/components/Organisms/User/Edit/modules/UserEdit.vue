<template>
    <div class="">あああああ</div>
</template>
<script lang="ts">
import { UserModel } from 'chillnn-cleanhack-abr'
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import AppInput from '@/components/Atom/AppInput.vue'

@Component({
    components: {
        AppInput,
    },
})
export default class UserEdit extends Vue {
    @Prop({ required: true }) userModel!: UserModel
}
</script>
<style lang="stylus" scoped></style>
