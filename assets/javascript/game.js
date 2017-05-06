window.onload = function() {

	var characters=["#char1","#char2","#char3","#char4"];
	var charactersName=["Obi-Wan Kenobi","Yoda","Dark Vader","Dark Maul"];
	var charactersHealth=[100,120,180,150];
	var characterAttack=[8,10,15,12];
	var characterAttackBase=[8,10,15,12];
	var characterCounterAttack=[12,14,7,6];

	var stage="selectYourCharacter";
	var gameOver=false;
	var characterDefeated=0;
	var yourCharacterNumber=0;
	var defenderNumber=0;
	var defenderSelected=false;

  	$("#char1").click(function(){characterClick(0)});
  	$("#char2").click(function(){characterClick(1)});
  	$("#char3").click(function(){characterClick(2)});
  	$("#char4").click(function(){characterClick(3)});
  	$("#attack").click(function(){attacking()});
  	$("#reset").click(function(){location.reload()});

	function characterClick(x){
		switch(stage){
			case "selectYourCharacter":
				yourCharacterNumber=x;
				$(characters[x]).appendTo("#yourCharacter");
				$(characters[x]).removeClass( "characterTile" ).addClass( "yourCharacterTile" );
				for(var i=0; i<characters.length; i++){
					if(i!=x){
						$(characters[i]).removeClass( "characterTile" ).addClass( "enemiesCharacterTile" );
						$(characters[i]).appendTo("#enemiesRow");
					};
				};
				stage="selectDefender";
				break;
			case "selectDefender":
				if(x!=yourCharacterNumber){
					defenderNumber=x;
					$(characters[x]).removeClass( "enemiesCharacterTile" ).addClass( "defenderCharacterTile" );
					$(characters[x]).appendTo("#defenderRow");
				};
				stage="attack";
				gameOver=false;
				$("#attackInfoRow").html("");
				defenderSelected=true;
				break;
		};
	};

	function attacking(){
		if(!gameOver && stage=="attack"){
			attackInfoUpdate();
			charactersHealth[yourCharacterNumber]-=characterCounterAttack[defenderNumber];
			charactersHealth[defenderNumber]-=characterAttack[yourCharacterNumber];
			characterAttack[yourCharacterNumber]+=characterAttackBase[yourCharacterNumber];
			healthInfoUpdate();
			if(charactersHealth[yourCharacterNumber]<1){
				$("#attackInfoRow").html("You been defeated ... GAME OVER!!!");
				gameOver=true;
				//$("#resetRow").html('<button type="button" class="btn btn-default" id="reset">Reset</button>');
				$("#resetRow").removeClass( "notDisplayed" );
			}
			else if(charactersHealth[defenderNumber]<1 && characterDefeated<2){
				$("#attackInfoRow").html("You have defeated "+charactersName[defenderNumber]+", you can choose to fight another enemy.");
				characterDefeated++;
				stage="selectDefender";
				gameOver=true;
				defenderSelected=false;
				$("#defenderRow").html("<br/>");
			}
			else if(charactersHealth[defenderNumber]<1 && characterDefeated==2){
				$("#attackInfoRow").html("You won!!!");
				gameOver=true;
				$("#defenderRow").html("<br/>");
				//$("#resetRow").html('<button type="button" class="btn btn-default" id="reset">Reset</button>');
				$("#resetRow").removeClass( "notDisplayed" );
			};
		}
		else if(defenderSelected==false && stage=="selectDefender"){
			$("#attackInfoRow").html("No enemy here ...");
		};
	};

	function attackInfoUpdate(){
		$("#attackInfoRow").html("You attacked "+charactersName[defenderNumber]+" for "+characterAttack[yourCharacterNumber]+" damage.<br/>"+charactersName[defenderNumber]+" attacked you back for "+characterCounterAttack[defenderNumber]+" damage.")
	};

	function healthInfoUpdate(){
		$("#char1Health").html(charactersHealth[0]);
		$("#char2Health").html(charactersHealth[1]);
		$("#char3Health").html(charactersHealth[2]);
		$("#char4Health").html(charactersHealth[3]);
	};

};
