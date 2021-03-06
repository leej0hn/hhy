package com.hhy.test;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.subject.SimplePrincipalCollection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class UserRealm extends AuthorizingRealm {
	private static final Logger logger = LoggerFactory.getLogger(UserRealm.class);
	
	
	public UserRealm() {
		logger.info("userRealm started...");
		setAuthenticationTokenClass(UsernamePasswordToken.class);
	}
	
	 /**
     * 验证
     */
	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authcToken) throws AuthenticationException {
		logger.info("userRealm--doGetAuthenticationInfo*******");
		/* 这里编写认证代码 */
		UsernamePasswordToken token = (UsernamePasswordToken) authcToken;
        SimpleAuthenticationInfo saInfo = new SimpleAuthenticationInfo("LeeJohn" , "123456" , getName());
		return saInfo;
	}

	/**
     * 授权
     */
	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals){
		logger.info("userRealm--doGetAuthorizationInfo－！－！－！－！－！－");
		SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
		info.addStringPermission("permission");//资源允许
	    info.addRole("role");//角色允许，
        return info;
	}

	
	/**
	 * 更新用户授权信息缓存.
	 */
	public void clearCachedAuthorizationInfo(String principal) {
	 SimplePrincipalCollection principals = new SimplePrincipalCollection(principal, getName());
	 clearCachedAuthorizationInfo(principals);
	}
	
	@Override
    public void clearCachedAuthorizationInfo(PrincipalCollection principals) {
        super.clearCachedAuthorizationInfo(principals);
    }

    @Override
    public void clearCachedAuthenticationInfo(PrincipalCollection principals) {
        super.clearCachedAuthenticationInfo(principals);
    }

    @Override
    public void clearCache(PrincipalCollection principals) {
        super.clearCache(principals);
    }

    /**
	 * 清除所有用户授权信息缓存.
	 */
    public void clearAllCachedAuthorizationInfo() {
        getAuthorizationCache().clear();
    }

    public void clearAllCachedAuthenticationInfo() {
        getAuthenticationCache().clear();
    }

    public void clearAllCache() {
        clearAllCachedAuthenticationInfo();
        clearAllCachedAuthorizationInfo();
    }

}
