package com.luidale.filters;

import com.luidale.filters.model.Criteria;
import com.luidale.filters.model.Filter;
import com.luidale.filters.model.FilterRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Stream;

@Slf4j
@Component
class Initializer implements CommandLineRunner {

    private final FilterRepository repository;

    public Initializer(FilterRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) throws ParseException {
        Stream.of("Filter1", "Filter2", "Filter3").forEach(name ->
                repository.save(new Filter(name))
        );

        Filter filter1 = repository.findByName("Filter1");
        Criteria c1 = Criteria.builder().type("AMOUNT")
                .filterMode("MORE")
                .number(4)
                .build();
        List<Criteria> criterias1 = new ArrayList<>();
        criterias1.add(c1);
        filter1.setCriterias(criterias1);
        repository.save(filter1);

        Filter filter2 = repository.findByName("Filter2");
        Criteria c2 = Criteria.builder().type("TITLE")
                .filterMode("STARTS_WITH")
                .text("Meow")
                .build();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        Criteria c3 = Criteria.builder().type("DATE")
                .filterMode("FROM")
                .date(formatter.parse("2022-09-13"))
                .build();
        List<Criteria> criterias2 = new ArrayList<>();
        criterias2.add(c2);
        criterias2.add(c3);
        filter2.setCriterias(criterias2);

        repository.save(filter2);

        repository.findAll().forEach(filter -> log.info(filter.toString()));
    }
}
