package com.example.demo.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.User;

/*
RepositoryはDB通信・API通信担当
RepositoryではServiceから指示をうけて、データベースとのやり取りや外部APIとのやり取りを担当します。

逆にデータベースとのやり取り・API通信以外のことは書かないでください。
たまにDB通信しやすいようにデータを加工する部分をRepositoryに書いてあることがありますが、
それはServiceが担当。

 */
@Repository
public interface UserRepository extends CrudRepository<User, Integer>{
	public User findByUsername(String username);
}
