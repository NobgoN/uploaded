package com.example.demo.controller;

import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.entity.Characters;
import com.example.demo.entity.Monster;
import com.example.demo.form.UserRegistrationForm;
import com.example.demo.service.CharacterService;
import com.example.demo.service.MonsterService;
import com.example.demo.service.UserDetailsImpl;
import com.example.demo.service.UserRegistrationService;

/*
ControllerはViewとServiceの橋渡し
Controllerは、「Viewからリクエストをもらう」と「Viewにレスポンスを返す」という2つの役割があります。

Viewからリクエストをもらって、処理担当のService君に指示を出す係です。

Controllerには業務ロジックは置かないでください。
ThinControllerと呼ばれるように、Controllerはコードが少ない方が良いです。
 */

@Controller
public class AccountController {
	
	// 他クラスの呼び出し
	@Autowired
	private UserRegistrationService userRegistrationService;
	
	@Autowired
	private MonsterService monsterService;
	
	@Autowired
	private CharacterService characterService;
	
	
	
	// /indexが叩かれた時の処理
	@GetMapping("/index")
	public String showTop(@AuthenticationPrincipal UserDetailsImpl user) {
		// @AuthenticationPrincipalでUserDetailsを引数に設定するとユーザー情報を取り扱うことができる
		
		// index.htmlを表示する
		return "index";
	}
	
	// 未認証ユーザーはこのログインページに遷移
	@GetMapping("/login")
	public String showLoginPage() {
		return "login";
	}
	
	// ゲーム画面（DQ）を表示するページ
	@GetMapping("/game")
	public String showGame(@AuthenticationPrincipal UserDetailsImpl user,Model model) {
		// @AuthenticationPrincipalでログイン中のユーザー情報を受け取り、そのユーザー名でキャラクターTABLEから1件取得
		Map<String, Object> charaList = characterService.findByUserName(user.getUsername());
		
		// 取得してきたリストからJavaScriptに渡す値を .get("キー") で取り出し変数に代入
		int charaLV = (int) charaList.get("level");
		int charaHP = (int) charaList.get("hp");
		int charaEXP = (int) charaList.get("exp");
		
		// model.addAttribute(追加先,値) で対象HTMLの <script th:inline="javascript"> にある /*[[${追加先}]]*/ に値を送る
		model.addAttribute("charaLV", charaLV);
		model.addAttribute("charaHP", charaHP);
		model.addAttribute("charaEXP", charaEXP);
		
		return "game";
	}
	
	// ゲーム画面（FF）を表示するページ
	@GetMapping("/game1")
	public String showMainGame(@AuthenticationPrincipal UserDetailsImpl user,Model model) {

		String username = user.getUsername();
		// model.addAttribute(追加先,値) で対象HTMLの <script th:inline="javascript"> にある /*[[${追加先}]]*/ に値を送る
		model.addAttribute("charaName", username);
		model.addAttribute("playerName", username);
		
		return "game1";
	}
	
	// モンスター情報を全て取得する処理
	@PostMapping("/monster")
	@ResponseBody
	public Iterable<Monster> setMonsterData() {
		
		return monsterService.findAllMonster();
	}
	
	// ログインユーザーのcharacterテーブルにある要素を更新する処理
	@PostMapping("/charaUpdate")
	@ResponseBody
	public void setCharacterData(@AuthenticationPrincipal UserDetailsImpl user,Characters getCharaData) {
		characterService.setCharaData(user,getCharaData);
		return;
	}
	
	// /user/registrationが開かれた時の処理
	@GetMapping("/user/registration")
	public String showUserRegistration(@ModelAttribute("form") UserRegistrationForm form) {
		return "user-registration";
	}
	
	// 登録ページのボタンが押された時の処理
	@Transactional
	@PostMapping("/user/registration")
	public String userRegistration(@Valid @ModelAttribute("form") UserRegistrationForm form, BindingResult result) {
		// エラーが発生 または ユーザー名がすでに存在していないか確認
		if(result.hasErrors() || userRegistrationService.checkUserDuplication(form.getUsername())) {
			System.out.println("アカウント登録に失敗しました");
			return "user-registration";
		}
		
		userRegistrationService.userRegistration(form.getUsername(), form.getPassword());
		return "redirect:/login";
	}
	
}
