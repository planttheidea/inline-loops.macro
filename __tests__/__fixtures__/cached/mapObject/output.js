let _result = {};

let _value;

for (let _key in object) {
  _value = object[_key];
  _result[_key] = fn(_value, _key, object);
}

const doubledValues = _result;
