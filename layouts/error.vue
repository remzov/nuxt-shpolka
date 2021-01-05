<template lang="pug">
  <div>
    h1(v-if="error.statusCode === 404") Страница не найдена!
    nuxtLink(to="/") На главную
  </div>
</template>

<script>
  export default {
    props: ['error'],
    layout: 'basic'
  }
</script>
