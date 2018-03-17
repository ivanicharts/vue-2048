// export const createField = (size = 4) => Array.apply(null, { length: size * size });
// export const createField = (size = 4) => Array({ length: size * size });

// export const createField = size => 

import { random, throttle } from 'lodash';
const throttleTime = 400;

const switchCell = ({ field, rowIndex: i, colFromIndex: p, colToIndex, cell }) => {
  const tmp = field[i][p];
  field[i][p] = cell;
  field[i][colToIndex] = tmp;
}

export class Field {

  constructor(size = 4) {
    this.state = { score: 6 };
    this.toDelete = [];
    this.size = size;
    this.field = Array.apply(null, { length: size })
      .map(() => Array.apply(null, { length: size })
      .map(() => ({})));
    
    this.ids = Array.apply(null, { length: size * size })
      .map((_, idx) => idx + 1);
    
    this.field[0][0] = { value: 2, x: 0, y: 0, key: this.ids.pop() };
    this.field[0][2] = { value: 4, x: 2, y: 0, key: this.ids.pop() };
    
    this.moveDown = throttle(this._moveDown, throttleTime);
    this.moveUp = throttle(this._moveUp, throttleTime);
    this.moveLeft = throttle(this._moveLeft, throttleTime);
    this.moveRight = throttle(this._moveRight, throttleTime);

    this.output = this.field
      .reduce((acc, e) => (acc.push(...e), acc), [])
      .filter(e => e.value);

    this.deleteMap = {};
    // this.field[0][3] = { value: 8, x: 3, y: 0 };
    // this.field = [{ value: 2, x: 0, y: 0 }, { value: 4, x: 2, y: 2}]
  }

  createRandomCell() {
    const value = random(1, 2) * 2;
    const availableSlots = this.field.reduce((acc, row, y) => {
      acc.push(...row
        .map((cell, x) => ({ x, y, value: cell.value }))
        .filter(cell => !cell.value)
      );
      return acc;
    }, []);
    if (availableSlots.length) {
      const pos = random(0, availableSlots.length - 1);
      const newCell = availableSlots[pos];
      newCell.value = value;
      newCell.key = this.ids.pop();
      newCell.isNew = true;
      // console.log(Object.assign({}, this.field[newCell.y][newCell.x]), this.field[newCell.y][newCell.x].value)
      this.field[newCell.y][newCell.x] = newCell;
      // console.log('new', newCell);
      // console.log('availableSlots', availableSlots.map(({ x, y }) => [y, x]))
      this.output.push(newCell);
      this.state.score += value; 
    }
  }

  deleteUnnecessaryCells() {
    // console.log('transition end')

    if (true) {
      // const deleteMap = {};
      const deleteMap = this.deleteMap;
      // console.log('this', deleteMap, this.output.map(e => e.key))
      this.toDelete.forEach(cell => (
        cell.mergeTarget.value *= 2,
        deleteMap[cell.key] = 1
      ));
      this.toDelete = [];
      this.output.forEach((cell, idx) => {
        cell.isNew = false;
        if (deleteMap[cell.key]) {
          // console.log('deleted', cell.key);
          this.ids.push(cell.key);
          this.output.splice(idx, 1);
          deleteMap[cell.key] = 0;
        }
      });
    }
    // this.output = this.output.filter(c => deleteMap.has(c.key));
  }

  _moveRight() {
    console.log('move right');
    let wasMoved = false;
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
            wasMoved = true;            
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

    if (wasMoved) this.createRandomCell();
    // this.deleteUnnecessary();
    this.resetMergedFlags();
    // this.createRandomCell();
    // console.log('field', field, this.toDelete);
  }


  _moveLeft() {
    console.log('move right', this.ids);
    let wasMoved = false;
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
            wasMoved = true;            
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

    if (wasMoved) this.createRandomCell();
    // this.deleteUnnecessary();
    this.resetMergedFlags();
    // console.log('field', field, this.toDelete);
  }

  _moveUp() {
    console.log('move up');
    let wasMoved = false;
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
            // console.log('was switched')
            wasMoved = true;
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
    if (wasMoved) this.createRandomCell();
    this.resetMergedFlags();
    // console.log('field', field.map(e => e.map(d => d.key)), this.toDelete, this.output.map(c => Object.assign({}, c)));
  }

  // moveDown() {  }
  _moveDown() {
    console.log('move down');
    let wasMoved = false;
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
            wasMoved = true;
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

    if (wasMoved) this.createRandomCell();    
    // this.deleteUnnecessary();
    this.resetMergedFlags();
    // console.log('field', field, this.toDelete);
  }


  getField() {
    return this.output;
  }

  getState() {
    return this.state;
  }

  resetMergedFlags() {
    this.output.forEach(cell => (
      cell.wasMergedOnThisTurn = false
    ));
  }


}

// export default {
//   createField
// }