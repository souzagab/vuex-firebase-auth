<template lang="pug">
v-container
  v-layout(row v-if='error')
    v-flex(xs12 sm6 offset-sm3)
      app-alert(@dismissed='onDismissed' :text='error.message')
  v-row
    v-flex(xs12 sm6 offset-sm3)
      v-card
        v-card-text
          v-container
            form(@submit.prevent='onSignin')
              v-row
                v-flex(xs12)
                  v-text-field#email(name='email' label='Email' v-model='email' type='email' required)
              v-row
                v-flex(xs12)
                  v-text-field#password(name='password' label='Password' v-model='password' type='password' required)
              v-row
                v-flex(xs12)
                  .text-xs-center
                    v-btn(rounded type='submit' :disabled='loading' :loading='loading')
                      | Sign in
                      v-icon(right)
                      span.custom-loader(slot='loader')
                        v-icon(light) cached

</template>

<script>
import { mapGetters } from 'vuex'
export default {

  data: () => ({
    email: null,
    password: null
  }),

  computed: {
    ...mapGetters([
      'loading',
      'error',
      'user'
    ])
  },

  methods: {
    onSignin () {
      this.$store.dispatch('signUserIn', { email: this.email, password: this.password })
    }
  }

}
</script>
