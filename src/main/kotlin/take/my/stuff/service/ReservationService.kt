package take.my.stuff.service

import jakarta.inject.Singleton
import org.bson.types.ObjectId
import take.my.stuff.model.entity.ReservationEntity
import take.my.stuff.model.entity.User
import take.my.stuff.model.repository.ReservationRepository
import java.util.*
import kotlin.jvm.optionals.getOrElse


data class Reservation(
    var id: String,
    var host: User,
    var customer: User,
    var place: StorePlace,
    var paymentVendor: Vendor?,
    var shipmentVendor: Vendor?,
    var insuranceVendor: Vendor?,
    var startDate: Date,
    var endDate: Date,
)
fun ReservationEntity.toDto() = Reservation(
    id = this.id!!.toHexString(),
    host = this.host.toDto(),
    customer = this.customer.toDto(),
    shipmentVendor = this.shipmentVendor?.toDto(),
    insuranceVendor = this.insuranceVendor?.toDto(),
    place = this.place.toDto(),
    paymentVendor = this.paymentVendor?.toDto(),
    startDate = this.startDate,
    endDate = this.endDate
)

fun Reservation.toEntity() = ReservationEntity(
    id = ObjectId(this.id),
    host = this.host.toEntity(),
    customer = this.customer.toEntity(),
    shipmentVendor = this.shipmentVendor?.toEntity(),
    insuranceVendor = this.insuranceVendor?.toEntity(),
    place = this.place.toEntity(),
    paymentVendor = this.paymentVendor?.toEntity(),
    startDate = this.startDate,
    endDate = this.endDate
)

@Singleton
class ReservationService(private val reservationRepository: ReservationRepository) {

    fun create(
        host: User,
        customer: User,
        shipmentVendor: Vendor? = null,
        insuranceVendor: Vendor? = null,
        paymentVendor: Vendor? = null,
        place: StorePlace,
        startDate: Date,
        endDate: Date
    ): Reservation =
        reservationRepository.save(
            ReservationEntity(
                host = host.toEntity(),
                customer = customer.toEntity(),
                shipmentVendor = shipmentVendor?.toEntity(),
                insuranceVendor = insuranceVendor?.toEntity(),
                place = place.toEntity(),
                paymentVendor = paymentVendor?.toEntity(),
                startDate = startDate,
                endDate = endDate
            )
        ).toDto()

    fun delete(id: String) = reservationRepository.deleteById(ObjectId(id))

    fun get(id: String): Reservation? = reservationRepository.findById(ObjectId(id)).getOrElse { null }?.toDto()

    fun list(): List<Reservation> = reservationRepository.findAll().map { it.toDto() }


}