package com.luidale.filters.unitTests;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.luidale.filters.model.Filter;
import com.luidale.filters.model.FilterRepository;
import com.luidale.filters.web.FilterController;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.net.URISyntaxException;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class FilterControllerTests {

    @Mock
    private FilterRepository filterRepository;

    @InjectMocks
    private FilterController filterController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllFilters() {
        // Mock data
        List<Filter> filters = new ArrayList<>();
        filters.add(new Filter("Filter 1"));
        filters.add(new Filter("Filter 2"));

        // Mock repository behavior
        when(filterRepository.findAll()).thenReturn(filters);

        // Call the controller method
        Collection<Filter> result = filterController.filters();

        // Verify the result
        assertEquals(filters.size(), result.size());
        assertTrue(result.containsAll(filters));
    }

    @Test
    void testGetFilterById() {
        // Mock data
        long filterId = 1L;
        Filter filter = new Filter("Test Filter");
        filter.setId(filterId);

        // Mock repository behavior
        when(filterRepository.findById(filterId)).thenReturn(Optional.of(filter));

        // Call the controller method
        ResponseEntity<?> responseEntity = filterController.getFilter(filterId);

        // Verify the response
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(filter, responseEntity.getBody());
    }

    @Test
    void testCreateFilter() throws URISyntaxException {
        // Mock data
        Filter filter = new Filter("Test Filter");

        // Mock repository behavior
        when(filterRepository.save(filter)).thenReturn(filter);

        // Call the controller method
        ResponseEntity<Filter> responseEntity = filterController.createFilter(filter);

        // Verify the response
        assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());
        assertEquals(filter, responseEntity.getBody());
    }

    @Test
    void testUpdateFilter() {
        // Mock data
        Filter filter = new Filter("Test Filter");

        // Mock repository behavior
        when(filterRepository.save(filter)).thenReturn(filter);

        // Call the controller method
        ResponseEntity<Filter> responseEntity = filterController.updateFilter(filter);

        // Verify the response
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(filter, responseEntity.getBody());
    }

    @Test
    void testDeleteFilter() {
        // Mock data
        long filterId = 1L;

        // Call the controller method
        ResponseEntity<?> responseEntity = filterController.deleteFilter(filterId);

        // Verify the response
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        verify(filterRepository, times(1)).deleteById(filterId);
    }
}