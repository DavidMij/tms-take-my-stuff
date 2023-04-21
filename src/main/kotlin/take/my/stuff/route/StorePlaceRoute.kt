package take.my.stuff.route

import io.micronaut.http.HttpStatus
import io.micronaut.http.annotation.*
import io.micronaut.http.exceptions.HttpStatusException
import io.micronaut.http.server.exceptions.HttpServerException
import take.my.stuff.service.StorePlace
import take.my.stuff.service.StorePlaceService
import java.util.Date



@Controller("/v1/storeplace")
class StorePlaceRoute(
    private val storePlaceService: StorePlaceService) {

    data class CreateStorePlace(
        var name: String,
        var description: String,
        var category: String,
        var address: String,
        var availableSpace: String,
        var price: String,
        var startDate: Date,
        var endDate: Date,
    )
    @Status(HttpStatus.CREATED)
    @Post
    fun create(@Body storeplace: CreateStorePlace): StorePlace {
        return try {
            storePlaceService.create(
                name = storeplace.name,
                category = storeplace.category,
                price = storeplace.price,
                availableSpace = storeplace.availableSpace,
                address = storeplace.address,
                description = storeplace.description,
                startDate = storeplace.startDate,
                endDate = storeplace.endDate
            )
        } catch (e: Exception) {
            throw HttpServerException("Failed to create Vendor. Error: " + e.message)
        }
    }

    @Get
    fun list(): List<StorePlace> = storePlaceService.list()

    @Get("/{id}")
    fun get(id: String): StorePlace = storePlaceService.get(id)
        ?: let { throw HttpStatusException(HttpStatus.NOT_FOUND, "Could not find vendor with id $id") }

    @Delete("/{id}")
    fun delete(id: String) {
        return try {
            storePlaceService.delete(id)
        } catch (e: Exception) {
            throw HttpServerException("Failed to Delete Vendor. Error: " + e.message)
        }
    }
}