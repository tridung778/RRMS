package com.rrms.rrms.dto.request;


import com.rrms.rrms.dto.response.AccountResponse;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MotelRequest {
    String motelName;
    Double area;
    Long averagePrice;
    String address;
    AccountRequest account;
}