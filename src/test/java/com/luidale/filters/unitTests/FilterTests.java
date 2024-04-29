package com.luidale.filters.unitTests;

import com.luidale.filters.model.Criteria;
import com.luidale.filters.model.Filter;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class FilterTests {

    @Test
    void testGetterAndSetter() {

        Filter filter = new Filter();
        filter.setId(1L);
        filter.setName("Test Filter");
        List<Criteria> criterias = new ArrayList<>();
        criterias.add(new Criteria());
        criterias.add(new Criteria());
        filter.setCriterias(criterias);

        assertEquals(1L, filter.getId());
        assertEquals("Test Filter", filter.getName());
        assertNotNull(filter.getCriterias());
        assertEquals(2, filter.getCriterias().size()); // Check if criterias list has 2 elements
    }

    @Test
    void testNoArgsConstructor() {

        Filter filter = new Filter();

        assertNotNull(filter);
        assertNull(filter.getId());
        assertNull(filter.getName());
        assertNull(filter.getCriterias());
    }

    @Test
    void testRequiredArgsConstructor() {

        String name = "Test Filter";
        Filter filter = new Filter(name);

        assertNotNull(filter);
        assertNull(filter.getId());
        assertEquals(name, filter.getName());
        assertNull(filter.getCriterias());
    }
}
