package com.rrms.rrms.dto.response;

import java.io.Serial;
import java.io.Serializable;
import java.util.UUID;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RoomImageResponse implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    UUID roomImageId;
    String image;
}
