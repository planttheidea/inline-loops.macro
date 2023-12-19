import React from 'react';

import { map } from '../../../../src/inline-loops.macro';

function List(props) {
  return (
    <ul>
      {props.items &&
        map(props.items, (item) => <li key={item.id}>{item.value}</li>)}
    </ul>
  );
}
