package com.rrms.rrms.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rrms.rrms.dto.request.RoomReviewRequest;
import com.rrms.rrms.dto.response.ApiResponse;
import com.rrms.rrms.dto.response.RoomReviewResponse;
import com.rrms.rrms.services.IRoomReview;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping("/room-reviews")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class RoomReviewController {
    IRoomReview roomReviewService;

    @PostMapping
    public ApiResponse<RoomReviewResponse> getRoomReview(@RequestBody RoomReviewRequest roomReviewRequest) {
        return ApiResponse.<RoomReviewResponse>builder()
                .message("Create Room Review successfully")
                .code(HttpStatus.OK.value())
                .result(roomReviewService.createRoomReview(roomReviewRequest))
                .build();
    }
}
