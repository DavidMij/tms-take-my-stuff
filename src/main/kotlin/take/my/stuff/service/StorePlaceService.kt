package take.my.stuff.service

import jakarta.inject.Singleton
import org.bson.types.ObjectId
import take.my.stuff.model.entity.*
import take.my.stuff.model.repository.StorePlaceRepository
import java.time.LocalDate
import java.time.ZoneId
import java.time.format.DateTimeFormatter
import java.util.*
import kotlin.jvm.optionals.getOrElse


data class StorePlace(
        var id: String,
        var name: String,
        var description: String,
        var category: String,
        var address: String,
        var availableSpace: String,
        var price: String,
        var startDate: Date,
        var endDate: Date,
)

fun StorePlaceEntity.toDto() = StorePlace(
        id = this.id!!.toHexString(),
        name = this.name,
        description = this.description,
        category = this.category,
        address = this.address,
        availableSpace = this.availableSpace,
        price = this.price,
        startDate = this.startDate,
        endDate = this.endDate
)

fun StorePlace.toEntity() = StorePlaceEntity(
        id = ObjectId(this.id),
        name = this.name,
        description = this.description,
        category = this.category,
        address = this.address,
        availableSpace = this.availableSpace,
        price = this.price,
        startDate = this.startDate,
        endDate = this.endDate
)

@Singleton
class StorePlaceService(private val storePlaceRepository: StorePlaceRepository) {

    fun create(name: String, description: String, category: String, address: String, availableSpace: String, price: String, startDate: Date, endDate: Date): StorePlace =
            storePlaceRepository.save(
                    StorePlaceEntity(
                            name = name,
                            category = category,
                            description = description,
                            address = address,
                            availableSpace = availableSpace,
                            price = price,
                            startDate = startDate,
                            endDate = endDate
                    )
            ).toDto()

    fun delete(id: String) = storePlaceRepository.deleteById(ObjectId(id))

    fun get(id: String): StorePlace? = storePlaceRepository.findById(ObjectId(id)).getOrElse { null }?.toDto()

    fun list(category: String?, price: String?, startDate: Date?, endDate: Date?, availableSpace: String?, address: String?): List<StorePlace>? {
//        TODO: make this function be able join between
        if (category != null) {
            return getByCategory(category = category)
        }
        if (price != null) {
            return getByPrice(price = price)
        }
        if (startDate != null) {
            return getByStartDate(startDate = startDate)
        }
        if (endDate != null) {
            return getByEndDate(endDate = endDate)
        }
        if (availableSpace != null) {
            return getByAvailableSpace(availableSpace = availableSpace)
        }

        if (address != null) {
            return getAddressBySearch(address = address)
        }

        return storePlaceRepository.findAll().map { it.toDto() }
    }

    private fun getByCategory(category: String): List<StorePlace>? = storePlaceRepository.findByCategory(category)?.map { it.toDto() }
    private fun getByStartDate(startDate: Date): List<StorePlace>? = storePlaceRepository.findByStartDate(startDate)?.map { it.toDto() }
    private fun getByEndDate(endDate: Date): List<StorePlace>? = storePlaceRepository.findByEndDate(endDate)?.map { it.toDto() }
    private fun getByPrice(price: String): List<StorePlace>? = storePlaceRepository.findByPrice(price)?.map { it.toDto() }
    private fun getByAvailableSpace(availableSpace: String): List<StorePlace>? = storePlaceRepository.findByAvailableSpace(availableSpace)?.map { it.toDto() }
    private fun getAddressBySearch(address: String): List<StorePlace>? = storePlaceRepository.getAddress(address)?.map { it.toDto() }

}