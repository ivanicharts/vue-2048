// export const createField = (size = 4) => Array.apply(null, { length: size * size });
// export const createField = (size = 4) => Array({ length: size * size });

// export const createField = size => 

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
    this.field[0][1] = { value: 2, x: 1, y: 0, key: this.ids.pop() };
    this.field[2][2] = { value: 4, x: 2, y: 2, key: this.ids.pop() };

    this.output = this.field
      .reduce((acc, e) => (acc.push(...e), acc), [])
      .filter(e => e.value);
    // this.field[0][3] = { value: 8, x: 3, y: 0 };
    // this.field = [{ value: 2, x: 0, y: 0 }, { value: 4, x: 2, y: 2}]
  }

  deleteUnnecessary() {
    const deleteMap = {};
    this.toDelete.forEach(cell => (
      cell.mergeTarget.value += cell.mergeTarget.value,
      deleteMap[cell.key] = 1
    ));
    this.toDelete = [];
    this.output.forEach((cell, idx) => {
      if (cell.key in deleteMap) {
        console.log('deleted');
        // this.output.splice(idx, 1);
      }
    });
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
          while (p < size - 1 && (!next.value || next.value === cell.value)) {
            p++;
            
            if (next && next.value === cell.value) {
              cell.mergeTarget = next;
              this.toDelete.push(cell);
              field[i][p - 1] = {};
            } else {
              const tmp = field[i][p];
              field[i][p] = cell;
              field[i][p - 1] = tmp;
            }
            next = field[i][p + 1];

            
            cell.x++;
            // console.log('p', p, cell.value)
          }
        }
        
      }
    }

    this.deleteUnnecessary();
    console.log('field', field, this.toDelete);
  }

  getField() {
    return this.output;
    // return this.field
    //   .reduce((acc, e) => (acc.push(...e), acc), [])
    //   .filter(e => e.value);
  }


}

// export default {
//   createField
// }