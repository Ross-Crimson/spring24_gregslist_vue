<script setup>
import { housesService } from '../services/HousesService.js';
import { ref } from 'vue'
import { logger } from '../utils/Logger.js';
import { Modal } from 'bootstrap';

const editableHouseData = ref({
    year: 0,
    levels: 0,
    bedrooms: 0,
    bathrooms: 0,
    imgUrl: '',
    description: '',
    price: 0
})

async function createHouse() {
    try {
        await housesService.createHouse(editableHouseData.value)

        editableHouseData.value = {
            year: 0,
            levels: 0,
            bedrooms: 0,
            bathrooms: 0,
            imgUrl: '',
            description: '',
            price: 0
        }

        Modal.getOrCreateInstance('#houseFormModal').hide()

    } catch (error) {
        logger.log(error)
    }
}

</script>

<template>
    <div class="modal fade" id="houseFormModal" tabindex="-1" aria-labelledby="houseFormModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="carFormModalLabel">List New House</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                    <form @submit.prevent="createHouse()">

                        <div class="form-floating mb-3">
                            <input v-model="editableHouseData.year" type="number" class="form-control" id="houseYear"
                                placeholder="1975" required min="1800" max="2026">
                            <label for="houseYear">Year House Built</label>
                        </div>

                        <div class="form-floating mb-3">
                            <input v-model="editableHouseData.levels" type="number" class="form-control"
                                id="houseLevels" placeholder="1" required min="1" max="30">
                            <label for="houseLevels">Floors in House</label>
                        </div>

                        <div class="form-floating mb-3">
                            <input v-model="editableHouseData.bedrooms" type="number" class="form-control"
                                id="houseBedrooms" placeholder="1" required min="1" max="30">
                            <label for="houseBedrooms">Bedrooms</label>
                        </div>

                        <div class="form-floating mb-3">
                            <input v-model="editableHouseData.bathrooms" type="number" class="form-control"
                                id="houseBathrooms" placeholder="1" required min="1" max="30">
                            <label for="houseBathrooms">Bathrooms</label>
                        </div>

                        <div class="form-floating mb-3">
                            <textarea v-model="editableHouseData.description" type="text" class="form-control"
                                id="houseDescription" placeholder="Descripton of House" maxLength="5000"></textarea>
                            <label for="houseDescription">Description of House</label>
                        </div>

                        <div class="form-floating mb-3">
                            <input v-model="editableHouseData.imgUrl" type="url" class="form-control" id="houseImgUrl"
                                placeholder="House Image" maxlength="500">
                            <label for="houseImgUrl">House Image</label>
                        </div>

                        <div class="form-floating mb-3">
                            <input v-model="editableHouseData.price" type="number" class="form-control" id="housePrice"
                                placeholder="1" required>
                            <label for="housePrice">Price</label>
                        </div>

                        <div class="text-end">
                            <button class="btn btn-success" type="submit">Submit</button>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>