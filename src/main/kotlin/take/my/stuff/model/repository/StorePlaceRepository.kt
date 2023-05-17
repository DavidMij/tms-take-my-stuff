package take.my.stuff.model.repository

import io.micronaut.data.annotation.Query
import io.micronaut.data.mongodb.annotation.MongoFindQuery
import io.micronaut.data.mongodb.annotation.MongoRepository
import io.micronaut.data.repository.CrudRepository
import org.bson.types.ObjectId
import take.my.stuff.model.entity.Category
import take.my.stuff.model.entity.StorePlaceEntity
import take.my.stuff.model.entity.UserEntity
import java.util.*

@MongoRepository
interface StorePlaceRepository : CrudRepository<StorePlaceEntity, ObjectId> {
    fun findByCategory(category: String): List<StorePlaceEntity>?
    fun findByStartDate(startDate: Date): List<StorePlaceEntity>?
    fun findByEndDate(endDate: Date): List<StorePlaceEntity>?
    fun findByAvailableSpace(availableSpace: String): List<StorePlaceEntity>?
    fun findByPrice(price: String): List<StorePlaceEntity>?
    fun findByAddress(address: String): List<StorePlaceEntity>?
    fun searchByAddress(address: String): List<StorePlaceEntity>?
    @MongoFindQuery(filter = "{address:{\$regex: :address}}")
    fun getAddress(address: String): List<StorePlaceEntity>?
}