package com.luidale.filters.integrationTests;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.luidale.filters.model.Filter;
import com.luidale.filters.model.FilterRepository;
import com.luidale.filters.web.FilterController;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.Optional;

import static org.mockito.Mockito.when;

@WebMvcTest(FilterController.class)
@AutoConfigureMockMvc
class FilterControllerIntegrationTests {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private FilterRepository filterRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    public void setUp() {
        // Set up mock data or behavior for repository methods
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetFilterById() throws Exception {
        Long filterId = 1L;
        Filter filter = new Filter();
        filter.setId(filterId);

        when(filterRepository.findById(filterId)).thenReturn(Optional.of(filter));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/filter/{id}", filterId))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(filterId));
    }

    @Test
    void testCreateFilter() throws Exception {
        Long filterId = 1L;
        String filterName = "Test Filter";

        Filter filter = new Filter();
        filter.setName(filterName);

        Filter filterSaved = new Filter();
        filterSaved.setName(filterName);
        filterSaved.setId(filterId);

        when(filterRepository.save(filter)).thenReturn(filterSaved);

        ResultActions resultActions = mockMvc.perform(MockMvcRequestBuilders.post("/api/filter")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(filter)));

        resultActions.andExpect(MockMvcResultMatchers.status().isCreated());
    }

    @Test
    void testUpdateFilter() throws Exception {
        long filterId = 1L;
        Filter existingFilter = new Filter();
        existingFilter.setId(filterId);
        existingFilter.setName("Existing Filter");

        when(filterRepository.findById(filterId)).thenReturn(Optional.of(existingFilter));

        Filter updatedFilter = new Filter();
        updatedFilter.setId(filterId);
        updatedFilter.setName("Updated Filter");

        ResultActions resultActions = mockMvc.perform(MockMvcRequestBuilders.put("/api/filter/{id}", filterId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedFilter)));

        resultActions.andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    void testDeleteFilter() throws Exception {
        long filterId = 1L;

        ResultActions resultActions = mockMvc.perform(MockMvcRequestBuilders.delete("/api/filter/{id}", filterId));

        resultActions.andExpect(MockMvcResultMatchers.status().isOk());
    }
}
