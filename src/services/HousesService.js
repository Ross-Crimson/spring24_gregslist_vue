import { AppState } from "../AppState.js"
import { House } from "../models/House.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class HousesService {
    async getHouses() {
        const response = await api.get('api/houses')
        console.log(response)
        const houseData = response.data.map(house => new House(house))
        AppState.houses = houseData
    }

    async createHouse(houseData) {
        const response = await api.post('api/houses', houseData)
        const newHouse = new House(response.data)
        AppState.houses.push(newHouse)
    }

    async destroyHouse(houseId) {
        const response = await api.delete(`api/houses/${houseId}`)
        const houseIndex = AppState.houses.findIndex(house => house.id == houseId)
        if (houseIndex == -1) throw new Error("You messed on findIndex, big dawg")
        AppState.houses.splice(houseIndex, 1)
    }

}

export const housesService = new HousesService