package com.rrms.rrms.models;

import java.sql.Date;
import java.util.UUID;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "supports")
public class Support {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID supportId;

    @ManyToOne
    @JoinColumn(name = "username")
    private Account account;

    @Column(columnDefinition = "DATE")
    private Date dateOfStay;

    @Column(columnDefinition = "DATE")
    private Date createDate;

    @Column(columnDefinition = "DECIMAL(10, 2)")
    private long priceFirst;

    @Column(columnDefinition = "DECIMAL(10, 2)")
    private long priceEnd;
}
