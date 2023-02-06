package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;

// @ServiceをつけApplicationContextに登録することでログイン認証の際にSpringが自動的に呼び出す
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	// UserRepositoryにあるメソッドを使用するため宣言
	@Autowired
	private UserRepository userRepository;
	
	// loadUserByUsername()でusernameに一致したユーザ情報をデータベースから検索、そのユーザをもとに作られらUserDetailsを返す
	// 見つからなかった場合は UsernameNotFoundExceptionという例外をスローする
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// User変数user　に　対象のusernameのUserオブジェクトを取得
		User user = userRepository.findByUsername(username);
		// userが存在しなかった場合はthrow
		if(user == null) {
			throw new UsernameNotFoundException("Not Found");
		}
		return new UserDetailsImpl(user);
	}

}
