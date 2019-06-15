const _iterable = [];

const _fn = ([a, b]) => {
  console.log(a, b);
};

for (let _key = 0, _length = _iterable.length, _value; _key < _length; ++_key) {
  _value = _iterable[_key];

  _fn(_value, _key, _iterable);
}
