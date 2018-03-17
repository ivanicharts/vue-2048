// export const createField = (size = 4) => Array.apply(null, { length: size * size });
// export const createField = (size = 4) => Array({ length: size * size });

// export const createField = size => 

const switchCell = ({ field, rowIndex: i, colFromIndex: p, colToIndex, cell }) => {
  const tmp = field[i][p];
  field[i][p] = cell;
  field[i][colToIndex] = tmp;
}

export class Field {

  constructor(size = 4) {
    // super();
    this.toDelete = [];
    this.size = size;
    this.field = Array.apply(null, { length: size })
      .map(() => Array.apply(null, { length: size })
      .map(() => ({})));
    
    this.ids = Array.apply(null, { length: size * size })
      .map((_, idx) => idx + 1);
    
    this.field[0][0] = { value: 2, x: 0, y: 0, key: this.ids.pop() };
    this.field[0][2] = { value: 4, x: 2, y: 0, key: this.ids.pop() };
    this.field[0][3] = { value: 8, x: 3, y: 0, key: this.ids.pop() };
    this.field[0][1] = { value: 2, x: 1, y: 0, key: this.ids.pop() };
    
    this.field[1][0] = { value: 2, x: 0, y: 1, key: this.ids.pop() };
    this.field[1][1] = { value: 2, x: 1, y: 1, key: this.ids.pop() };
    this.field[1][2] = { value: 2, x: 2, y: 1, key: this.ids.pop() };
    this.field[1][3] = { value: 2, x: 3, y: 1, key: this.ids.pop() };
    
    this.field[2][0] = { value: 4, x: 0, y: 2, key: this.ids.pop() };

    this.field[3][0] = { value: 4, x: 0, y: 3, key: this.ids.pop() };
    this.field[3][3] = { value: 4, x: 3, y: 3, key: this.ids.pop() };

    this.output = this.field
      .reduce((acc, e) => (acc.push(...e), acc), [])
      .filter(e => e.value);

    this.deleteMap = {};
    // this.field[0][3] = { value: 8, x: 3, y: 0 };
    // this.field = [{ value: 2, x: 0, y: 0 }, { value: 4, x: 2, y: 2}]
  }

  deleteUnnecessaryCells() {
    console.log('transition end')

    if (true) {
      // const deleteMap = {};
      const deleteMap = this.deleteMap;
      console.log('this', deleteMap, this.output.map(e => e.key))
      this.toDelete.forEach(cell => (
        cell.mergeTarget.value *= 2,
        deleteMap[cell.key] = 1,
        console.log('to delete', cell.key)
      ));
      this.toDelete = [];
      this.output.forEach((cell, idx) => {
        if (deleteMap[cell.key]) {
          console.log('deleted', cell.key);
          this.ids.push(cell.key);
          this.output.splice(idx, 1);
          deleteMap[cell.key] = 0;
        }
      });
    }
    // this.output = this.output.filter(c => deleteMap.has(c.key));
  }

  moveRight() {
    console.log('move right', this.ids);

    const { size, field } = this;
    for (let i = 0; i < size; i++) {
      // console.log('l')
      for (let j = size - 1; j >= 0; j--) {
        // console.log('d')
        const cell = field[i][j];
        if (cell.value) {
          let p = j;
          let next = field[i][p + 1]
          while (
            p < size - 1 && 
            (!next.value || next.value === cell.value) &&
            !next.wasMergedOnThisTurn 
          ) {
            p++;
            
            if (next && next.value === cell.value) {
              cell.mergeTarget = next;
              next.wasMergedOnThisTurn = true;
              this.toDelete.push(cell);
              field[i][p - 1] = {};
            } else {
              // const tmp = field[i][p];
              // field[i][p] = cell;
              // field[i][p - 1] = tmp;
              switchCell({ field, rowIndex: i, colFromIndex: p, colToIndex: p - 1, cell });
            }
            next = field[i][p + 1];

            
            cell.x++;
            // console.log('p', p, cell.value)
          }
        }
        
      }
    }

    // this.deleteUnnecessary();
    this.resetMergedFlags();
    console.log('field', field, this.toDelete);
  }


  moveLeft() {
    console.log('move right', this.ids);

    const { size, field } = this;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const cell = field[i][j];
        if (cell.value) {
          let p = j;
          let next = field[i][p - 1]
          while (
            p > 0 && 
            (next && !next.value || next.value === cell.value) &&
            !next.wasMergedOnThisTurn 
          ) {
            p--;
            
            if (next && next.value === cell.value) {
              cell.mergeTarget = next;
              next.wasMergedOnThisTurn = true;
              this.toDelete.push(cell);
              field[i][p + 1] = {};
            } else {
              // const tmp = field[i][p];
              // field[i][p] = cell;
              // field[i][p - 1] = tmp;
              switchCell({ field, rowIndex: i, colFromIndex: p, colToIndex: p + 1, cell });
            }
            next = field[i][p - 1];
            cell.x--;
          }
        }
        
      }
    }

    // this.deleteUnnecessary();
    this.resetMergedFlags();
    console.log('field', field, this.toDelete);
  }

  moveUp() {
    console.log('move up', this.ids);

    const { size, field } = this;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const cell = field[j][i];
        if (cell.value) {
          let p = j;
          let next = field[p - 1] && field[p - 1][i];
          while (
            p > 0 && 
            (next && !next.value || next.value === cell.value) &&
            !next.wasMergedOnThisTurn 
          ) {
            p--;
            
            if (next && next.value === cell.value) {
              cell.mergeTarget = next;
              next.wasMergedOnThisTurn = true;
              this.toDelete.push(cell);
              field[p + 1][i] = {};
            } else {
              const tmp = field[p][i];
              field[p][i] = cell;
              field[p + 1][i] = tmp;
              // switchCell({ field, rowIndex: i, colFromIndex: p, colToIndex: p + 1, cell });
            }
            next = field[p - 1] && field[p - 1][i];
            cell.y--;
          }
        }
        
      }
    }

    // this.deleteUnnecessary();
    this.resetMergedFlags();
    console.log('field', field.map(e => e.map(d => d.key)), this.toDelete, this.output.map(c => Object.assign({}, c)));
  }

  moveDown() {
    console.log('move down', this.ids);

    const { size, field } = this;
    for (let i = 0; i < size; i++) {
      for (let j = size - 1; j >= 0; j--) {
        const cell = field[j][i];
        if (cell.value) {
          let p = j;
          let next = field[p + 1] && field[p + 1][i];
          while (
            p < size - 1 && 
            (next && !next.value || next.value === cell.value) &&
            !next.wasMergedOnThisTurn 
          ) {
            p++;
            
            if (next && next.value === cell.value) {
              cell.mergeTarget = next;
              next.wasMergedOnThisTurn = true;
              this.toDelete.push(cell);
              field[p - 1][i] = {};
            } else {
              const tmp = field[p][i];
              field[p][i] = cell;
              field[p - 1][i] = tmp;
              // switchCell({ field, rowIndex: i, colFromIndex: p, colToIndex: p + 1, cell });
            }
            next = field[p + 1] && field[p + 1][i];
            cell.y++;
          }
        }
        
      }
    }

    // this.deleteUnnecessary();
    this.resetMergedFlags();
    console.log('field', field, this.toDelete);
  }


  getField() {
    return this.output;
    // return this.field
    //   .reduce((acc, e) => (acc.push(...e), acc), [])
    //   .filter(e => e.value);
  }

  resetMergedFlags() {
    this.output.forEach(cell => cell.wasMergedOnThisTurn = false);
  }


}

// export default {
//   createField
// }