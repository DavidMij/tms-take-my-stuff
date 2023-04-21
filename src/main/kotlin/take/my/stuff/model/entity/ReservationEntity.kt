package take.my.stuff.model.entity

import io.micronaut.data.annotation.GeneratedValue
import io.micronaut.data.annotation.Id
import io.micronaut.data.annotation.MappedEntity
import io.micronaut.data.annotation.Relation
import org.bson.types.ObjectId
import take.my.stuff.service.StorePlace
import take.my.stuff.service.Vendor
import java.util.*

@MappedEntity
data class ReservationEntity(
    @field: Id @GeneratedValue
    var id: ObjectId? = null,

    @Relation(Relation.Kind.MANY_TO_ONE)
    var host: UserEntity,

    @Relation(Relation.Kind.MANY_TO_ONE)
    var customer: UserEntity,

    @Relation(Relation.Kind.MANY_TO_ONE)
    var place: StorePlaceEntity,

    @Relation(Relation.Kind.MANY_TO_ONE)
    var paymentVendor: VendorEntity?,

    @Relation(Relation.Kind.MANY_TO_ONE)
    var shipmentVendor: VendorEntity?,

    @Relation(Relation.Kind.MANY_TO_ONE)
    var insuranceVendor: VendorEntity?,

    var startDate: Date,
    var endDate: Date,
)
