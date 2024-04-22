// Code goes here

var app = angular.module("tictactoe", []);

app.controller("MainCtrl", ["$scope", function($scope) {
  
  var startPlayer = "O";
  
  //initialize the stope
  $scope.board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];
  
  $scope.selectedPlayer = startPlayer;
  $scope.currentPlayer= startPlayer;
  $scope.players = ["O", "X"];
  $scope.gameStarted = false;
  $scope.winner = null;
  $scope.winHighlights = [];
  
  //scope functions
  $scope.getHighlighted = function(row, col) {
    
    if($scope.winHighlights.length === 0) return false;
    
    for(var i = 0; i < $scope.winHighlights.length; ++i) {
      if($scope.winHighlights[i].equals([row, col])) return true;
      //if($scope.winHighlights[i][0] === row && $scope.winHighlights[i][1] === col)
      //  return true;
    }
    
    return false;
  }
  
  $scope.selectPlayer = function(player) {
    if(!$scope.gameStarted) {
      $scope.selectedPlayer = player;
      $scope.currentPlayer = player;
    }
  }
  
  $scope.resetGame = function() {
    $scope.selectedPlayer = startPlayer;
    $scope.currentPlayer = startPlayer;
    $scope.winner = null;
    $scope.board = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];
    $scope.gameStarted = false;
    $scope.winHighlights = [];
  }
  
  $scope.getCellText = function(row, col) {
    var text = cell(row, col);
    return text ? text : '-';
  }
  
  $scope.setCellValue = function(player, row, col) {
    if($scope.currentPlayer !== player) return;
    
    //has the game been won?
    if($scope.winner !== null) return;
    
    //is the cell empty?
    if(cell(row, col)) return;
    
    //start the game
    $scope.gameStarted = true;
    
    //set the board, then set the opposite player
    $scope.board[row][col] = player;
    $scope.currentPlayer = player === "X" ? "O" : "X"; //advance next player
    $scope.selectedPlayer = player === "X" ? "O" : "X";
    
    //check the board for a winner
    $scope.winner = checkBoard(player);
  }
  
  //private functions
  function nextPlayer(player) {
    if(!player) return null;
    
    return {
      X: "O",
      O: "X"
    }[player];
  }
  
  function cell(row, col) {
    return $scope.board[row][col]
  }
  
  function checkBoard(player) {
    var empty = false;
    
    for(var k = 0; k < 3; ++k) {
      for(var j = 0; j < 3; ++j) {
        if(!cell(k, j)) {
          empty = true;
        }
      }
    }

    //check rows and columns
    for(var i = 0; i < $scope.board.length; ++i) {
      if(cell(i, 0) && (cell(i, 0) === cell(i, 1) && cell(i, 0) === cell(i, 2))) {
        
        $scope.winHighlights.push([i, 0]);
        $scope.winHighlights.push([i, 1]);
        $scope.winHighlights.push([i, 2]);
        
        return player;
      }
        
      if(cell(0, i) && (cell(0, i) === cell(1, i) && cell(1, i) === cell(2, i))) {
        
        $scope.winHighlights.push([0, i]);
        $scope.winHighlights.push([1, i]);
        $scope.winHighlights.push([2, i]);
        
        return player;
      }
    }
    
    //check diagonals
    if(cell(0,0) && (cell(0,0) === cell(1,1) && cell(1, 1) === cell(2,2))) {
      
      $scope.winHighlights.push([0, 0]);
      $scope.winHighlights.push([1, 1]);
      $scope.winHighlights.push([2, 2]);
      
      return player;
    }
      
    if(cell(0, 2) && (cell(0,2) === cell(1,1) && cell(1,1) === cell(2, 0))) {
      
      $scope.winHighlights.push([0, 2]);
      $scope.winHighlights.push([1, 1]);
      $scope.winHighlights.push([2, 0]);
      
      return player;
    }
    
    //no empty rows or columns left, but no one won
    if(!empty) return "NO ONE";
    
    return null;
  }
  
}]);