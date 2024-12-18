package com.rrms.rrms.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.rrms.rrms.models.BulletinBoard;
import com.rrms.rrms.models.Search;

public interface SearchRepository extends JpaRepository<Search, UUID> {
    @Query("SELECT r FROM BulletinBoard r WHERE r.address LIKE %:address%")
    List<BulletinBoard> findAllByNameRoom(@Param("address") String address);

    //    List<BulletinBoard> findByMoveInDateLessThanEqual(Date date);

    @Query("SELECT r FROM BulletinBoard r WHERE r.isActive = :isActive ORDER BY r.createdDate DESC")
    List<BulletinBoard> findAllByDatenew(@Param("isActive") Boolean isActive);

    @Query("SELECT r FROM BulletinBoard r WHERE r.isActive = :isActive ORDER BY r.createdDate ASC")
    List<BulletinBoard> findAllByIsActive(@Param("isActive") Boolean isActive);
}
