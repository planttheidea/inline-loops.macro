let _result;

for (let _key in object) {
  _value = object[_key];

  if (_value % 2 === 0) {
    _result = _value;
    break;
  }
}

const firstEven = _result;
