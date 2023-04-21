package take.my.stuff.route

import io.micronaut.http.HttpStatus
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get

@Controller
class HealthCheckRoute {
    @Get
    fun index(): HttpStatus {
        return HttpStatus.OK
    }
}
