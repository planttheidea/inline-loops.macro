let _result = {};

let _value;

for (let _key in object) {
  _value = object[_key];
  _result[_key] = _value * 2;
}

const doubledValues = _result;
