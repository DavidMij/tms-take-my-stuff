package take.my.stuff.service

import jakarta.inject.Singleton
import org.bson.types.ObjectId
import take.my.stuff.model.entity.User
import take.my.stuff.model.entity.UserEntity
import take.my.stuff.model.repository.UserRepository
import kotlin.jvm.optionals.getOrElse

fun UserEntity.toDto() = User(
    id = this.id!!.toHexString(),
    email = this.email,
    firstName = this.firstName,
    lastName = this.lastName,
    phone = this.phone,
    pass = this.pass
)
fun User.toEntity() = UserEntity(
    id = ObjectId(this.id),
    email = this.email,
    firstName = this.firstName,
    lastName = this.lastName,
    phone = this.phone,
    pass = this.pass
)
@Singleton
class UserService(private val userRepository: UserRepository) {

    fun create(
        email: String,
        firstName: String,
        lastName: String,
        phone: String,
        pass: String
    ): User = userRepository.save(
        UserEntity(
            email = email,
            firstName = firstName,
            lastName = lastName,
            phone = phone,
            pass = pass
        )).toDto()

    fun delete(id: String) = userRepository.deleteById(ObjectId(id))

    fun list(): List<User> = userRepository.findAll().map { it.toDto() }

    fun get(id: String): User? = userRepository.findById(ObjectId(id)).getOrElse { null }?.toDto()

}