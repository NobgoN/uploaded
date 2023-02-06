package com.example.demo.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "characters")
public class Characters {
	
	@Id
	@Column(name = "")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer characterid;
	
	@Column(name = "level")
	private Integer level;
	
	@Column(name = "hp")
	private Integer hp;

	@Column(name = "mp")
	private Integer mp;

	@Column(name = "atk")
	private Integer atk;

	@Column(name = "def")
	private Integer def;

	@Column(name = "agi")
	private Integer agi;

	@Column(name = "exp")
	private Integer exp;

	@Column(name = "username")
	private String username;
	
	public Characters(Integer level,Integer hp,Integer mp,Integer atk,Integer def,Integer agi,Integer exp,String username) {
		this.level = level;
		this.hp = hp;
		this.mp = mp;
		this.atk = atk;
		this.def = def;
		this.agi = agi;
		this.exp = exp;
		this.username = username;
	}

}
