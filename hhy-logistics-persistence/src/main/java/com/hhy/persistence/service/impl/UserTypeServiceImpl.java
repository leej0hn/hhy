package com.hhy.persistence.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import com.hhy.common.model.response.UserTypeRsp;
import com.hhy.persistence.dao.UserTypeMapper;
import com.hhy.persistence.service.UserTypeService;


/**
 * 
 * @author LeeJohn 2014-04-18 
 */
@Service
public class UserTypeServiceImpl implements UserTypeService{
//	private static final Logger logger = LoggerFactory.getLogger(RoleServiceImpl.class);
	
	@Autowired
	private UserTypeMapper utDao;

	@Override
	public void delete(String typeId) {
		utDao.delete(typeId);
	}

	@Override
	public UserTypeRsp queryByTypeId(String typeId) {
		Assert.hasLength(typeId,"typeId not null !");
		return utDao.queryByTypeId(typeId);
	}
	
}
