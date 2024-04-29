package com.luidale.filters.integrationTests;

import com.luidale.filters.model.Filter;
import com.luidale.filters.model.FilterRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(SpringExtension.class)
@DataJpaTest
class FilterRepositoryIntegrationTests {

    @Autowired
    private FilterRepository filterRepository;

    @Test
    void testFindByName() {
        // Save a filter in the database
        Filter filterToSave = new Filter("Test Filter");
        filterRepository.save(filterToSave);

        // Retrieve the filter by name
        String filterName = "Test Filter";
        Filter foundFilter = filterRepository.findByName(filterName);

        // Verify that the filter is present in the database
        assertEquals(filterName, foundFilter.getName());
    }
}
