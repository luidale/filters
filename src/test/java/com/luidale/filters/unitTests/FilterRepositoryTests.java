package com.luidale.filters.unitTests;

import com.luidale.filters.model.Filter;
import com.luidale.filters.model.FilterRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@DataJpaTest
class FilterRepositoryTests {

    @Mock
    private FilterRepository filterRepository;

    @Test
    void testFindByName() {
        // Mock data
        String filterName = "Test Filter";
        Filter filter = new Filter(filterName);

        // Mock repository behavior
        when(filterRepository.findByName(filterName)).thenReturn(filter);

        // Call the repository method
        Filter foundFilter = filterRepository.findByName(filterName);

        // Verify the result
        assertEquals(filter, foundFilter);
    }
}
