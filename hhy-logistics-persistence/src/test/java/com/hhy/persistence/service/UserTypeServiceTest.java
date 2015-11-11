package com.hhy.persistence.service;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.hhy.common.model.response.UserTypeRsp;
import com.hhy.persistence.test.AbstractSpringJUnit4TestCase;

public class UserTypeServiceTest extends AbstractSpringJUnit4TestCase{

	@Autowired
	UserTypeService service;
	
	@Test
	public void testDelete() {
		service.delete("0003");
	}

	@Test
	public void testQuery() {
		UserTypeRsp userType = service.queryByTypeId("0003");
		System.out.println(userType);
	}

}
