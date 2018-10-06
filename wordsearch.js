function testCase(number, row, col, grid, word){
	for(x=1; x<=number; x++){
		console.log("Case " + x + ": " + createTiles(row, col, grid, word));
	}
}

function checkVertical(row, newRow, col, newCol, whole, word, count){
  var newCount = count;
  var currRow = newRow;
  var currCol = newCol;
  var down = "";
  var up = "";

  for(y=0; y<whole.length; y++){
        if(y===whole.length-1){
          currCol++;
        }
        if(y%col===newCol && currRow != row){
          down+=whole[y];
        } else if (y%col===newCol && currRow === row) {
          down+=whole[y];
        }
    
  }
  if(word.includes(down)){ //downward
      newCount++;
  }
  for(i=down.length-1; i>=0; i--){
    up+=down[i]
  }
  if(word.includes(up)){ //upward
    newCount++;
  }
  down="";
  up="";
  
  if(currCol < col){
      checkVertical(row, currRow, col, currCol, whole, word, newCount);
  } else {
      return newCount;
  }
}

function createTiles(row, col, grid, word){
	var count = 0;
  var test = "";
  var whole = "";
  for(i=0; i<grid.length; i++){
    whole+=grid[i];
    if(grid[i].includes(word)){ //straight
      count++;
    }

    for(x=grid[i].length-1; x>=0; x--){
      test+=grid[i][x];
      if(test.length===col){
        if(test.includes(word)){ //reverse
          count++;
        }
        test="";
      }
    }
  };
  checkVertical(row, 1, col, 0, whole, word, 0);
  //checkDiagonal();
  return count; 
  //
}

function checkDiagonal(maxRow, maxLetters, whole, word){
    var currRow = 0;
    var downR = "";
    var downL = "";
    var upR = "";
    var upL = "";
    for(i=0; i<whole.length; i++){
      if(i != 0 && i%maxLetters===0){
        currRow++;
      }
      if(currRow + word.length <= maxRow && (i-(currRow*maxLetters)) + word.length-1 < maxLetters){ //downward to right
        downR+=i;
      }
      if(currRow - (word.length-1) >= 0 && ((i-(currRow*maxLetters)) - (word.length-1)) >= 0){ //upward to left
        upL+=i;
      }
      if(currRow + word.length <= maxRow && ((i-(currRow*maxLetters)) - (word.length-1)) >= 0){ //upward to right
        upR+=i;
      }
      if(currRow - (word.length-1) >= 0 && (i-(currRow*maxLetters)) + word.length-1 < maxLetters){ //downward to left
        downL+=i;
      }
    }
}