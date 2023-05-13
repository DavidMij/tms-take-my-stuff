package take.my.stuff.model.repository

import io.micronaut.data.mongodb.annotation.MongoRepository
import io.micronaut.data.repository.CrudRepository
import io.micronaut.data.repository.jpa.JpaSpecificationExecutor
import org.bson.types.ObjectId
import take.my.stuff.model.entity.ReservationEntity
import take.my.stuff.model.entity.UserEntity
import java.util.*

@MongoRepository
interface UserRepository : CrudRepository<UserEntity, ObjectId> {
    fun findByEmail(email: String): Optional<UserEntity>
}