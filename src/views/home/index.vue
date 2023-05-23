<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" />
  </header>
  <p>{{ title }}</p>
  <p>{{ $t('msg.a2') }}</p>
</template>
<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const title = t('msg.a1');
</script>
<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 12px;
  width: 125px;
  height: 125px;
}
</style>
