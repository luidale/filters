package com.luidale.filters.unitTests;

import com.luidale.filters.model.Criteria;
import org.junit.jupiter.api.Test;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;

class CriteriaTests {

    @Test
    void testGetterAndSetter() {
        Criteria criteria = new Criteria();
        criteria.setId(1L);
        criteria.setType("Type");
        criteria.setFilterMode("FilterMode");
        criteria.setText("Text");
        criteria.setNumber(123);
        criteria.setDate(new Date());

        assertEquals(1L, criteria.getId());
        assertEquals("Type", criteria.getType());
        assertEquals("FilterMode", criteria.getFilterMode());
        assertEquals("Text", criteria.getText());
        assertEquals(123, criteria.getNumber());
        assertNotNull(criteria.getDate());
    }

    @Test
    void testNoArgsConstructor() {
        Criteria criteria = new Criteria();

        assertNull(criteria.getId());
        assertNull(criteria.getType());
        assertNull(criteria.getFilterMode());
        assertNull(criteria.getText());
        assertNull(criteria.getNumber());
        assertNull(criteria.getDate());
    }

    @Test
    void testAllArgsConstructor() {
        Criteria criteria = new Criteria(1L, "Type", "FilterMode", "Text", 123, new Date());

        assertEquals(1L, criteria.getId());
        assertEquals("Type", criteria.getType());
        assertEquals("FilterMode", criteria.getFilterMode());
        assertEquals("Text", criteria.getText());
        assertEquals(123, criteria.getNumber());
        assertNotNull(criteria.getDate());
    }
}
