
	var monsterList;
	var GET_HP = 29;
	console.log("宣言時" + GET_HP);
	
	document.addEventListener('DOMContentLoaded', (event) =>{
		console.log("setMonsterDataメソッドが実行されます")
		let token = $("meta[name='_csrf']").attr("content");
	    let header = $("meta[name='_csrf_header']").attr("content");
	    $(document).ajaxSend(function(e, xhr, options) {
	        　　xhr.setRequestHeader(header, token);;
		});
		$.ajax({
			
			url: "/monster",
			dataType: "text",
			type: "POST"
			
		}).done(function(data,textStatus,jqXHR){
			
			
			console.log(data);
			console.log("monsterSetアクセス:" + textStatus);
			
			if(!data){
				alert("モンスター情報を受け取れませんでした");
				return;
			}
			
			monsterList = JSON.parse(data);
			
			console.log("元データ" + data);
			console.log("リスト" + monsterList[1].name);
			
		}).fail(function(jqXHR,textStatus,errorThrown){
			alert("接続エラーが発生し、モンスター情報を受け取れませんでした");
			console.log(errorThrown);
		});
	});
	
	
function PostFormCharacterData(){
	
	$('#level').val(gLv);
	$('#hp').val(gMHP);
	$('#exp').val(gEx);
	/*
	$.ajaxの略記 $.post( url[,data][,success][,dataType])でPOST
	url		:リクエストの送信先URL
	data	:送信する値をマップ値で指定、URLエンコードが施されたURLクエリ―の文字列に変換
	success	:リクエスト成功時の処理を
	dataType:	
	*/
	$.post('/charaUpdate', $('.stats').serialize())
    
    
	.done(function( data ) {
 	// Controllerのreturn値が返ってくる
    console.log( data );
 
	})
}




 			const CHRHEIGHT = 9;                                //キャラの高さ
            const CHRWIDTH = 8;                                 //キャラの幅            
            const FONT = "12px monospace"                       // 使用フォント
            const FONTSTYLE ="#ffffff" ;                        //文字色
            const HEIGHT = 120;                                 //仮想画面サイズ 高さ 120
            const WIDTH = 128;                                  //仮想画面サイズ 幅 128
            const MAP_WIDTH = 32;                               //マップの幅
            const MAP_HEIGHT = 32;                              //マップの高さ
            const SCR_HEIGHT = 8;                               //画面タイルサイズの半分の高さ
            const SCR_WIDTH = 8;                                //画面タイルサイズの半分の幅
            const SMOOTH = 0;	                               //補間処理
            console.log("代入直前" + GET_HP);
            var start_HP = charaHP;                            //開始HP
            console.log("代入直後" + start_HP);
            const START_X =15;                                  //開始位置X座標
            const START_Y =17;                                  //開始位置Y座標 
            const TILESIZE = 8;                                 //タイルサイズ(ドット)
            const TILECOLUMN = 4;                               //タイル行数
            const TILEROW = 4;                                  //タイル枚数
            const WNDSTYLE = "rgba(0,0,0,0.75)";                //ウィンドウの色
            const gKey = new Uint8Array(0x100);                 //キー入力バッファ
            const INTERVAL = 33;                                //フレーム呼び出し間隔
            const SCROLL = 1;                                   //スクロール速度


            let gAngle = 0;                                     //プレイヤーの向き
            let gMessage1 = null;                               //表示メッセージ1
            let gMessage2 = null;                               //表示メッセージ2
            let gItem = 0;                                      // 所持アイテム
            let gEx = charaEXP;                                        //プレイヤーの経験値	exp
            let gHP = start_HP;                                 //プレイヤーのHP		hp
            let gMHP = start_HP;                                //プレイヤーの最大HP
            let gLv = charaLV;                                        //プレイヤーのレベル	level
            let gPhase = 0;                                     //戦闘フェーズ
            let gCursor = 0;                                    //カーソル位置
            let gEnemyType;                                     //敵種別
            let gEnemyHP;                                       //敵HP
            let gOrder;                                         //行動順      
            let gScreen;                                        //仮想画面
            let gFrame = 0;                                     //内部カウンター
            let gWidth;                                         //実画面の幅
            let gHeight;                                        //実画面の高さ
            let gMoveX = 0;                                     //移動量X
            let gMoveY = 0;                                     //移動量Y
            let gImgMap;                                        //画像 マップ
            let gImgPlayer;                                     //画像 プレイヤー
            let gImgMonster;                                    //画像 モンスター
            let gImgBoss;                                       //画像 ボス
            let gPlayerX = START_X * TILESIZE + TILESIZE / 2;   //プレイヤー座標X
            let gPlayerY = START_Y * TILESIZE + TILESIZE / 2;   //プレイヤー座標Y

            const gFileMap = "/img/map.png";
            const gFilePlayer = "/img/player.png";
            const gFileMonster = "/img/monster.png";
            const gFileBoss = "/img/boss.png"

            const gEncounter = [0,0,0,1,0,0,2,3,0,0,0,0,0,0,0,0];                    //敵エンカウント確率
            const gMonsterName = ["スライム", "うさぎ","ナイト","ドラゴン","魔王"];    //モンスター名称

			

            //マップ
            const gMap =[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 3, 3, 7, 7, 7, 7, 7, 7, 7, 7, 7, 6, 6, 3, 6, 3, 6, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 3, 3, 6, 6, 7, 7, 7, 2, 2, 2, 7, 7, 7, 7, 7, 7, 7, 6, 3, 0, 0, 0, 3, 3, 0, 6, 6, 6, 0, 0, 0,
                        0, 0, 3, 3, 6, 6, 6, 7, 7, 2, 2, 2, 7, 7, 2, 2, 2, 7, 7, 6, 3, 3, 3, 6, 6, 3, 6,13, 6, 0, 0, 0,
                        0, 3, 3,10,11, 3, 3, 6, 7, 7, 2, 2, 2, 2, 2, 2, 1, 1, 7, 6, 6, 6, 6, 6, 3, 0, 6, 6, 6, 0, 0, 0,
                        0, 0, 3, 3, 3, 0, 3, 3, 3, 7, 7, 2, 2, 2, 2, 7, 7, 1, 1, 6, 6, 6, 6, 3, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 7, 7, 7, 7, 2, 7, 6, 3, 1, 3, 6, 6, 6, 3, 0, 0, 0, 3, 3, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 6, 7, 2, 7, 6, 3, 1, 3, 3, 6, 6, 3, 0, 0, 0, 3, 3, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 7, 7, 7, 6, 3, 1, 1, 3, 3, 6, 3, 3, 0, 0, 3, 3, 3, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 6, 6, 7, 7, 7, 6, 3, 1, 1, 3, 3, 6, 3, 3, 0, 3,12, 3, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 6, 6, 7, 7, 6, 3, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 6, 6, 6, 6, 3, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 6, 6, 3, 3, 3, 3, 1, 1, 3, 3, 3, 1, 1, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 5, 3, 3, 3, 6, 6, 6, 3, 3, 3, 1, 1, 1, 1, 1, 3, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 8, 9, 3, 3, 3, 6, 6, 6, 6, 3, 3, 3, 3, 3, 3, 1, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 6, 6, 6, 3, 3, 3, 3, 3, 3, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 6, 6, 6, 6, 3, 3, 3, 3, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 6, 6, 6, 6, 3, 3, 3, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 6, 6, 6, 3, 3, 3, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 6, 6, 3, 6, 6, 6, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 6, 3, 6, 6, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 6, 3, 6, 6, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 3, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 6, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,14, 6, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0,
                        7,15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 0, 0, 0, 0, 0,
                        7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 7, 7,];

            
			

            
            //戦闘行動処理
            function Action(){
                gPhase++;                                                                    //フェーズ経過

                if (((gPhase + gOrder) & 1) == 0){                                           //敵の行動順の場合
                    const d = GetDamage(gEnemyType + 2);
                    SetMessage(gMonsterName[gEnemyType] + "の攻撃！", d + "のダメージ！");
                    gHP -= d;                                                                //プレイヤーのHP減少
                    if(gHP <= 0){                                                            //プレイヤーが死亡した場合
                        gPhase = 7;                                                          //死亡フェーズ
                    }
                    return;
                }

                //プレイヤーの行動順
                if (gCursor == 0){                                         //戦う選択肢
                    const d = GetDamage(gLv + 1);                          //ダメージ計算結果取得
                    SetMessage("あなたの攻撃！",d + "のダメージ！");
                    gEnemyHP -= d;
                    if(gEnemyHP <= 0){
                        gPhase = 5;
                    }
                    return;

                }
                if(Math.random() < 0.5){                                    //逃げる成功時
                    SetMessage("あなたは逃げ出した",null);
                    gPhase = 6;
                    return;
                }

                //逃げる失敗時
                SetMessage("あなたは逃げだした", "しかし回り込まれた");
            }

            //経験値加算処理
            function AddExp(val){
                gEx += val;                                          //経験値加算
                while(gLv * (gLv + 1) * 2 <= gEx){                   //レベルアップ上限を満たしている場合
                    gLv ++;//レベルアップ
                    gMHP += 4 + Math.floor(Math.random() * 3);       //最大HP上昇4～6
                }
            }
            //敵出現処理
            function AppearEnemy(t){
                gPhase = 1;                                           //敵出現フェーズ
                gEnemyHP = t * 3 + 5;                                 //敵HP
                gEnemyType = t;
                SetMessage("敵が現れた！",null);
            }
            
            //戦闘コマンド
            function CommandFight(){

                gPhase = 2;                                          //戦闘コマンド選択フェーズ
                gCursor = 0;
                SetMessage("　戦う" , "　逃げる");
            }

            //戦闘画面描画処理
            function DrawFight(g){
                g.fillStyle = "#000000";                             //背景色
                g.fillRect(0,0,WIDTH,HEIGHT);                        //画面全体を短形描画

                if (gPhase <= 5){                                    //敵が生存している場合
                    if (IsBoss()){                                   //ラスボスの場合                
                        g.drawImage(gImgBoss,WIDTH / 2 - gImgBoss.width / 2, HEIGHT / 2 - gImgBoss.height / 2);     
                    }else{
                        let w = gImgMonster.width / 4;
                        let h = gImgMonster.height;
                        g.drawImage(gImgMonster,gEnemyType * w,0,w,h,Math.floor(WIDTH/2 - w / 2),Math.floor(HEIGHT/2 - h / 2),w,h);      
                    }
                }
                
                DrawMessage(g);                                       //メッセージ描画
                DrawStatus(g);                                        //ステータス描画               

                if(gPhase == 2){                                      //戦闘フェーズがコマンド選択中の場合
                    g.fillText("⇒" ,6,96   + 14 * gCursor);          //カーソル描画
                }
            }
               
            //フィールド画面描画処理
            function DrawField(g){
                let mx = Math.floor(gPlayerX / TILESIZE);                  //プレイヤーのタイル座標X
                let my = Math.floor(gPlayerY / TILESIZE);                  //プレイヤーのタイル座標Y
 
                    for (let dy = -SCR_HEIGHT; dy <= SCR_HEIGHT; dy++){
                        let ty = my + dy;                                  //タイル座標Y
                        let py = (ty + MAP_HEIGHT) % MAP_HEIGHT;           //ループ後タイル座標
                        for (let dx = -SCR_WIDTH; dx <= SCR_WIDTH; dx++){
                            let tx = mx + dx;                              //タイル座標X
                            let px = (tx+ MAP_WIDTH) % MAP_WIDTH;          //ループ後タイル座標X
                           
                            DrawTile(g, 
                                    tx * TILESIZE  + WIDTH / 2 - gPlayerX,
                                    ty * TILESIZE  + HEIGHT / 2 -gPlayerY,
                                    gMap[py * MAP_WIDTH + px ]);
                        }
                    }
                    
                    //プレイヤー
                    g.drawImage(gImgPlayer,
                                (gFrame >> 3 & 1) * CHRWIDTH,gAngle * CHRHEIGHT,CHRWIDTH,CHRHEIGHT,
                                WIDTH / 2 - CHRWIDTH / 2,HEIGHT / 2 - CHRHEIGHT + TILESIZE / 2,CHRWIDTH,CHRHEIGHT);    
                    //ステータスウィンドウ
                    g.fillStyle = WNDSTYLE;           //ウィンドウの色    
                    g.fillRect(2,2,44,37);            //短形描画
                    
                    DrawMessage(g);                   //メッセージ描画
                    DrawStatus(g);                    //ステータス描画
            }

            function DrawMain(){
                
               
                const g = gScreen.getContext("2d");  //仮想画面の2d描画コンテキストを取得

                if(gPhase <= 1){
                    DrawField(g);                    //フィールド画面描画

                }else{
                    DrawFight(g);
                }
                /*   g.fillStyle = WNDSTYLE;         //ウィンドウの色    
                    g.fillRect(20,3,105,15);         //短形描画

                    g.font = FONT;                   //文字フォントを設定
                    g.fillStyle = FONTSTYLE;         //文字色
                    g.fillText("x=" + gPlayerX + "y=" + gPlayerY + "m=" + gMap[my * MAP_WIDTH + mx],25,15); 
                    */

            }
            //メッセージ描画
            function DrawMessage(g){
                if (!gMessage1 ){
                    return;
                }
                g.fillStyle = WNDSTYLE;             //ウィンドウの色    
                g.fillRect(4,84,120,30);            //短形描画

                g.font = FONT;                      //文字フォントを設定
                g.fillStyle = FONTSTYLE;            //文字色

                g.fillText (gMessage1,6,96);        //メッセージ１行目
                if (gMessage2){
                    g.fillText (gMessage2,6,110);   //メッセージ２行目
                }
            }

            //ステータス描画
            function DrawStatus(g){
                g.font = FONT;                     //文字フォントを設定
                g.fillStyle = FONTSTYLE;           //文字色
                g.fillText ("Lv" ,4,13); DrawTextR(g,gLv,36,13);//Lv
                g.fillText ("HP" ,4,25); DrawTextR(g,gHP,36,25);//HP
                g.fillText ("Ex" ,4,37); DrawTextR(g,gEx,36,37);//EX
            }

            function DrawTextR(g,str,x,y){
                g.textAlign = "right";
                g.fillText(str,x,y);
                g.textAlign = "left";
            }

            function DrawTile(g,x,y,idx){
                const ix = (idx % TILECOLUMN) * TILESIZE;
                const iy = Math.floor(idx / TILECOLUMN) * TILESIZE;
                g.drawImage(gImgMap,ix,iy,TILESIZE, TILESIZE, x , y ,TILESIZE,TILESIZE);
            }

            //ダメージ量算出
            function GetDamage(a){
                return(Math.floor(a * (1 + Math.random())));                        //攻撃力の1～2倍
            }

            function IsBoss(){
                return(gEnemyType == gMonsterName.length - 1);
            }

            function LoadImage(){
                gImgMap = new Image(); gImgMap.src = gFileMap;                      //マップ画像読み込み  
                gImgPlayer = new Image(); gImgPlayer.src = gFilePlayer;             //プレイヤー画像読み込み      
                gImgMonster = new Image(); gImgMonster.src = gFileMonster;          //モンスター画像読み込み   
                gImgBoss = new Image(); gImgBoss.src = gFileBoss;                   //ボス画像読み込み     
            }

            function SetMessage(v1,v2){
                gMessage1 = v1;
                gMessage2 = v2; 

            }

            //フィールド進行処理
            function TickField(){

                if(gPhase != 0){
                    return;
                }

                if(gMoveX != 0 || gMoveY != 0 || gMessage1){}                     //移動中またはメッセージ表示中の場合
                else if(gKey[37]) {gAngle = 1; gMoveX = -TILESIZE;}               //左
                else if(gKey[38]) {gAngle = 3; gMoveY = -TILESIZE;}               //上
                else if(gKey[39]) {gAngle = 2; gMoveX = TILESIZE;}                //右
                else if(gKey[40]) {gAngle = 0; gMoveY = TILESIZE;}                //下

                //移動後のタイル座標判定
                let mx = Math.floor((gPlayerX + gMoveX) / TILESIZE);              //移動後タイル座標Ｘ
                let my = Math.floor((gPlayerY + gMoveY) / TILESIZE);              //移動後タイル座標Ｙ
                mx += MAP_WIDTH;                                                  //マップループ処理Ｘ
                mx %= MAP_WIDTH;                                                  //マップループ処理Ｘ
                my += MAP_HEIGHT;                                                 //マップループ処理Ｙ
                my %= MAP_HEIGHT;                                                 //マップループ処理Ｙ
                let m = gMap[my * MAP_WIDTH + mx];                                //タイル番号
                if (m < 3){                                                       //侵入不可の地形の場合
                    gMoveX = 0;
                    gMoveY = 0;
                }

            if (Math.abs(gMoveX) + Math.abs(gMoveY) == SCROLL){                   //マス目移動が終わる直前
                if(m == 8 || m == 9){                                             //お城
                    gHP = gMHP;                                                   //Hp全回復
                    SetMessage("魔王を倒して!",null);
                    
                }

                if(m ==11 || m == 10){                                            //町
                    gHP = gMHP;                                                   //Hp全回復
                    SetMessage( "東の果てにも","村があります");
                }

                if (m == 12){                                                     //村
                    gHP = gMHP;                                                   //Hp全回復
                    SetMessage("カギは、","洞窟にあります");
                }

                if (m == 13){                                                     //洞窟
                    gItem = 1;                                                    //カギ入手
                    SetMessage("カギを手に入れた",null);
                }

                if (m == 14){                                                     //扉
                    if (gItem == 0){                                              //カギを所持していない場合
                        gPlayerY -= TILESIZE;                                     //１マス上へ移動 
                        SetMessage("カギが必要です",null);
                    }else{
                        SetMessage("扉が開いた",null);
                    }
                }

                if (m == 15){                                                     //ボス
                   
                   AppearEnemy(gMonsterName.length - 1);
                }

                if (Math.random() * 8 < gEncounter[m]){                           //ランダムエンカウント
                    
                    let t = Math.abs(gPlayerX / TILESIZE - START_X) +
                            Math.abs(gPlayerY / TILESIZE - START_Y);
                    if(m == 6){                                                   // マップタイプが林だった場合
                        t += 8;                                                   //敵レベルを0～0.5上昇
                    }
                    if(m == 7){                                                   // マップタイプが山だった場合
                        t += 16;                                                  //敵レベルを1上昇
                    }

                    t += Math.random() * 8;                                      //敵レベルを0～0.5上昇
                    t = Math.floor(t / 16);
                    t = Math.min(t, gMonsterName.length - 2);                    //上限処理
                    
                    AppearEnemy(t);
                   
                }
            }

                gPlayerX += Math.sign(gMoveX) * SCROLL;                          //プレイヤー座標移動X
                gPlayerY += Math.sign(gMoveY) * SCROLL;                          //プレイヤー座標移動Y
                gMoveX -= Math.sign(gMoveX) * SCROLL;                            //移動量消費X
                gMoveY -= Math.sign(gMoveY) * SCROLL;                            //移動量消費Y

                //マップループ処理
                gPlayerX += (MAP_WIDTH * TILESIZE);
                gPlayerX %= (MAP_WIDTH * TILESIZE);
                gPlayerY += (MAP_HEIGHT * TILESIZE);
                gPlayerY %= (MAP_HEIGHT * TILESIZE);
            }
            function WmPaint(){
                DrawMain();
                const ca = document.getElementById("main");                                //mainキャンバスの要素を取得
                const g = ca.getContext("2d");                                             //2d描画コンテキストを取得
               
                g.drawImage (gScreen,0,0,gScreen.width,gScreen.height,0,0,gWidth,gHeight); //仮想画面のイメージを実画面へ転送
            }

            //ブラウザサイズ変更イベント
            function WmSize(){
                const ca = document.getElementById("main");                                //mainキャンバスの要素を取得
                ca.width = window.innerWidth;                                              //キャンバスの幅をブラウザの幅へ変更
                ca.height = window.innerHeight;                                            //キャンバスの高さをブラウザの高さへ変更

                const g = ca.getContext("2d");                                             //2d描画コンテキストを取得
                g.imageSmoothingEnabled = g.msImageSmoothingEnabled = SMOOTH;              //補間処理   
                                                                                          
                //実画面サイズを計測。ドットのアスペクト比を維持したままでの最大サイズを計測する
                gWidth = ca.width;
                gHeight = ca.height;
                if(gWidth / WIDTH < gHeight / HEIGHT){
                    gHeight = gWidth * HEIGHT / WIDTH;
                }else{
                    gWidth = gHeight * WIDTH / HEIGHT;
                }
            }

            //タイマーイベント発生時の処理
            function WmTimer (){

                if( !gMessage1 ){
                    gFrame++;                                                                //内部カウンターを加算
                    TickField();                                                             //フィールド進行処理
                }
                WmPaint();
            }
            //キー入力（DONW）イベント
            window.onkeydown = function(ev){
                let c = ev.keyCode;                                                          //キーコード取得
                if (gKey[c] != 0){                                                           //すでに押下中の場合（キーリピート）
                    return;
                }

                gKey[c] = 1;

                if (gPhase == 1){                                                            //敵が現れた場合
                    gPhase = 2;                                                              //戦闘コマンド選択フェーズ
                    SetMessage("　戦う" , "　逃げる");
                    return;
                    
                }
                if (gPhase == 2){                                                            //戦闘コマンド選択中の場合
                    if (c == 13 || c == 90){                                                 //Enterキー、またはＺキーの場合 
                        gOrder = Math.floor(Math.random() * 2);                              //戦闘行動順
                        Action();                                                            //戦闘行動処理
                    }else{
                        gCursor = 1 - gCursor;                                               //カーソル移動
                    }
                    return;
                }

                if (gPhase == 3){
                    Action();
                    return;                                                                   //戦闘行動処理
                }
                if (gPhase == 4){
                    CommandFight();                                                           //戦闘コマンド
                    return;
                }

                if (gPhase == 5){
                    gPhase = 6;
                    AddExp(gEnemyType + 1);                                                   //経験値加算
                    SetMessage("敵を倒した！",null);
                    PostFormCharacterData();
                    return;
                }

                if (gPhase == 6){
                   if (IsBoss() && gCursor == 0){                                             //敵がラスボス場合
                    SetMessage("魔王を倒し","世界に平和が訪れた");
                    return;
                   }
                   gPhase = 0;                                                                //マップ移動フェーズ
                }

                if (gPhase == 7){
                    gPhase = 8;
                    SetMessage("あなたは死亡した",null);
                    return;
                }

                if (gPhase == 8){
                    SetMessage("ゲームオーバー");
                    return;
                }
                gMessage1 = null;
            }

            //キー入力（UP）イベント
            window.onkeyup = function(ev){
                gKey[ev.keyCode] = 0;

            }
            //ブラウザ起動イベント
             window.onload = function(){
                LoadImage();
                
                gScreen = document.createElement("canvas");                      //仮想画面を作成
                gScreen.width = WIDTH;                                           //仮想画面の幅を決定 
                gScreen.height = HEIGHT;                                         //仮想画面の高さを決定

                WmSize();                                                        //画面サイズ初期化
                window.addEventListener("resize", function() {WmSize()})         //ブラウザサイズ変更時、WmSize()が呼ばれるように指示
                setInterval(function() {WmTimer()}, INTERVAL);                   //33ms間隔でWmTimer()を呼び出すよう指示（約30.3fps）
            }
            