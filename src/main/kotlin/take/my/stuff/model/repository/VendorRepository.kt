package take.my.stuff.model.repository

import io.micronaut.data.mongodb.annotation.MongoRepository
import io.micronaut.data.repository.CrudRepository
import org.bson.types.ObjectId
import take.my.stuff.model.entity.UserEntity
import take.my.stuff.model.entity.VendorEntity
import java.util.Optional
import javax.validation.constraints.Email

@MongoRepository
interface VendorRepository : CrudRepository<VendorEntity, ObjectId> {
//    fun findByEmail(email: Email) :Optional<VendorEntity>
}