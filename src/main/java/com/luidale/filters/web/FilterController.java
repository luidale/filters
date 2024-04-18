package com.luidale.filters.web;

import com.luidale.filters.model.Filter;
import com.luidale.filters.model.FilterRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("/api")
class FilterController {

    private final Logger log = LoggerFactory.getLogger(FilterController.class);
    private FilterRepository filterRepository;

    public FilterController(FilterRepository filterRepository) {
        this.filterRepository = filterRepository;
    }

    @GetMapping("/filters")
    Collection<Filter> filters() {
        return filterRepository.findAll();
    }

    @GetMapping("/filter/{id}")
    ResponseEntity<?> getFilter(@PathVariable Long id) {
        Optional<Filter> filter = filterRepository.findById(id);
        return filter.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/filter")
    ResponseEntity<Filter> createGroup(@Valid @RequestBody Filter filter) throws URISyntaxException {
        log.info("Request to create filter: {}", filter);
        Filter result = filterRepository.save(filter);
        return ResponseEntity.created(new URI("/api/filter/" + result.getId()))
                .body(result);
    }

    @PutMapping("/filter/{id}")
    ResponseEntity<Filter> updateFilter(@Valid @RequestBody Filter filter) {
        log.info("Request to update filter: {}", filter);
        Filter result = filterRepository.save(filter);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/filter/{id}")
    public ResponseEntity<?> deleteFilter(@PathVariable Long id) {
        log.info("Request to delete filter: {}", id);
        filterRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
