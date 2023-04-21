package take.my.stuff.model.entity

import io.micronaut.data.annotation.GeneratedValue
import io.micronaut.data.annotation.Id
import io.micronaut.data.annotation.MappedEntity
import org.bson.types.ObjectId

@MappedEntity
data class UserEntity(
    @field: Id @GeneratedValue
    var id: ObjectId? = null,
    var email: String,
    var firstName: String,
    var lastName: String,
    var phone: String,
    var pass: String
)

data class User(
    var id: String,
    var email: String,
    var firstName: String,
    var lastName: String,
    var phone: String,
    var pass: String
)

