type Dictionary<T> = {
  [key: string]: T;
  [index: number]: T;
};

type ArrayIterable = any[];
type ObjectIterable = Dictionary<any>;

type ArrayHandler = (value?: any[], index?: number, array?: ArrayIterable) => any;
type ObjectHandler = (value?: any[], key?: string, object?: ObjectIterable) => any;

export function every(iterable: ArrayIterable, handler: ArrayHandler): boolean;
export function everyObject(iterable: ObjectIterable, handler: ObjectHandler): boolean;
export function everyRight(iterable: ArrayIterable, handler: ArrayHandler): boolean;

export function filter<Iterable = ArrayIterable>(
  iterable: Iterable,
  handler: ArrayHandler,
): Iterable;
export function filterObject<Iterable = ObjectIterable>(
  iterable: ObjectIterable,
  handler: ObjectHandler,
): Iterable;
export function filterRight<Iterable = ArrayIterable>(
  iterable: Iterable,
  handler: ArrayHandler,
): Iterable;

export function find(iterable: ArrayIterable, handler: ArrayHandler): any;
export function findObject(iterable: ObjectIterable, handler: ObjectHandler): any;
export function findRight(iterable: ArrayIterable, handler: ArrayHandler): any;

export function findIndex<Iterable = ArrayIterable>(
  iterable: Iterable,
  handler: ArrayHandler,
): keyof Iterable | -1;
export function findIndexRight<Iterable = ArrayIterable>(
  iterable: Iterable,
  handler: ArrayHandler,
): keyof Iterable | -1;

export function findKey<Iterable = ObjectIterable>(
  iterable: Iterable,
  handler: ObjectHandler,
): keyof Iterable | void;

export function forEach(iterable: ArrayIterable, handler: ArrayHandler): void;
export function forEachObject(iterable: ObjectIterable, handler: ObjectHandler): void;
export function forEachRight(iterable: ArrayIterable, handler: ArrayHandler): void;

export function map(iterable: ArrayIterable, handler: ArrayHandler): ArrayIterable;
export function mapObject(iterable: ObjectIterable, handler: ObjectHandler): ObjectIterable;
export function mapRight(iterable: ArrayIterable, handler: ArrayHandler): ArrayIterable;

type ArrayReduceHandler = (
  accumulator?: any,
  value?: any,
  index?: number,
  array?: ArrayIterable,
) => any;
type ObjectReduceHandler = (
  accumulator?: any,
  value?: any,
  key?: string,
  object?: ObjectIterable,
) => any;

export function reduce(
  iterable: ArrayIterable,
  handler: ArrayReduceHandler,
  initialValue?: any,
): any;
export function reduceObject(
  iterable: ObjectIterable,
  handler: ObjectReduceHandler,
  initialValue?: any,
): any;
export function reduceRight(
  iterable: ArrayIterable,
  handler: ArrayReduceHandler,
  initialValue?: any,
): any;

export function some(iterable: ArrayIterable, handler: ArrayHandler): boolean;
export function someObject(iterable: ObjectIterable, handler: ObjectHandler): boolean;
export function someRight(iterable: ArrayIterable, handler: ArrayHandler): boolean;
