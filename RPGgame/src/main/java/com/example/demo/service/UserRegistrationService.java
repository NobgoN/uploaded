package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.entity.Characters;
import com.example.demo.entity.User;
import com.example.demo.repository.CharacterRepository;
import com.example.demo.repository.UserRepository;


@Service
public class UserRegistrationService {
	
	@Autowired
	JdbcTemplate jdbc;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private CharacterRepository characterRepsository;
	
	// ユーザー登録（パスワードを暗号化）
	public void userRegistration(String username, String password) {
		// hashedPassword　に　Userクラスのpasswordをencodeメソッドでハッシュ化してから代入
		String hashedPassword = passwordEncoder.encode(password);
		// JpaRepository の saveAndFlush()メソッドでUserクラスで指定したTABLEに挿入
		userRepository.save(new User(username, hashedPassword, "GENERAL"));
		// 
		characterRepsository.save(new Characters(1,20,10,5,5,5,0,username));
		}
	
	// ユーザー名の重複チェック
	public boolean checkUserDuplication(String username) {
		System.out.println("重複チェック");
		// 指定のテーブルからusernameをすべて取得
		String sql = "SELECT username FROM account";
		List<Map<String, Object>> allAcount = jdbc.queryForList(sql);

		// 取得してきたリストを分解しusernameだけのリストを生成
		List<String> acounts = new ArrayList<String>();
		for (Map<String, Object> map : allAcount) {
		    for (Map.Entry<String, Object> entry : map.entrySet()) {
		    	acounts.add((String)entry.getValue());
		    }
		}
		// テスト表示
		System.out.println(acounts);
		System.out.println(acounts.contains(username));
		// リストに新規作成するユーザー名が含まれていたらtrueを返す
		if(acounts.contains(username)) {
			return true;
		}
		
		return false;
	}
	/*public void characterNameRegistration() {
		//accountのusernameをcharactersのusernameを追加する
		String jikken = "aaaaa";
		System.out.println(jikken);
		//以下でエラーが発生
		String sql = "INSERT INTO characters(username) values()";
		List<Map<String, Object>> name = jdbc.queryForList(sql);
		characterRepsository.save(username);
	}*/
	
}