package com.rrms.rrms.repositories;

import com.rrms.rrms.models.Account;
import com.rrms.rrms.models.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface RoomRepository extends JpaRepository<Room, UUID> {

    @Query("SELECT r FROM Room r WHERE r.nameRoom LIKE %:name%")
    List<Room> findAllByNameRoom(@Param("name") String name);
    //    List<Room> findAllByNameRoom( String name);

    Optional<List<Room>> findAllByPriceBetween(Double startPrice, Double endPrice);

    List<Room> findAllByMotel_Account(Account account);
}
