package com.example.demo.service;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

import com.example.demo.entity.User;
// UserDetailsインタフェースをオーバーライドする
public class UserDetailsImpl implements UserDetails {

	private static final long serialVersionUID = 4106737561205199922L;
	/* serialVersionUIDを明示的に定義（警告が出なくなる）Spring SecurityのVerごとに決まった値なので定義するとメンテナンスの必要が出てくる
	 * シリアル番号が一致しないとデシリアライズ（ファイルやネットワークから読み込みを行い、元のオブジェクトを復元する変換）が出来なくなる
	 */ 
	
	private User user;
	
	public UserDetailsImpl(User user) {
		this.user = user;
	}
	// ユーザの権限を返す
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// SpringSecurityにおける認可処理ではROLE_プレフィックスをつけた文字列をロールとして扱うためROLE_で返している
		return AuthorityUtils.createAuthorityList("ROLE_" + this.user.getRolename());
	}
	// ユーザのパスワードを返す
	@Override
	public String getPassword() {
		return user.getPassword();
	}
	// ユーザのユーザ名を返す
	@Override
	public String getUsername() {
		return user.getUsername();
	}
	// アカウントが有効期限切れかを判定する
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}
	// アカウントのロック状態を判定する
	@Override
	public boolean isAccountNonLocked() {
		return true;
	}
	// アカウントの資格情報（パスワード）が有効期限切れかを判定する
	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}
	// 有効なユーザかを判定する
	@Override
	public boolean isEnabled() {
		return true;
	}

}
