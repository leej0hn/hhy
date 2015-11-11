package com.hhy.persistence.service.impl;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import com.hhy.common.constants.UserType;
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
		Assert.hasLength(phone,"手机号不能为空");
		return userDao.queryByPhone(phone);
	}

	@Override
	public void register(User user) {
		Assert.hasLength(user.getPhone(), "手机号不能为空");
		Assert.hasLength(user.getPassword(), "密码不能为空");
		if(user.getName() == null){
			user.setName(user.getPhone());
		}
		if(user.getUserType() == null){
			user.setUserType(UserType.MEMBER);
		}
		if(isExist(user.getPhone())){
			throw new IllegalArgumentException("该号码已经存在");
		}
		user.setDelFlag("0");//默认激活状态
		user.setCreateDate(new Date());
		userDao.save(user);
	}

	@Override
	public UserRsp getId(String id) {
		Assert.hasLength(id,"id不能为空");
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
		Assert.hasLength(phone,"手机号不能为空");
		return userDao.queryByPhonePModel(phone);
	}

	@Override
	public Boolean isExist(String phone) {
		Assert.hasLength(phone,"手机号不能为空");
		boolean isExist = true ;//默认存在
		int count = userDao.isExist(phone);
		if( count == 0 ){//不存在
			isExist = false;
		}
		return isExist;
	}
	
}
