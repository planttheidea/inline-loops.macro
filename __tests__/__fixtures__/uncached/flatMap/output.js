const _collection = [
  ['foo', 'bar'],
  ['bar', 'baz'],
];
let _results = [];
for (
  let _key = 0, _length = _collection.length, _entry, _result;
  _key < _length;
  ++_key
) {
  _entry = _collection[_key];
  const [_first] = _entry;
  _result = [_first];
  _results = _results.concat(_result);
}
const flattened = _results;