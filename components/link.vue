<template lang="pug">
  nuxt-link(v-if="to" :to="to") {{text}}
  a(v-else-if="href" :href="href") {{text}}
</template>

<script>
export default {
  props: {
    to: {
      type: Object,
      required: false
    },

    href: {
      type: String,
      required: false
    }
  }
}
</script>
