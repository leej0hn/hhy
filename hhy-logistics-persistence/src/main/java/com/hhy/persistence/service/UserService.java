package com.hhy.persistence.service;

import com.hhy.common.model.response.UserRsp;
import com.hhy.persistence.model.User;

/**
 * @author LeeJohn 2014-03-21 11:55
 */
public interface UserService {

	UserRsp getByPhone(String phone);
	
	User getByPhonePModel(String phone);

	void register(User user);
	
	UserRsp getId(String id);
	
	void updateLoginInfo(User user);
	
	/**
	 * 存在返回true，不存在返回false
	 */
	Boolean isExist(String phone);

}
