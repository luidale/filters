package com.luidale.filters;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;

@SpringBootTest
class FiltersApplicationTests {

	@Test
	void contextLoads(ApplicationContext applicationContext) {
		Assertions.assertInstanceOf(String.class, applicationContext.getApplicationName());
	}

}
