package com.hhy.persistence.model;


import java.io.Serializable;

public class UserType implements Serializable{
	private static final long serialVersionUID = -6417239729201742126L;
	private Long id;
	private String typeId;
	private String name;
	private String displayName;
	
	public UserType() {
		super();
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getTypeId() {
		return typeId;
	}
	public void setTypeId(String typeId) {
		this.typeId = typeId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDisplayName() {
		return displayName;
	}
	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}
}
