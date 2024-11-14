package com.rrms.rrms.dto.response;

import java.io.Serial;
import java.io.Serializable;
import java.util.UUID;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BulletinBoardTableResponse implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    UUID bulletinBoardId;
    String title;
    String rentalCategory;
    String address;
    Double rentPrice;
    Integer area;
    Boolean status;
    Boolean isActive;
}