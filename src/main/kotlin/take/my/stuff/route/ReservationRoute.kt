package take.my.stuff.route

import io.micronaut.http.HttpStatus
import io.micronaut.http.annotation.*
import io.micronaut.http.exceptions.HttpStatusException
import io.micronaut.http.server.exceptions.HttpServerException
import take.my.stuff.service.*
import java.util.*

data class PresentableReservation(
    var id: String,
    var host: PresentableUser,
    var customer: PresentableUser,
    var place: StorePlace,
    var paymentVendor: Vendor?,
    var shipmentVendor: Vendor?,
    var insuranceVendor: Vendor?,
    var startDate: Date,
    var endDate: Date,
)

private fun Reservation.toPresentable() = PresentableReservation(
    id = this.id,
    host = this.host.toPresentable(),
    customer = this.customer.toPresentable(),
    place = this.place,
    paymentVendor = this.paymentVendor,
    shipmentVendor = this.shipmentVendor,
    insuranceVendor = this.insuranceVendor,
    startDate = this.startDate,
    endDate = this.endDate
)

@Controller("/v1/reservation")
class ReservationRoute(
    private val reservationService: ReservationService,
    private val userService: UserService,
    private val vendorService: VendorService,
    private val storePlaceService: StorePlaceService
) {

    data class CreateReservation(
        var host: String,
        var customer: String,
        var place: String,
        var paymentVendor: String?,
        var shipmentVendor: String?,
        var insuranceVendor: String?,
        var startDate: Date,
        var endDate: Date,
    )

    @Status(HttpStatus.CREATED)
    @Post
    fun create(@Body reservation: CreateReservation): PresentableReservation {
        return try {
            reservationService.create(
                host = userService.get(reservation.host)!!,
                customer = userService.get(reservation.customer)!!,
                shipmentVendor = reservation.shipmentVendor?.let { vendorService.get(it)!! },
                insuranceVendor = reservation.insuranceVendor?.let { vendorService.get(it)!! },
                paymentVendor = reservation.paymentVendor?.let { vendorService.get(it)!! },
                place = storePlaceService.get(reservation.place)!!,
                startDate = reservation.startDate,
                endDate = reservation.endDate
            ).toPresentable()
        } catch (e: Exception) {
            throw HttpServerException("Failed to create Vendor. Error: " + e.message)
        }
    }

    @Get
    fun list(): List<PresentableReservation> = reservationService.list().map { it.toPresentable() }

    @Get("/{id}")
    fun get(id: String): PresentableReservation = reservationService.get(id)?.toPresentable()
        ?: let { throw HttpStatusException(HttpStatus.NOT_FOUND, "Could not find vendor with id $id") }

    @Delete("/{id}")
    fun delete(id: String) {
        return try {
            reservationService.delete(id)
        } catch (e: Exception) {
            throw HttpServerException("Failed to Delete Vendor. Error: " + e.message)
        }
    }
}