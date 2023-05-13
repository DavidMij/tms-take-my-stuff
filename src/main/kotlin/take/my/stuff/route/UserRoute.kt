package take.my.stuff.route

import io.micronaut.http.HttpStatus
import io.micronaut.http.annotation.*
import io.micronaut.http.exceptions.HttpStatusException
import io.micronaut.http.server.exceptions.HttpServerException
import take.my.stuff.model.entity.User
import take.my.stuff.service.UserService
import java.util.Optional


data class PresentableUser(
        val id: String,
        val email: String,
        val phone: String,
        val firstName: String,
        val lastName: String
)

fun User.toPresentable() = PresentableUser(
        id = this.id,
        email = this.email,
        firstName = this.firstName,
        lastName = this.lastName,
        phone = this.phone,
)

data class UserLogin(
        val email: String,
        val pass: String
)


@Controller("/v1/user")
class UserRoute(private val userService: UserService) {
    data class CreateUser(
            val email: String,
            val firstName: String,
            val lastName: String,
            val phone: String,
            val pass: String
    )

    @Status(HttpStatus.CREATED)
    @Post
    fun create(@Body user: CreateUser): PresentableUser {
        return try {
            userService.create(
                    email = user.email,
                    firstName = user.firstName,
                    lastName = user.lastName,
                    phone = user.phone,
                    pass = user.pass
            ).toPresentable()
        } catch (e: Exception) {
            throw HttpServerException("Failed to create User. Error: " + e.message)
        }
    }

    @Get
    fun list(): List<PresentableUser> = userService.list().map { it.toPresentable() }

    @Get("/{id}")
    fun get(id: String): PresentableUser = userService.get(id)?.toPresentable()
            ?: let { throw HttpStatusException(HttpStatus.NOT_FOUND, "Could not find user with id $id") }

    @Delete("/{id}")
    fun delete(id: String) {
        return try {
            userService.delete(id)
        } catch (e: Exception) {
            throw HttpServerException("Failed to Delete User. Error: " + e.message)
        }
    }

    @Post("/login")
    fun login(@Body userLogin: UserLogin): PresentableUser = userService.login(userLogin.email, userLogin.pass)?.toPresentable()
            ?: let { throw HttpStatusException(HttpStatus.UNAUTHORIZED, "Username or Password incorrect.") }
}