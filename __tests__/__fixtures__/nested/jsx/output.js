import React from 'react';

function List(props) {
  const _iterable = props.items;
  let _result = [];

  for (let _key = 0, _length = _iterable.length, _value; _key < _length; ++_key) {
    _value = _iterable[_key];

    _result.push(React.createElement("li", {
      key: _value.id
    }, _value.value));
  }

  return React.createElement("ul", null, _result);
}
