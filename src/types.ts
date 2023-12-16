import type { NodePath as Path } from '@babel/core';
import type { Identifier, Statement } from '@babel/types';

export interface LocalReferences {
  accumulated: Identifier;
  collection: Identifier;
  contents: Array<Statement | Statement[]>;
  key: Identifier;
  length: Identifier;
  value: Identifier;
}

export interface Handlers {
  every: (referencePath: Path) => void;
  everyObject: (referencePath: Path) => void;
  everyRight: (referencePath: Path) => void;
  filter: (referencePath: Path) => void;
  filterObject: (referencePath: Path) => void;
  filterRight: (referencePath: Path) => void;
  forEach: (referencePath: Path) => void;
  forEachObject: (referencePath: Path) => void;
  forEachRight: (referencePath: Path) => void;
  find: (referencePath: Path) => void;
  findIndex: (referencePath: Path) => void;
  findKey: (referencePath: Path) => void;
  findLast: (referencePath: Path) => void;
  findLastIndex: (referencePath: Path) => void;
  findObject: (referencePath: Path) => void;
  flatMap: (referencePath: Path) => void;
  flatMapRight: (referencePath: Path) => void;
  map: (referencePath: Path) => void;
  mapObject: (referencePath: Path) => void;
  mapRight: (referencePath: Path) => void;
  reduce: (referencePath: Path) => void;
  reduceObject: (referencePath: Path) => void;
  reduceRight: (referencePath: Path) => void;
  some: (referencePath: Path) => void;
  someObject: (referencePath: Path) => void;
  someRight: (referencePath: Path) => void;
}

export interface References {
  every?: Array<Path<Identifier>>;
  everyObject?: Array<Path<Identifier>>;
  everyRight?: Array<Path<Identifier>>;
  filter?: Array<Path<Identifier>>;
  filterObject?: Array<Path<Identifier>>;
  filterRight?: Array<Path<Identifier>>;
  forEach?: Array<Path<Identifier>>;
  forEachObject?: Array<Path<Identifier>>;
  forEachRight?: Array<Path<Identifier>>;
  find?: Array<Path<Identifier>>;
  findIndex?: Array<Path<Identifier>>;
  findKey?: Array<Path<Identifier>>;
  findLast?: Array<Path<Identifier>>;
  findLastIndex?: Array<Path<Identifier>>;
  findObject?: Array<Path<Identifier>>;
  flatMap?: Array<Path<Identifier>>;
  flatMapRight?: Array<Path<Identifier>>;
  map?: Array<Path<Identifier>>;
  mapObject?: Array<Path<Identifier>>;
  mapRight?: Array<Path<Identifier>>;
  reduce?: Array<Path<Identifier>>;
  reduceObject?: Array<Path<Identifier>>;
  reduceRight?: Array<Path<Identifier>>;
  some?: Array<Path<Identifier>>;
  someObject?: Array<Path<Identifier>>;
  someRight?: Array<Path<Identifier>>;
}
