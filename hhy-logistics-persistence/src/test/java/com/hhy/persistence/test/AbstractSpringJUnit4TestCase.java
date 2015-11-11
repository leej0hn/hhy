package com.hhy.persistence.test;


import org.junit.BeforeClass;
import org.junit.runner.RunWith;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={ "classpath:applicationContext-root-test.xml"})
@ActiveProfiles(profiles={"development"})
public class AbstractSpringJUnit4TestCase {

	@BeforeClass
	public static void setSpringProfilesActive() {
		System.setProperty("spring.profiles.active", "development");
	}
}
