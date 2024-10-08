package com.rrms.rrms.models;

import java.util.UUID;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "room_reviews")
@Builder
public class RoomReview {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID roomReviewId;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;

    @ManyToOne
    @JoinColumn(name = "username")
    private Account account;

    @Column(columnDefinition = "INT")
    private Integer rating;

    @Column(columnDefinition = "TEXT")
    private String comment;
}
