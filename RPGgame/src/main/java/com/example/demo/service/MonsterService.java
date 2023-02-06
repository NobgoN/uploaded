package com.example.demo.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Monster;
import com.example.demo.repository.MonsterRepository;

@Service
public class MonsterService {

	@Autowired
	MonsterRepository monsterRepository;
	
	
	public Iterable<Monster> findAllMonster(){
		return monsterRepository.findAll();
	}
	
	public Optional<Monster> findMonsterById(int id) {
		return monsterRepository.findByMonsterid(id);
	}
	
}
