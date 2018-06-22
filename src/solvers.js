/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(size) {
  let solution = [];
  var board = new Board({n: size});
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) { 
      board.togglePiece(row, col);
      if (board.hasAnyRooksConflicts()) {
        board.togglePiece(row, col);
      }
    }
  }
  /*
  create a new board of size n
  create a row loop up to size n
  inside create col loop up to size n
  toggle piece on for row, col (use set)
  test for conflicts (by using helper functions)
  if conflict ---> do untoggle 
  othervise ----> next row col
  push in the solution each board.attribute array of arrays 
  */
  // build the array of arrays necessary for the solution
  for (let i = 0; i < size; i++) {  
    // board.togglePiece(0,0);
    solution.push(board.attributes[i]);
  }
  
  console.log('Single solution for ' + size + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  var board = new Board({n: n});
  
  var findSolution = function(row) {
    
    // stop condition (base case)
    // if all rows exhausted
    if (row === n) {
      // increment solution count
      // calback();
      solutionCount++;
      return;
    }
    // stop
    
    // decision part (recursive case)
    
    // iterate over possible decisions
    for (var i = 0; i < n; i++) {
      // place a piece
      board.togglePiece(row, i);
       
      // recurse into remaining problems
      if (!board.hasAnyRooksConflicts() ) {
        findSolution(row + 1);
      }
      // unplace a piece
      board.togglePiece(row, i);
      
    }
    
  };
  findSolution(0);
  
     
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
  
  //  var solutionCount = 0; //fixme
  
  // // var solution = this.findNRooksSolution(n);
  // // console.log()
  
  // for (let row = 0; row < n; row++) {
  //   for (let col = 0; col < n; col++) { 
  //     if (Array.isArray(this.findNRooksSolution(n, row, col))) {
  //       solutionCount += 1;
  //     }
  //   }
  // }

  // /*
  // total solution
  // add index to loop in coloms
  //   add index to loop in row 
  //   findNRooksSolution(for all rows and columns);
  // return solution 
  // */
  // var result = Math.sqrt(solutionCount);
     
  // console.log('Number of solutions for ' + n + ' rooks:', result);
  // return result;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = []; //fixme
  
  
  let board = new Board({n: n});
  
  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      board.togglePiece(row, col);
      if (board.hasAnyQueensConflicts()) {
        board.togglePiece(row, col);
      }
    }
  }
  
  for (var i = 0; i < n; i++) {
    solution.push(board.attributes[i]);
  }
  
  /*
  create a new board of size n
  create a row loop up to size n
  inside create col loop up to size n
  toggle piece on for row, col (use set)
  test for conflicts (by using helper functions)
  if conflict ---> do untoggle 
  othervise ----> next row col
  push in the solution each board.attribute array of arrays 
  */
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; 
  var board = new Board({n: n});
  
  var findSolution = function(row) {
    
    // stop condition (base case)
    // if all rows exhausted
    if (row === n) {
      // increment solution count
      // calback();
      solutionCount++;
      return;
    }
    // stop
    
    // decision part (recursive case)
    
    // iterate over possible decisions
    for (var i = 0; i < n; i++) {
      // place a piece
      board.togglePiece(row, i);
       
      // recurse into remaining problems
      if (!board.hasAnyQueensConflicts() ) {
        findSolution(row + 1);
      }
      // unplace a piece
      board.togglePiece(row, i); 
    }
  };
  findSolution(0);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
