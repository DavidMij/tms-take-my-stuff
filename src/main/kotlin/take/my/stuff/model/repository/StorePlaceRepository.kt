package take.my.stuff.model.repository

import io.micronaut.data.mongodb.annotation.MongoRepository
import io.micronaut.data.repository.CrudRepository
import org.bson.types.ObjectId
import take.my.stuff.model.entity.StorePlaceEntity
import take.my.stuff.model.entity.UserEntity

@MongoRepository
interface StorePlaceRepository : CrudRepository<StorePlaceEntity, ObjectId>