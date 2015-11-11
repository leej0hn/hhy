package com.hhy.test;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.yh.permission2.core.authc.UrsCookieToken;
/**
 * 登录Controller
 * @version 2013-5-31
 */
@Controller
public class LoginController {
	
	
	public LoginController(){
		System.out.println("--------LoginController--------");
	}
	
//	@RequestMapping(value = "/index", method = RequestMethod.GET)
//	public String test(HttpServletRequest request, HttpServletResponse response, Model model) {
//		System.out.println("index");
//		return "index";
//	}
//	
//	@RequestMapping(value = "/permisssion", method = RequestMethod.GET)
//	public void permisssion(HttpServletRequest request, HttpServletResponse response, Model model) {
//		System.out.println("permisssion");
//	}
	
//	@RequestMapping(value = "/login", method = RequestMethod.GET)
//	public String login(HttpServletRequest request, HttpServletResponse response, Model model) {
//		System.out.println("login");
//		return "login";
//	}
	
	
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public void loginPost(HttpServletRequest request, HttpServletResponse response, Model model) {
		System.out.println("loginPost");
		UsernamePasswordToken token = new UsernamePasswordToken();
		SecurityUtils.getSubject().login(token);
	}
	
}
