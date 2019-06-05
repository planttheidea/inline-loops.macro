let _result = false;

let _value;

for (let _key in object) {
  _value = object[_key];

  if (fn(_value, _key, object)) {
    _result = true;
    break;
  }
}

const areAnyEven = _result;
