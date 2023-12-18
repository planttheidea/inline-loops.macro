type ArrayHandler<Item, Result> = (
  value: Item,
  index: number,
  array: Item[],
) => Result;

type ArrayReduceHandler<Item, Result> = (
  accumulator?: Result,
  value?: Item,
  index?: number,
  array?: Item[],
) => Result;

type ObjectHandler<Item, Result> = (
  value: Item,
  key: string,
  object: Record<number | string, Item>,
) => Result;

type ObjectReduceHandler<Item, Result> = (
  accumulator?: Result,
  value?: Item,
  key?: string,
  object?: Record<number | string, Item>,
) => Result;

declare function every<Item>(
  collection: Item[],
  handler: ArrayHandler<Item, unknown>,
): boolean;
declare function everyObject<Item>(
  collection: Record<number | string, Item>,
  handler: ObjectHandler<Item, unknown>,
): boolean;
declare function everyRight<Item>(
  collection: Item[],
  handler: ArrayHandler<Item, unknown>,
): boolean;

declare function filter<Item>(
  collection: Item[],
  handler: ArrayHandler<Item, unknown>,
): Item[];
declare function filterObject<Item>(
  collection: Record<number | string, Item>,
  handler: ObjectHandler<Item, unknown>,
): Record<number | string, Item>;
declare function filterRight<Item>(
  collection: Item[],
  handler: ArrayHandler<Item, unknown>,
): Item[];

declare function find<Item>(
  collection: Item[],
  handler: ArrayHandler<Item, unknown>,
): Item | undefined;
declare function findObject<Item>(
  collection: Record<number | string, Item>,
  handler: ObjectHandler<Item, unknown>,
): Item | undefined;
declare function findLast<Item>(
  collection: Item[],
  handler: ArrayHandler<Item, unknown>,
): Item | undefined;

declare function findIndex<Item>(
  collection: Item[],
  handler: ArrayHandler<Item, unknown>,
): number;
declare function findKey<Item>(
  collection: Record<number | string, Item>,
  handler: ObjectHandler<Item, unknown>,
): string | void;
declare function findLastIndex<Item>(
  collection: Item[],
  handler: ArrayHandler<Item, unknown>,
): number;

declare function forEach<Item>(
  collection: Item[],
  handler: ArrayHandler<Item, void>,
): void;
declare function forEachObject<Item>(
  collection: Record<number | string, Item>,
  handler: ObjectHandler<Item, void>,
): void;
declare function forEachRight<Item>(
  collection: Item[],
  handler: ArrayHandler<Item, void>,
): void;

declare function map<Item, Result>(
  collection: Item[],
  handler: ArrayHandler<Item, Result>,
): Result[];
declare function mapObject<Item, Result>(
  collection: Record<number | string, Item>,
  handler: ObjectHandler<Item, Result>,
): Record<number | string, Result>;
declare function mapRight<Item, Result>(
  collection: Item[],
  handler: ArrayHandler<Item, Result>,
): Result[];

declare function reduce<Item, Result>(
  collection: Item[],
  handler: ArrayReduceHandler<Item, Result>,
  initialValue?: Result,
): Result;
declare function reduceObject<Item, Result>(
  collection: Record<number | string, Item>,
  handler: ObjectReduceHandler<Item, Result>,
  initialValue?: Result,
): Result;
declare function reduceRight<Item, Result>(
  collection: Item[],
  handler: ArrayReduceHandler<Item, Result>,
  initialValue?: Result,
): Result;

declare function some<Item>(
  collection: Item[],
  handler: ArrayHandler<Item, unknown>,
): boolean;
declare function someObject<Item>(
  collection: Record<number | string, Item>,
  handler: ObjectHandler<Item, unknown>,
): boolean;
declare function someRight<Item>(
  collection: Item[],
  handler: ArrayHandler<Item, unknown>,
): boolean;

export {
  every,
  everyObject,
  everyRight,
  filter,
  filterObject,
  filterRight,
  find,
  findIndex,
  findLastIndex,
  findKey,
  findObject,
  findLast,
  forEach,
  forEachObject,
  forEachRight,
  map,
  mapObject,
  mapRight,
  reduce,
  reduceObject,
  reduceRight,
  some,
  someObject,
  someRight,
};
