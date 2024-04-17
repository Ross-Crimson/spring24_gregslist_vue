<script setup>
import { computed } from 'vue';
import { House } from '../models/House.js';
import { housesService } from '../services/HousesService.js';
import { logger } from '../utils/Logger.js';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';


async function destroyHouse(houseId) {
    try {
        const wantsToDestroy = await Pop.confirm("Are you sure you want to delete that car?")

        if (!wantsToDestroy) return
        await housesService.destroyHouse(houseId)
    } catch (error) {
        logger.log(error)
    }
}

function assignHouseToUpdate(house) {
    AppState.activeHouse = house
    console.log(house)
}

const account = computed(() => AppState.account)

defineProps({ house: House })

</script>


<template>
    <div class="card col-5 m-3 shadow">
        <div class="card-img pt-3">
            <img :src="house.imgUrl" alt="" class="img-fluid">
        </div>
        <div class="card-body">
            <p>Year: {{ house.year }} || Levels: {{ house.levels }}</p>
            <p>Bedrooms: {{ house.bedrooms }} || Bathrooms: {{ house.bathrooms }}</p>
            <p class="card-text">Description: {{ house.description }}</p>
            <p>Price: {{ house.price }}$</p>
            <div class="d-flex justify-content-end">
                <button v-if="house.creatorId == account?.id" class="btn btn-outline-success align-start"
                    @click="assignHouseToUpdate(house)" title="Update House Listing" data-bs-toggle="modal"
                    data-bs-target="#houseUpdateFormModal">Edit<i class="mdi mdi-pencil"></i></button>
                <button v-if="house.creatorId == account?.id" class="btn btn-outline-danger align-end"
                    @click="destroyHouse(`${house.id}`)"><i class="mdi mdi-home-off"></i></button>
            </div>
        </div>
    </div>
</template>


<style scoped>
.house-img {
    width: auto;
    height: 40vh;
    object-fit: cover;
}
</style>