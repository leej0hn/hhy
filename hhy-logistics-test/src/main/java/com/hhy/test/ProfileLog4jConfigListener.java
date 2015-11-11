package com.hhy.test;

import javax.servlet.ServletContextEvent;
import org.springframework.web.util.Log4jConfigListener;

public class ProfileLog4jConfigListener extends Log4jConfigListener{
	 public void contextInitialized(ServletContextEvent event){
	    ProfileLog4jWebConfigurer.initLogging(event.getServletContext());
	  }
}
