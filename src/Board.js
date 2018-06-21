// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },
    
    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) { //checks if has Row Conflict at row Index
      let result = this.get(rowIndex); //pull the row we provided 
      let sumOf = result.reduce((sum, num) => sum + num); // sum of the row
      if (sumOf > 1) { // if the row sum is greater than 1,
        return true; // return true
      } else { //else 
        return false; // return false
      }
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      let rowCount = this.attributes.n; // get number of arrays (rows) in array   
      for (var i = 0; i < rowCount; i++) { // create a for loop for the number of arrays (rows)
        if (this.hasRowConflictAt(i)) { // iterate throgh each array (row) run hasRowConflictAt function
          return true; // if return value in hasRowConflictAt function === true, return true, and end the process 
        }          
      } 
      return false; //if all rows are ok return false
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      let sumOf = 0; // set sum value
      let rowCount = this.attributes.n; // get number of rows for colons
      for (var i = 0; i < rowCount; i++) { // iterate throgh each row
        sumOf += this.get(i)[colIndex]; // add value to sum
      }
      if (sumOf > 1) { // if the col sum is greater than 1,
        return true; // return true
      } else { //else 
        return false; // return false
      }
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      let colCount = this.attributes.n; // get number of columns
      for (let i = 0; i < colCount; i++) { // loop columns
        if (this.hasColConflictAt(i)) { // check for col conflict in each col (i)
          return true; // if true return true
        }
      }
      return false; // otherwise return false
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(offset) {
      // base case when indexes of row and col are equal
      // case 0
      // length       
      let colCount = this.attributes.n; // get number of columns
      let occupied = false; 
      let sumOf = 0; // set sum value
      for (let i = 0; i < colCount; i++) {
        let row = i;
        let col = i + offset;
        
        if(col < colCount && row < colCount && col > -1 && row > -1) {
          sumOf += this.get(row)[col]; // add value to sum
        }
      } 
      if (sumOf > 1) { // if the diagonal sum is greater than 1,
        return true; // return true
      } //otherwise
      return false; 
    },

    // test if any major diagonal on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      let n = this.attributes.n
      for (let i = (-n+1); i < n; i++) { // loop diagonal
        if (this.hasMajorDiagonalConflictAt(i)) { // check for diagonal conflict in each diagonal (i)
          return true; // if true return true
        }
      }
      return false; // otherwise return false  
    },
    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(offset) {
      var sum = 0;
      let n = this.attributes.n;
      for (let i = offset; i > -1; i--) {
        let row = offset - i;
        let col = i;
        if(col < n && row < n && col > -1 && row > -1) {
          sum += this.get(row)[col]; // add value to sum
        }
      }
      if (sum > 1) { // if the diagonal sum is greater than 1,
        return true; // return true
      } //otherwise
      return false; 
      /*
      create sum 
      get size of the board 
      create a (-) loop
      collect values of index and offset - index
      add to sum 
      check to see if sum is > than 1
      if so return true
      othervise false
      */
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      let n = this.attributes.n;
      for (var i = 0; i < 2*n-1; i++) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;
      /*
      get size of board 
      create a positive for loop from 0 to 2n-1
      check each diagonal at index 
      if true return true
      othervise false
      */
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
