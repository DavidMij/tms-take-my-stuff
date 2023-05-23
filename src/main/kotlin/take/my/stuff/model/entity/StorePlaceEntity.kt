package take.my.stuff.model.entity

import io.micronaut.data.annotation.GeneratedValue
import io.micronaut.data.annotation.Id
import io.micronaut.data.annotation.MappedEntity
import io.micronaut.data.annotation.Relation
import org.bson.types.ObjectId
import java.util.Date

@MappedEntity
data class StorePlaceEntity(
    @field: Id @GeneratedValue
    var id: ObjectId? = null,
    var name: String,
    var description: String,
    var category: String,
    var address: String,
    var availableSpace: String,
    var price: String,
    var startDate: Date,
    var endDate: Date,
    var image: ByteArray?,
    var userId: String
//    @Relation(Relation.Kind.MANY_TO_ONE)

        //    var user: UserEntity
)