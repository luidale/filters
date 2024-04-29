package com.luidale.filters.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Criteria {

    @Id
    @GeneratedValue
    private Long id;
    private String type;
    private String filterMode;
    private String text;
    private Number number;
    private Date date;
}
