package com.rrms.rrms.database;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.rrms.rrms.enums.Gender;
import com.rrms.rrms.models.Account;
import com.rrms.rrms.models.Motel;
import com.rrms.rrms.models.Room;
import com.rrms.rrms.models.TypeRoom;
import com.rrms.rrms.repositories.AccountRepository;
import com.rrms.rrms.repositories.MotelRepository;
import com.rrms.rrms.repositories.RoomRepository;
import com.rrms.rrms.repositories.TypeRoomRepository;
import com.rrms.rrms.services.AccountService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.util.List;
import java.util.Locale;

@Configuration
@Slf4j
public class DB {
    @Bean
    CommandLineRunner initDatabase(AccountRepository accountRepository,
                                   RoomRepository roomRepository,
                                   MotelRepository motelRepository,
                                   TypeRoomRepository typeRoomRepository) {
        return args -> {
            if (accountRepository.findByUsername("admin").isEmpty()) {
                // create admin account
                accountRepository.save(Account.builder()
                        .username("admin")
                        .password("admin")
                        .fullname("admin")
                        .email("admin@gmail.com")
                        .phone("0333333333")
                        .cccd("admin")
                        .gender(Gender.MALE)
                        .avatar("https://firebasestorage.googleapis.com/v0/b/rrms-b7c18.appspot.com/o/images%2FRose-8B1a.jpg?alt=media&token=e9a3460b-23f5-4fc9-97b0-081aabb67a8c")
                        .birthday(LocalDate.now())
                        .build());
                log.info("Admin user created");
            }
            if (roomRepository.findAllByNameRoom("Gò Vấp").isEmpty()) {
                // create admin account
                Motel motel = new Motel();
                motel.setAccount(accountRepository.findByUsername("admin").get());
                motelRepository.save(motel);
                TypeRoom typeRoom = new TypeRoom();
                typeRoomRepository.save(typeRoom);
                roomRepository.save(Room.builder()

                                .motel(motel)
                                .price(1111)

                                .nameRoom("Hà đặc")
                                .typeRoom(typeRoom)
                                .description("như con cặc")

                        .build());
                log.info("Admin user created");
            }

        };
    }
}