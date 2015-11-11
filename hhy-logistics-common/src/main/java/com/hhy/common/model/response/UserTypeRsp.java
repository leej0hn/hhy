package com.hhy.common.model.response;


import java.io.Serializable;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class UserTypeRsp implements Serializable{
	private static final long serialVersionUID = 919512829996274455L;
	private String id;
	private String typeId;
	private String name;
	private String displayName;
	
}
