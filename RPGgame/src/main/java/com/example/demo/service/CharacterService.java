package com.example.demo.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Characters;


@Service
public class CharacterService {

	@Autowired
	JdbcTemplate jdbc;
	
	// ユーザ名で検索し一件取得
	public Map<String, Object> findByUserName(String username) {
		// 送信するsql文を用意 ?（プレースホルダ）には変数が入る SQLインジェクション防止
		String sql = "SELECT * FROM characters WHERE username = ?";
		// JDBCTemplateのメソッドを使用しコレクションで受け取る
		Map<String, Object> character = jdbc.queryForMap(sql, username);
		
		//List<Map<String, Object>> character = jdbc.queryForList(sql); 多重化されてしまうので中止
		return character;
	}
	
	// キャラクター情報を更新
	public void setCharaData(UserDetailsImpl user, Characters getCharaData) {
		Map<String, Object> chara = findByUserName(user.getUsername());
		// プレースホルダ
		String sql = "UPDATE characters SET " +
					 "characterid = ? ,level = ? ,hp = ? ,mp = ? ,atk = ? ,def = ? ,agi = ? ,exp = ? " +
		             "WHERE" +
		             " username = ?;";
		
		    jdbc.update(
		        sql
		        ,chara.get("characterid")
		        ,getCharaData.getLevel()
		        ,getCharaData.getHp()
		        ,chara.get("mp")
		        ,chara.get("atk")
		        ,chara.get("def")
		        ,chara.get("agi")
		        ,getCharaData.getExp()
		        ,user.getUsername());
		
	}
}
