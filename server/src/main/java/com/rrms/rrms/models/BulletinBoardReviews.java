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
@Table(name = "bulletin_board_reviews")
@Builder
public class BulletinBoardReviews {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID bulletinBoardReviewsId;

    @ManyToOne
    @JoinColumn(name = "bulletin_board_id")
    private BulletinBoard bulletinBoard;

    @ManyToOne
    @JoinColumn(name = "account_id")
    private Account account;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Column(columnDefinition = "Integer")
    private Integer rating;
}
