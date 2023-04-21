package take.my.stuff.route

import io.micronaut.http.HttpStatus
import io.micronaut.http.annotation.*
import io.micronaut.http.exceptions.HttpStatusException
import io.micronaut.http.server.exceptions.HttpServerException
import take.my.stuff.model.entity.Category
import take.my.stuff.service.Vendor
import take.my.stuff.service.VendorService



@Controller("/v1/vendor")
class VendorRoute(private val vendorService: VendorService) {
    data class CreateVendor(
        val email: String,
        val name: String,
        val phone: String,
        val category: Category
    )

    @Status(HttpStatus.CREATED)
    @Post
    fun create(@Body vendor: CreateVendor): Vendor {
        return try {
            vendorService.create(
                email = vendor.email,
                name = vendor.name,
                phone = vendor.phone,
                category = vendor.category
            )
        } catch (e: Exception) {
            throw HttpServerException("Failed to create Vendor. Error: " + e.message)
        }
    }

    @Get
    fun list(@QueryValue email: String?): List<Vendor> {
        return vendorService.list()
    }

    @Get("/{id}")
    fun get(id: String): Vendor = vendorService.get(id)
        ?: let { throw HttpStatusException(HttpStatus.NOT_FOUND, "Could not find vendor with id $id") }

    @Delete("/{id}")
    fun delete(id: String) {
        return try {
            vendorService.delete(id)
        } catch (e: Exception) {
            throw HttpServerException("Failed to Delete Vendor. Error: " + e.message)
        }
    }
}

