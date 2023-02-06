package com.example.demo.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity						// Entityを生成
@Data						// 対象クラスの全フィールドにgetter・setterなどを付与
@NoArgsConstructor			// 引数無しのコンストラクタを生成
@AllArgsConstructor			// フィールドを全て引数に持つコンストラクタを生成
@Table(name = "account") 	// テーブル名を指定
public class User implements Serializable {
	

	private static final long serialVersionUID = 4106737561205199922L;
	/* serialVersionUIDを明示的に定義（警告が出なくなる）Spring SecurityのVerごとに決まった値なので定義するとメンテナンスの必要が出てくる
	 * シリアル番号が一致しないとデシリアライズ（ファイルやネットワークから読み込みを行い、元のオブジェクトを復元する変換）が出来なくなる
	 */ 

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	// @Column(name="field名")で明示的に指定、条件を設定できる
	private String username;
	
	private String password;
	
	private String rolename;
	
//	public User() {
//		
//	}
	
	public User(String username, String password, String rolename) {
		this.username = username;
		this.password = password;
		this.rolename = rolename;
	}

}