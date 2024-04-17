<script setup>

import { computed, onMounted } from 'vue';
import { housesService } from '../services/HousesService.js';
import { logger } from '../utils/Logger.js';
import { AppState } from '../AppState.js';

onMounted(() => { getHouses() })

const houses = computed(() => AppState.houses)

async function getHouses() {
  try {
    await housesService.getHouses()
  } catch (error) {
    logger.log(error)
  }
}

</script>


<template>
  <section class="container">
    <h1>{{ houses }}</h1>

  </section>
</template>


<style scoped></style>