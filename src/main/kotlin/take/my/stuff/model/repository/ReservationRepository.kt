package take.my.stuff.model.repository

import io.micronaut.data.annotation.Join
import io.micronaut.data.annotation.Relation
import io.micronaut.data.mongodb.annotation.MongoRepository
import io.micronaut.data.repository.CrudRepository
import io.micronaut.data.repository.jpa.JpaSpecificationExecutor
import org.bson.types.ObjectId
import take.my.stuff.model.entity.ReservationEntity
import take.my.stuff.model.entity.StorePlaceEntity
import take.my.stuff.model.entity.UserEntity
import take.my.stuff.model.entity.VendorEntity
import java.util.*

@MongoRepository
interface ReservationRepository : CrudRepository<ReservationEntity, ObjectId>,
    JpaSpecificationExecutor<ReservationEntity> {
    @Join(value = "host")
    @Join(value = "customer")
    @Join(value = "place")
    @Join(value = "paymentVendor")
    @Join(value = "shipmentVendor")
    @Join(value = "insuranceVendor")
    override fun findAll(): MutableIterable<ReservationEntity>

    @Join(value = "host")
    @Join(value = "customer")
    @Join(value = "place")
    @Join(value = "paymentVendor")
    @Join(value = "shipmentVendor")
    @Join(value = "insuranceVendor")
    override fun findById(id: ObjectId): Optional<ReservationEntity>

}