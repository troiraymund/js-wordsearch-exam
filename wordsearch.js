function testCase(number, row, col, grid, word){
	for(x=1; x<=number; x++){
		console.log("Case " + x + ": " + createTiles(row, col, grid, word));
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
  checkDiagonal(row, col, whole, word);
  return count;
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
  if(down.includes(word)){ //downward
      newCount++;
  }
  for(i=down.length-1; i>=0; i--){
    up+=down[i]
  }
  if(up.includes(word)){ //upward
    newCount++;
  }
  down="";
  up="";
  
  if(currCol < col){
      checkVertical(row, currRow, col, currCol, whole, word, newCount);
  } else {
      console.log(newCount);
      return newCount;
  }
}

function checkDiagonal(maxRow, maxLetters, whole, word){
    var diagCount = 0;
    var currRow = 0;
    var downR = [];
    var downL = [];
    var upR = [];
    var upL = [];
    var tDownR = ""
    var tDownL = "";
    var tUpR = "";
    var tUpL = "";
    for(i=0; i<whole.length; i++){
      if(i != 0 && i%maxLetters===0){
        currRow++;
      }
      if(currRow + word.length <= maxRow && (i-(currRow*maxLetters)) + word.length-1 < maxLetters){ //downward to right
        for(x=0; x<word.length; x++){
            tDownR+=whole[i+(x*maxLetters)+x];
        }
        downR.push(tDownR);
        tDownR="";
      }
      if(currRow - (word.length-1) >= 0 && ((i-(currRow*maxLetters)) - (word.length-1)) >= 0){ //upward to left
        for(x=0; x<word.length; x++){
            tDownL+=whole[i-(x*maxLetters)-x];
        }
        downL.push(tDownL);
        tDownL="";
      }
      if(currRow + word.length <= maxRow && ((i-(currRow*maxLetters)) - (word.length-1)) >= 0){ //downward to left
        for(x=0; x<word.length; x++){
            tUpR+=whole[i+(x*maxLetters)-x];
        }
        upR.push(tUpR);
        tUpR="";
      }
      if(currRow - (word.length-1) >= 0 && (i-(currRow*maxLetters)) + word.length-1 < maxLetters){ //upward to right
        for(x=0; x<word.length; x++){
            tUpL+=whole[i-(x*maxLetters)+x];
        }
        upL.push(tUpL);
        tUpL="";
      }
    }
    for(i=0; i<downR.length; i++){
      if(downR[i].includes(word)){
        diagCount++;
      }
      if(downL[i].includes(word)){
        diagCount++;
      }
      if(upR[i].includes(word)){
        diagCount++;
      }
      if(upL[i].includes(word)){
        diagCount++;
      }
    }
    console.log(diagCount);
}