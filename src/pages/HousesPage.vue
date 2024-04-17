<script setup>

import { computed, onMounted } from 'vue';
import { housesService } from '../services/HousesService.js';
import { logger } from '../utils/Logger.js';
import { AppState } from '../AppState.js';
import HouseCard from '../components/HouseCard.vue'

onMounted(() => { getHouses() })
const account = computed(() => AppState.account)
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
    <div class="row">
      <div class="col-12 mt-3 d-flex align-items-center gap-4">
        <h1>Houses</h1>
        <button v-if="account" class="btn btn-outline-primary btn-lg" title="Create New House Listing"
          data-bs-toggle="modal" data-bs-target="#houseFormModal">+</button>
      </div>
    </div>

    <div class="row justify-content-evenly">
      <HouseCard v-for="house in houses" :key="house.id" :house="house" />
    </div>

  </section>

  <HouseFormModal />
  <HouseUpdateFormModal />
</template>


<style scoped></style>