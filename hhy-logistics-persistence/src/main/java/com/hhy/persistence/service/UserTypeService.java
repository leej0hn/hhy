package com.hhy.persistence.service;

import com.hhy.common.model.response.UserTypeRsp;


public interface UserTypeService {
	
	public void delete(String typeId);
	
	public UserTypeRsp queryByTypeId(String typeId);
	
}
