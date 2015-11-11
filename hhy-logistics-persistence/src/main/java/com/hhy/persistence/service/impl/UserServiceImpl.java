package com.hhy.persistence.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import com.hhy.common.model.response.UserRsp;
import com.hhy.persistence.dao.UserMapper;
import com.hhy.persistence.model.User;
import com.hhy.persistence.service.UserService;


/**
 * 
 * @author LeeJohn 2014-03-21 11:56 
 */
@Service
public class UserServiceImpl implements UserService{
//	private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);
	
	@Autowired
	private UserMapper userDao;

	@Override
	public UserRsp getByPhone(String phone) {
		Assert.hasLength(phone,"phone not null !");
		return userDao.queryByPhone(phone);
	}

	@Override
	public void register(User user) {
		userDao.save(user);
	}

	@Override
	public UserRsp getId(String id) {
		Assert.hasLength(id,"id not null !");
		return userDao.getId(id);
	}

	@Override
	public void updateLoginInfo(User user) {
		Assert.notNull(user);
		Assert.notNull(user.getId());
		Assert.notNull(user.getLoginIp());
		Assert.notNull(user.getLoginDate());
		userDao.updateLoginInfo(user);
	}

	@Override
	public User getByPhonePModel(String phone) {
		Assert.hasLength(phone,"phone not null !");
		return userDao.queryByPhonePModel(phone);
	}
	
}
