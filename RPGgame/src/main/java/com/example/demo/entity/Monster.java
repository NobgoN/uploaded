package com.example.demo.entity;

import javax.persistence.Id;

import org.springframework.data.relational.core.mapping.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "monsters")
public class Monster {
	
	//@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	private Integer monsterid;
	private String name;
	private Integer hp;
	private Integer mp;
	private Integer atk;
	private Integer def;
	private Integer agi;
	private Integer exp;
	
	

}
