package take.my.stuff.model.entity

import io.micronaut.data.annotation.GeneratedValue
import io.micronaut.data.annotation.Id
import io.micronaut.data.annotation.MappedEntity
import org.bson.types.ObjectId

enum class Category {
    Insurance, Payments, Shipment
}

@MappedEntity
data class VendorEntity(
    @field: Id @GeneratedValue
    var id: ObjectId? = null,
    var name: String,
    var email: String,
    var category: Category,
    var phone: String,
)

