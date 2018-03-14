// export const createField = (size = 4) => Array.apply(null, { length: size * size });
// export const createField = (size = 4) => Array({ length: size * size });

// export const createField = size => 

export class Field {

  constructor(size = 4) {
    // super();
    this.size = size;
    this.field = Array.apply(null, { length: size })
      .map(() => Array.apply(null, { length: size }).map(() => ({})));
    
    this.field[0][0] = { value: 2, x: 0, y: 0 };
    this.field[0][3] = { value: 8, x: 3, y: 0 };
    // this.field[0][3] = { value: 8, x: 3, y: 0 };
    this.field[2][2] = { value: 4, x: 2, y: 2 };
    // this.field = [{ value: 2, x: 0, y: 0 }, { value: 4, x: 2, y: 2}]
  }

  moveRight() {
    console.log('move right')
    const { size, field } = this;
    for (let i = 0; i < size; i++) {
      console.log('l')
      for (let j = size - 1; j >= 0; j--) {
        console.log('d')
        const cell = field[i][j];
        if (cell.value) {
          let p = j;
          let next = field[i][p + 1]
          while (p < size - 1 && (!next.value || next.value === cell.value)) {
            p++;
            next = field[i][p + 1];
            cell.x++;
            console.log('p', p, cell.value)
          }
        }
        
      }
    }
  }

  getField() {
    return this.field
      .reduce((acc, e) => (acc.push(...e), acc), [])
      .filter(e => e.value);
  }


}

// export default {
//   createField
// }