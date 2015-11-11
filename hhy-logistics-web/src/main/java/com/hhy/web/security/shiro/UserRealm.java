package com.hhy.web.security.shiro;

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import javax.annotation.PostConstruct;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.Permission;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.subject.SimplePrincipalCollection;
import org.apache.shiro.util.ByteSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hhy.common.model.response.UserRsp;
import com.hhy.persistence.model.User;
import com.hhy.persistence.service.UserService;
import com.hhy.web.common.servlet.Servlets;
import com.hhy.web.common.servlet.ValidateCodeServlet;
import com.hhy.web.common.utils.Encodes;
import com.hhy.web.common.utils.LogUtils;
import com.hhy.web.common.utils.UserUtils;
import com.hhy.web.config.Global;
import com.hhy.web.security.shiro.session.SessionDAO;

/**
 * 系统安全认证实现类
 * @author LeeJohn
 * @version 2015-11-09
 */
@Service
public class UserRealm extends AuthorizingRealm {
	private static final Logger logger = LoggerFactory.getLogger(UserRealm.class);
	
	@Autowired
	private UserService userService;
	@Autowired
	private SessionDAO sessionDao;
	
	public UserRealm() {
		setAuthenticationTokenClass(UsernamePasswordToken.class);
	}
	

	/**
	 * 认证回调函数, 登录时调用
	 */
	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authcToken) throws AuthenticationException {
		UsernamePasswordToken token=(UsernamePasswordToken)authcToken;
		
		Session session = UserUtils.getSession();
		String code = (String)session.getAttribute(ValidateCodeServlet.VALIDATE_CODE);
		if (token.getCaptcha() == null || !token.getCaptcha().toUpperCase().equals(code)){
			throw new AuthenticationException("msg:验证码错误, 请重试.");
		}
		
		// 校验用户名密码
		UserRsp user = userService.getByPhone(token.getUsername());
		if (user != null) {
			if (Global.NO.equals(user.getLoginFlag())){
				throw new AuthenticationException("msg:该已帐号禁止登录.");
			}
			byte[] salt = Encodes.decodeHex(user.getPassword().substring(0,16));
			return new SimpleAuthenticationInfo(new Principal(user), 
					user.getPassword().substring(16), ByteSource.Util.bytes(salt), getName());
		} else {
			return null;
		}
	}

	/**
     * 授权
     */
	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals){
		try{
			Principal principal = (Principal) getAvailablePrincipal(principals);
			logger.debug(principal.getName()+": 授权");
			// 获取当前已登录的用户
			if (!Global.TRUE.equals(Global.getConfig("user.multiAccountLogin"))){
				Collection<Session> sessions = sessionDao.getActiveSessions(true, principal, UserUtils.getSession());
				if (sessions.size() > 0){
					// 如果是登录进来的，则踢出已在线用户
					if (UserUtils.getSubject().isAuthenticated()){
						for (Session session : sessions){
							 sessionDao.delete(session);
						}
					}
					// 记住我进来的，并且当前用户已登录，则退出当前用户提示信息。
					else{
						UserUtils.getSubject().logout();
						throw new AuthenticationException("msg:账号已在其它地方登录，请重新登录。");
					}
				}
			}
			User user = userService.getByPhonePModel(principal.getLoginName());
			if (user != null) {
				SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
				// 添加用户角色信息
				info.addRole(user.getUserType());
				info.addStringPermission("user");
				
				user.setLoginDate(new Date());
				user.setLoginIp(UserUtils.getSession().getHost());
				// 更新登录IP和时间
				userService.updateLoginInfo(user);
				// 记录登录日志
				LogUtils.saveLog(Servlets.getRequest(), "系统登录");
				return info;
			} else {
				return null;
			}
		}catch(Exception e){
			logger.error(e.getMessage());
			e.printStackTrace();
			return null;
		}
		
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

    @Override
	protected void checkPermission(Permission permission, AuthorizationInfo info) {
		authorizationValidate(permission);
		super.checkPermission(permission, info);
	}
	
	@Override
	protected boolean[] isPermitted(List<Permission> permissions, AuthorizationInfo info) {
		if (permissions != null && !permissions.isEmpty()) {
            for (Permission permission : permissions) {
        		authorizationValidate(permission);
            }
        }
		return super.isPermitted(permissions, info);
	}
	
	@Override
	public boolean isPermitted(PrincipalCollection principals, Permission permission) {
		authorizationValidate(permission);
		return super.isPermitted(principals, permission);
	}
	
	@Override
	protected boolean isPermittedAll(Collection<Permission> permissions, AuthorizationInfo info) {
		if (permissions != null && !permissions.isEmpty()) {
            for (Permission permission : permissions) {
            	authorizationValidate(permission);
            }
        }
		return super.isPermittedAll(permissions, info);
	}
	
	/**
	 * 授权验证方法
	 * @param permission
	 */
	private void authorizationValidate(Permission permission){
		// 模块授权预留接口
	}
	
    /**
	 * 清空所有关联认证
	 * @Deprecated 不需要清空，授权缓存保存到session中
	 */
	@Deprecated
	public void clearAllCachedAuthorizationInfo() {
//		Cache<Object, AuthorizationInfo> cache = getAuthorizationCache();
//		if (cache != null) {
//			for (Object key : cache.keys()) {
//				cache.remove(key);
//			}
//		}
	}

    public void clearAllCachedAuthenticationInfo() {
        getAuthenticationCache().clear();
    }

    public void clearAllCache() {
        clearAllCachedAuthenticationInfo();
        clearAllCachedAuthorizationInfo();
    }
    
    /**
	 * 设定密码校验的Hash算法与迭代次数
	 */
	@PostConstruct
	public void initCredentialsMatcher() {
		HashedCredentialsMatcher matcher = new HashedCredentialsMatcher(Global.HASH_ALGORITHM);
		matcher.setHashIterations(Global.HASH_INTERATIONS);
		setCredentialsMatcher(matcher);
	}
	
	/**
	 * 授权用户信息
	 */
	public static class Principal implements Serializable {

		private static final long serialVersionUID = 1L;
		
		private String id; // 编号
		private String loginName; // 登录名
		private String name; // 姓名
//		private boolean mobileLogin; // 是否手机登录
		
//		private Map<String, Object> cacheMap;

		public Principal(UserRsp user) {
			this.id = user.getId();
			this.loginName = user.getPhone();
			this.name = user.getName();
		}

		public String getId() {
			return id;
		}

		public String getLoginName() {
			return loginName;
		}

		public String getName() {
			return name;
		}

		/**
		 * 获取SESSIONID
		 */
		public String getSessionid() {
			try{
				return (String) UserUtils.getSession().getId();
			}catch (Exception e) {
				return "";
			}
		}
		
		@Override
		public String toString() {
			return id;
		}

	}
    
	
}
