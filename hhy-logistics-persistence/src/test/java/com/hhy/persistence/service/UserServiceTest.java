package com.hhy.persistence.service;

import java.util.Date;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.hhy.common.model.response.UserRsp;
import com.hhy.persistence.model.User;
import com.hhy.persistence.test.AbstractSpringJUnit4TestCase;

public class UserServiceTest extends AbstractSpringJUnit4TestCase {

	@Autowired
	UserService service;
	
	@Test
	public void testQuery() {
		UserRsp user = service.getByPhone("18928966702");
		System.out.println(user);
	}

	@Test
	public void testRegister() {
		User user = new User();
		user.setName("LeeJohn");
		user.setPhone("18928966702");
		user.setEmail("");
		user.setPassword("123456");
		user.setUserType("0002");
		user.setPassword("123456");
		user.setCreateDate(new Date());
		user.setRemarks("");
		user.setPhoto("");
		user.setDelFlag("0");
		service.register(user);
	}
	
	@Test
	public void testGetId(){
		UserRsp userRsp = service.getId("");
		System.out.println(userRsp);
	}
	
	@Test
	public void testUpdateLoginInfo(){
		User user = new User();
		user.setId(1L);
		user.setLoginDate(new Date());
		user.setLoginIp("127.0.0.1");
		service.updateLoginInfo(user);
	}
	
	@Test
	public void testIsExist(){
		System.out.println(service.isExist("18928966702"));
	}

}
