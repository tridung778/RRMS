package com.rrms.rrms.dto.response;

import java.time.LocalDate;
import java.util.List;

import com.rrms.rrms.enums.Gender;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class LoginResponse {
    private String token;
    boolean authenticated;
    private String username;
    private String fullname;
    private String phone;
    private String email;
    private String avatar;
    private LocalDate birthday;
    private Gender gender;
    private String cccd;
    private List<String> roles;
}
