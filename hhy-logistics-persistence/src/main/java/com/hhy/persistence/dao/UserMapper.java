package com.hhy.persistence.dao;

import com.hhy.common.model.response.UserRsp;
import com.hhy.persistence.model.User;

public interface UserMapper {
	
	UserRsp queryByPhone(String phone);
	
	User queryByPhonePModel(String phone);
	
	void save(User user);
	
	UserRsp getId(String id);
	
	void updateLoginInfo(User user);
	
}
