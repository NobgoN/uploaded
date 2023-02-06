package com.example.demo;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		// http.formLogin()でログイン認証の設定を記述
		http.formLogin(login -> login
				.loginPage("/login")  				// ログイン画面のURLを設定
				.loginProcessingUrl("/login")  		// ユーザ名とパスワードの送信先URLを設定
				.usernameParameter("username")  	// ユーザ名のリクエストパラメータ名を設定(デフォはusername)
				.passwordParameter("password")  	// パスワードのリクエストパラメータ名を設定(デフォはpassword)
				.defaultSuccessUrl("/index", true)	// 認証成功後の遷移先URLを設定
				.failureUrl("/login?error")			// 認証失敗した場合の遷移先URLを設定
				.permitAll()
		).logout(logout -> logout
				.logoutSuccessUrl("/login")					// ログアウト成功時の遷移先URLを設定
				.invalidateHttpSession(true).permitAll()	// セッションを明示的に破棄(不要?)
				.permitAll()
		).authorizeHttpRequests(authz -> authz	// 認可authz(AuthoriZation)とauthn認証(AutheNtication)
				.mvcMatchers("/css/**").permitAll()				// "/css"以下のディレクトリファイル全てにアクセス許可
				.mvcMatchers("/JavaScript/**").permitAll()
				.mvcMatchers("/img/**").permitAll()
				.mvcMatchers("/user/registration").permitAll()
				.anyRequest().authenticated()					// 全てのURLリクエストは認証済みユーザーしかアクセスできない
		);
		
		return http.build();
	}
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

}
