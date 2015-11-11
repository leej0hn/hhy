package com.hhy.test;

import java.io.FileNotFoundException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletContext;

import org.springframework.util.Assert;
import org.springframework.util.Log4jConfigurer;
import org.springframework.util.ObjectUtils;
import org.springframework.util.ResourceUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.util.Log4jWebConfigurer;
import org.springframework.web.util.ServletContextPropertyUtils;
import org.springframework.web.util.WebUtils;


public class ProfileLog4jWebConfigurer extends Log4jWebConfigurer{
	  public static void initLogging(ServletContext servletContext)
	  {
	    if (exposeWebAppRoot(servletContext)) {
	      WebUtils.setWebAppRootSystemProperty(servletContext);
	    }

	    String location = getProfileLocation(servletContext);
	    if (location != null)
	    {
	      try
	      {
	        location = ServletContextPropertyUtils.resolvePlaceholders(location, servletContext);

	        if (!ResourceUtils.isUrl(location))
	        {
	          location = WebUtils.getRealPath(servletContext, location);
	        }

	        servletContext.log("Initializing log4j from [" + location + "]");

	        String intervalString = servletContext.getInitParameter("log4jRefreshInterval");
	        if (intervalString != null)
	        {
	          try
	          {
	            long refreshInterval = Long.parseLong(intervalString);
	            Log4jConfigurer.initLogging(location, refreshInterval);
	          }
	          catch (NumberFormatException ex) {
	            throw new IllegalArgumentException("Invalid 'log4jRefreshInterval' parameter: " + ex.getMessage());
	          }
	        }
	        else
	        {
	          Log4jConfigurer.initLogging(location);
	        }
	      }
	      catch (FileNotFoundException ex) {
	        throw new IllegalArgumentException("Invalid 'log4jConfigLocation' parameter: " + ex.getMessage());
	      }
	    }
	  }

	  private static String getProfileLocation(ServletContext servletContext) {
	    String location = servletContext.getInitParameter("log4jConfigLocation");
	    String activeProfiles = servletContext.getInitParameter("spring.profiles.active");
	    Assert.hasLength(activeProfiles, "spring.profiles.active not set.");

	    Map profileLocationMap = new HashMap();
	    for (String profileLocation : StringUtils.commaDelimitedListToSet(location)) {
	      String[] profileLocationArray = profileLocation.split("=");
	      Assert.isTrue((!ObjectUtils.isEmpty(profileLocationArray)) && (profileLocationArray.length == 2), "log4jConfigLocation value is illege, it must like: xxx=yyy, zzz=www");

	      profileLocationMap.put(profileLocationArray[0].trim(), profileLocationArray[1].trim());
	    }

	    return (String)profileLocationMap.get(activeProfiles);
	  }

	  private static boolean exposeWebAppRoot(ServletContext servletContext)
	  {
	    String exposeWebAppRootParam = servletContext.getInitParameter("log4jExposeWebAppRoot");
	    return (exposeWebAppRootParam == null) || (Boolean.valueOf(exposeWebAppRootParam).booleanValue());
	  }
}
