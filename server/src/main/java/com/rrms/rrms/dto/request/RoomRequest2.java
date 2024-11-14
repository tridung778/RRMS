package com.rrms.rrms.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RoomRequest2 {
    UUID motelId;
    String name;
    String group;
    Double price;
    String prioritize;
    Integer area;
    Double deposit;
    Double debt;
    Integer countTenant;
    Integer invoiceDate;
    Integer paymentCircle;
    Date moveInDate;
    Date contractDuration;
    Boolean status;
    String finance;
}