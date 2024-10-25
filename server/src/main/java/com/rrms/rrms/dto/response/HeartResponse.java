package com.rrms.rrms.dto.response;

import java.util.List;
import java.util.UUID;

import jakarta.persistence.*;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class HeartResponse {
    UUID heartId;
    AccountResponse account;
    List<RoomDetailResponse> rooms;
}
