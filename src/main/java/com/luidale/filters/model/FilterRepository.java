package com.luidale.filters.model;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FilterRepository extends JpaRepository<Filter, Long> {
    Filter findByName(String name);
}
