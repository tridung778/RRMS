package com.rrms.rrms.dto.request;

import java.util.UUID;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ChangeQuantityRoomDevice {
    UUID motelDeviceId;
    UUID roomId;
    int quantity;
}
