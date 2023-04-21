package take.my.stuff.service

import jakarta.inject.Singleton
import org.bson.types.ObjectId
import take.my.stuff.model.entity.Category
import take.my.stuff.model.entity.VendorEntity
import take.my.stuff.model.repository.VendorRepository
import kotlin.jvm.optionals.getOrElse




data class Vendor(
    var id: String,
    var name: String,
    var email: String,
    var phone: String,
    var category: Category
)
 fun VendorEntity.toDto() = Vendor(
    id = this.id!!.toHexString(),
    name = this.name,
    email = this.email,
    phone = this.phone,
    category = this.category
)
fun Vendor.toEntity() = VendorEntity(
    id = ObjectId(this.id),
    name = this.name,
    email = this.email,
    phone = this.phone,
    category = this.category
)
@Singleton
class VendorService(private val vendorRepository: VendorRepository) {

    fun create(email: String, phone: String, name: String, category: Category): Vendor =
        vendorRepository.save(
            VendorEntity(
                email = email,
                phone = phone,
                name = name,
                category = category
            )
        ).toDto()

    fun delete(id: String) = vendorRepository.deleteById(ObjectId(id))

    fun get(id: String): Vendor? = vendorRepository.findById(ObjectId(id)).getOrElse { null }?.toDto()

    fun list(): List<Vendor> = vendorRepository.findAll().map { it.toDto() }

//    fun listFilter(email: String?): List<Vendor> {
//        return vendorRepository.
//    }

}