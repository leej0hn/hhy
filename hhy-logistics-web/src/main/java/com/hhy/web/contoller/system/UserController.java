package com.hhy.web.contoller.system;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.hhy.common.constants.UserType;
import com.hhy.persistence.model.User;
import com.hhy.persistence.service.UserService;
import com.hhy.web.common.response.ResultRsp;
import com.hhy.web.contoller.BaseController;
import com.hhy.web.service.SystemService;
/**
 * 登录Controller
 * @version 2015-11-11
 */
@Controller
public class UserController extends BaseController{

	@NotNull
	@Autowired
	UserService userService;
	
	/**
	 * 校验手机号接口
	 */
	@RequestMapping(value = "${adminPath}/phoneVail", method = RequestMethod.GET)
	public String phoneVail(HttpServletRequest request, HttpServletResponse response, Model model) {
		String phone = request.getParameter("phone");
		Boolean isExist = userService.isExist(phone);
		return BaseController.renderRsp((HttpServletResponse)response, new ResultRsp("0",isExist));
	}
	
	@RequestMapping(value = "${adminPath}/register", method = RequestMethod.GET)
	public String register(HttpServletRequest request, HttpServletResponse response, Model model) {
		
		return "user/register";
	}
	
	@RequestMapping(value = "${adminPath}/register", method = RequestMethod.POST)
	public String registerAction(HttpServletRequest request, HttpServletResponse response, Model model) {
		ResultRsp result = new ResultRsp("0");
		String messege = "";
		try{
			String phone = request.getParameter("MobilePhone");
			String passwd = request.getParameter("UserPwd");
			String rePasswd = request.getParameter("UserRePwd");
			Assert.hasLength(rePasswd, "确认密码不能为空");
			if( !passwd.equals(rePasswd)){
				throw new IllegalArgumentException("两次密码不相同");
			}
			User user = new User();
			user.setPhone(phone);
			user.setPassword(SystemService.entryptPassword(passwd));
			user.setUserType(UserType.MEMBER);
			userService.register(user);
//			LogUtils.saveLog(Servlets.getRequest(), "用户注册,phone:"+phone);
		}catch(Exception e){
			logger.error(e.getMessage());
			messege = e.getMessage();
			result.setCode("1");
		}
		result.setMes(messege);
		return BaseController.renderRsp((HttpServletResponse)response, result);
	}

}
