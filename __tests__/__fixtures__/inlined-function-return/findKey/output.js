let _result;

let _value;

for (let _key in object) {
  _value = object[_key];

  if (_value % 2 === 0) {
    _result = _key;
    break;
  }
}

const firstEven = _result;
