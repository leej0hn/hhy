package com.hhy.common.model.response;

import java.io.Serializable;
import java.util.Date;

import lombok.Data;
import lombok.ToString;

@Data
@ToString(exclude={"password","newPassword"},callSuper=true)
public class UserRsp implements Serializable{
	private static final long serialVersionUID = 6729748612652600767L;
	private String id;
	private String name;
	private String email;
	private String phone;
	private String userType;
	private String password;
	private String createBy;
	private String createDate;
	private String updateBy;
	private String updateDate;
	private String remarks;
	private String loginFlag;
	private String loginIp;
	private String loginDate;
	private String photo;
	private String delFlag;
	
	private String oldLoginName;// 原登录名
	private String newPassword;	// 新密码
	
	private String oldLoginIp;	// 上次登陆IP
	private Date oldLoginDate;	// 上次登陆日期
	
}
