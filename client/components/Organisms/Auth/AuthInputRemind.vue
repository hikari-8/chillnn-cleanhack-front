<template>
    <div class="auth_input_container">
        <div class="label font-semibold mb-4">{{ label }}</div>
        <div class="input w-3/5">
            <app-input v-model="localValue" :type="type" />
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
}
</script>
<style lang="stylus" scoped></style>
