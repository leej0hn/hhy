package com.hhy.persistence.dao;

import com.hhy.common.model.response.UserTypeRsp;


public interface UserTypeMapper {
	
	public void delete(String typeId);
	
	public UserTypeRsp queryByTypeId(String typeId);
}
