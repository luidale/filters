package com.luidale.filters;

import com.luidale.filters.model.Criteria;
import com.luidale.filters.model.Filter;
import com.luidale.filters.model.FilterRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Stream;

@Component
class Initializer implements CommandLineRunner {

    private final FilterRepository repository;

    public Initializer(FilterRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) {
        Stream.of("Filter1", "Filter2", "Filter3").forEach(name ->
                repository.save(new Filter(name))
        );

        Filter filter1 = repository.findByName("Filter1");
        Criteria c1 = Criteria.builder().type("Amount")
                .filterMode("More")
                .number(4)
                .build();
        filter1.setCriterias(Collections.singleton(c1));
        repository.save(filter1);

        Filter filter2 = repository.findByName("Filter2");
        Criteria c2 = Criteria.builder().type("Title")
                .filterMode("Starts with")
                .text("Meow")
                .build();
        Criteria c3 = Criteria.builder().type("Date")
                .filterMode("From")
                .date(Instant.parse("2022-09-13T17:00:00.000Z"))
                .build();
        Set<Criteria> criterias2 = new HashSet<>();
        criterias2.add(c2);
        criterias2.add(c3);
        filter2.setCriterias(criterias2);

        repository.save(filter2);

        repository.findAll().forEach(System.out::println);
    }
}
