let _result = true;

let _value;

for (let _key in object) {
  _value = object[_key];

  if (!(_value % 2 === 0)) {
    _result = false;
    break;
  }
}

const areAllEven = _result;
