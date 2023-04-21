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
    var id: String ,
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
    description =this.description,
    category = this.category,
    address = this.address,
    availableSpace = this.availableSpace,
    price = this.price,
    startDate  = this.startDate,
    endDate = this.endDate
)
fun StorePlace.toEntity() = StorePlaceEntity(
    id = ObjectId(this.id),
    name = this.name,
    description =this.description,
    category = this.category,
    address = this.address,
    availableSpace = this.availableSpace,
    price = this.price,
    startDate  = this.startDate,
    endDate = this.endDate
)
@Singleton
class StorePlaceService(private val storePlaceRepository: StorePlaceRepository) {

    fun create(name:String, description:String, category:String, address:String, availableSpace:String, price:String, startDate:Date, endDate: Date): StorePlace =
        storePlaceRepository.save(
            StorePlaceEntity(
                name = name,
                category = category,
                description = description,
                address = address,
                availableSpace = availableSpace,
                price = price,
                startDate = startDate,
                endDate =endDate
            )
        ).toDto()

    fun delete(id: String) = storePlaceRepository.deleteById(ObjectId(id))

    fun get(id: String): StorePlace? = storePlaceRepository.findById(ObjectId(id)).getOrElse { null }?.toDto()

    fun list(): List<StorePlace> = storePlaceRepository.findAll().map { it.toDto() }

}