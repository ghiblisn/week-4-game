window.onload = function() {

	var stage="selectYourCharacter";
	var characters=["#char1","#char2","#char3","#char4"];
	var yourCharacterNumber=0;
	var charactersBank={
		Obiwan:{
			name: "Obi-Wan Kenobi",
			number: 0,
			health: 100,
			attack: 10,
			counterAttack: 5,
		},
		Yoda:{
			name: "Yoda",
			number: 1,
			health: 100,
			attack: 10,
			counterAttack: 5,
		},
		Vader:{
			name: "Dark Vader",
			number: 2,
			health: 100,
			attack: 10,
			counterAttack: 5,
		},
		Maul:{
			name: "Dark Maul",
			number: 3,
			health: 100,
			attack: 10,
			counterAttack: 5,
		}
	};

  	$("#char1").click(function(){characterClick(0)});
  	$("#char2").click(function(){characterClick(1)});
  	$("#char3").click(function(){characterClick(2)});
  	$("#char4").click(function(){characterClick(3)});

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
						$(characters[x]).removeClass( "enemiesCharacterTile" ).addClass( "defenderCharacterTile" );
						$(characters[x]).appendTo("#defenderRow");
				};
				stage="attack";
				break;


		};
	};
};
