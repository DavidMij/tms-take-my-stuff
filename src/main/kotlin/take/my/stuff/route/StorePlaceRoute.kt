package take.my.stuff.route

import io.micronaut.core.annotation.Nullable
import io.micronaut.data.annotation.Query
import io.micronaut.http.HttpStatus
import io.micronaut.http.MediaType
import io.micronaut.http.annotation.*
import io.micronaut.http.exceptions.HttpStatusException
import io.micronaut.http.multipart.CompletedFileUpload
import io.micronaut.http.server.exceptions.HttpServerException
import take.my.stuff.service.StorePlace
import take.my.stuff.service.StorePlaceService
import java.util.Date
import java.util.Optional

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
    @Post(consumes = [MediaType.MULTIPART_FORM_DATA])//, produces = [MediaType.IMAGE_JPEG])
    fun create(@Body storeplace: CreateStorePlace,image: CompletedFileUpload ): StorePlace {
        return try {
            storePlaceService.create(
                    name = storeplace.name,
                    category = storeplace.category,
                    price = storeplace.price,
                    availableSpace = storeplace.availableSpace,
                    address = storeplace.address,
                    description = storeplace.description,
                    startDate = storeplace.startDate,
                    endDate = storeplace.endDate,
                    image = image.bytes
            )
        } catch (e: Exception) {
            throw HttpServerException("Failed to create Vendor. Error: " + e.message)
        }
    }

    @Get
    fun list(@QueryValue category: String?, @QueryValue price: String?, @QueryValue startDate: Date?, @QueryValue endDate: Date?, @QueryValue availableSpace: String?, @QueryValue address: String?): List<StorePlace> = storePlaceService.list(category, price, startDate, endDate, availableSpace, address)
            ?: let { throw HttpStatusException(HttpStatus.NOT_FOUND, "Could not find store places") }

    @Get("/{id}/data", produces = [MediaType.IMAGE_PNG])
    fun getImage(id: String):ByteArray = storePlaceService.get(id)!!.image
            ?: let { throw HttpStatusException(HttpStatus.NOT_FOUND, "Could not find storeplace with id $id") }

    @Get("/{id}")
    fun get(id: String): StorePlace = storePlaceService.get(id)
            ?: let { throw HttpStatusException(HttpStatus.NOT_FOUND, "Could not find storeplace with id $id") }

    @Delete("/{id}")
    fun delete(id: String) {
        return try {
            storePlaceService.delete(id)
        } catch (e: Exception) {
            throw HttpServerException("Failed to Delete storeplace. Error: " + e.message)
        }
    }
}



