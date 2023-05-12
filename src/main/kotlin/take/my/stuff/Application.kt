package take.my.stuff

import io.micronaut.runtime.Micronaut.run
import io.swagger.v3.oas.annotations.OpenAPIDefinition
import io.swagger.v3.oas.annotations.info.Info

@OpenAPIDefinition(
    info = Info(
            title = "tms",
            version = "1.1"
    )
)
object Application

fun main(args: Array<String>) {
    run(*args)
}

