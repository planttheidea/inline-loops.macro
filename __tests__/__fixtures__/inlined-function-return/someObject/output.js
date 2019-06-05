let _result = false;

let _value;

for (let _key in object) {
  _value = object[_key];

  if (_value % 2 === 0) {
    _result = true;
    break;
  }
}

const areAnyEven = _result;
