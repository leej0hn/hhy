package com.hhy.test;

import java.util.concurrent.atomic.AtomicInteger;

import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.credential.SimpleCredentialsMatcher;
import org.apache.shiro.cache.Cache;
import org.apache.shiro.cache.CacheManager;

/**
 * <p>User: LeeJohn
 * <p>Date: 2014-09-30
 * <p>Version: 1.0
 */
public class UrsCredentialsMatcher extends SimpleCredentialsMatcher {
//	private static Logger logger = LoggerFactory.getLogger(UrsCredentialsMatcher.class);
	
    private Cache<String, AtomicInteger> passwordRetryCache;

    
    public UrsCredentialsMatcher(CacheManager cacheManager  ) {
        passwordRetryCache = cacheManager.getCache("passwordRetryCache");
    }

    @Override
    public boolean doCredentialsMatch(AuthenticationToken token, AuthenticationInfo info) {
      System.out.println("UrsCredentialsMatcher --- doCredentialsMatch");
      return true;
    }

}
