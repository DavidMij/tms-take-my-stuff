package take.my.stuff

import io.micronaut.runtime.EmbeddedApplication
import io.kotest.core.spec.style.StringSpec
import io.micronaut.runtime.server.EmbeddedServer
import io.micronaut.test.extensions.kotest5.annotation.MicronautTest
import take.my.stuff.model.entity.Category
import take.my.stuff.service.ReservationService
import take.my.stuff.service.StorePlaceService
import take.my.stuff.service.UserService
import take.my.stuff.service.VendorService
import java.util.*

@MicronautTest(transactional = false)
class TmsTest(
    reservationService: ReservationService,
    vendorService: VendorService,
    userService: UserService,
    storePlaceService: StorePlaceService
) : StringSpec({
//    "worksadsad" {
//        val user = userService.create(
//            "asd",
//            "asd",
//            "asd",
//            "asd",
//            "asd",
//        )
//        val storeplace = storePlaceService.create(
//            "asd",
//            "asd",
//            "asd",
//            "asd",
//            "asd",
//            "asd",
//            Date(),
//            Date(),
//        )
//
//        val vendor = vendorService.create(
//            "",
//            "",
//            "",
//            Category.Payments,
//        )
//        val test = vendorService.get(vendor.id)
//        val reservation = reservationService.create(
//            host = user,
//            customer = user,
//            shipmentVendor = vendor,
//            place = storeplace,
//            startDate = Date(),
//            endDate = Date()
//        )
//        println(reservation)
//        println(reservationService.list())
////        Thread.sleep(1000000)
//
//    }
})
