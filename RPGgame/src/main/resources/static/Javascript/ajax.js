var monsterList;
var GET_HP;

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
		console.log(textStatus);
		
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

document.addEventListener('DOMContentLoaded', (event) =>{
            	console.log("setCharacterDataメソッドが実行されます")
            	let token = $("meta[name='_csrf']").attr("content");
                let header = $("meta[name='_csrf_header']").attr("content");
                $(document).ajaxSend(function(e, xhr, options) {
                    　　xhr.setRequestHeader(header, token);;
            	});
            	$.ajax({
            		
            		url: "/chara",
            		dataType: "text",
            		type: "POST"
            		
            	}).done(function(data,textStatus,jqXHR){
            		
            		
            		console.log(data);
            		console.log(textStatus);
            		console.log("setCharacterDataメソッドを正常に終了します");
            		
            		if(!data){
            			alert("キャラクター情報を受け取れませんでした");
            			return;
            		}
            		
            		character = JSON.parse(data);
            		GET_HP = Number(character[0].hp);
            		console.log(GET_HP);
            		
            		//console.log("元データ" + data);
            		//console.log("取得してきたユーザー名" + character[0].username);
            		
            	}).fail(function(jqXHR,textStatus,errorThrown){
            		alert("接続エラーが発生し、キャラクター情報を受け取れませんでした");
            		console.log(errorThrown);
            	});
    });
    
console.log("ajax後："+GET_HP);