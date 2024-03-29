package take.my.stuff.route

import io.micronaut.core.annotation.Nullable
import io.micronaut.data.annotation.Query
import io.micronaut.http.HttpStatus
import io.micronaut.http.MediaType
import io.micronaut.http.annotation.*
import io.micronaut.http.exceptions.HttpStatusException
import io.micronaut.http.multipart.CompletedFileUpload
import io.micronaut.http.server.exceptions.HttpServerException
import org.bson.types.ObjectId
import take.my.stuff.model.entity.User
import take.my.stuff.model.entity.UserEntity
import take.my.stuff.service.StorePlace
import take.my.stuff.service.StorePlaceDto
import take.my.stuff.service.StorePlaceService
import take.my.stuff.service.UserService
import java.time.ZoneId
import java.util.Date
import java.util.Optional

@Controller("/v1/storeplace")
class StorePlaceRoute(
        private val storePlaceService: StorePlaceService,
        private val userService: UserService) {

    data class CreateStorePlace(
            var name: String,
            var description: String,
            var category: String,
            var address: String,
            var availableSpace: String,
            var price: String,
            var startDate: Date,
            var endDate: Date,
            var userId: String
    )

    @Status(HttpStatus.CREATED)
    @Post(consumes = [MediaType.MULTIPART_FORM_DATA])//, produces = [MediaType.IMAGE_JPEG])
    fun create(@Body storeplace: CreateStorePlace,image: CompletedFileUpload ): StorePlace {
        return try {
            val user: User = userService.get(storeplace.userId)!!
            storePlaceService.create(
                    name = storeplace.name,
                    category = storeplace.category,
                    price = storeplace.price,
                    availableSpace = storeplace.availableSpace,
                    address = storeplace.address,
                    description = storeplace.description,
                    startDate = storeplace.startDate,
                    endDate = storeplace.endDate,
                    image = image.bytes,
//                    userId = storeplace.userId
                    user = user
            )
        } catch (e: Exception) {
            throw HttpServerException("Failed to create Vendor. Error: " + e.message)
        }
    }

    @Get
    fun list(@QueryValue category: String?, @QueryValue price: String?, @QueryValue startDate: Date?, @QueryValue endDate: Date?, @QueryValue availableSpace: String?, @QueryValue address: String?,@QueryValue userId: String?): List<StorePlaceDto> = storePlaceService
            .list(category, price, startDate, endDate, availableSpace, address, userId)
            ?.map { it.dto }
            ?: let { throw HttpStatusException(HttpStatus.NOT_FOUND, "Could not find store places") }

    @Get("/{id}/data", produces = [MediaType.IMAGE_PNG])
    fun getImage(id: String):ByteArray = storePlaceService.get(id)!!.image
            ?: let { throw HttpStatusException(HttpStatus.NOT_FOUND, "Could not find storeplace with id $id") }

    @Get("/{id}")
    fun get(id: String): StorePlaceDto = storePlaceService.get(id)?.dto
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



