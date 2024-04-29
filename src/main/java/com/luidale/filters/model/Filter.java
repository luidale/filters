package com.luidale.filters.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "filter")
public class Filter {
    @Id
    @GeneratedValue
    private Long id;
    @NonNull
    private String name;

    @OneToMany(fetch = FetchType.EAGER, cascade=CascadeType.ALL)
    private List<Criteria> criterias;
}
