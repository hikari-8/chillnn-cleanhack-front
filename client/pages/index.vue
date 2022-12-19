<template>
    <div>
        <div class="">CleanHack</div>
        <div class="">Home</div>
        <br />
        <br />
        <nuxt-link to="/auth/signup">ログインする</nuxt-link>
        <br />
        <br />
    </div>
</template>
<script lang="ts">
import { UserModel } from 'chillnn-cleanhack-abr'
import { Component, Vue } from 'nuxt-property-decorator'
import { userInteractor } from '~/api'
import UserEdit from '@/components/Organisms/User/Edit/modules/UserEdit.vue'

import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'

// component
@Component({
    components: {
        UserEdit,
    },
})
export default class Top extends Vue {
    public userModel: UserModel | null = null
}
</script>
<style lang="stylus" scoped></style>
