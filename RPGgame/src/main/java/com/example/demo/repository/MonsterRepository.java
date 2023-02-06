package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Monster;

@Repository
public interface MonsterRepository extends CrudRepository<Monster, Integer> {
	Iterable<Monster> findAll();

	Optional<Monster> findByMonsterid(int i);

}
