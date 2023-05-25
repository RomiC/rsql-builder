# rsql-builder [![Coverage Status](https://coveralls.io/repos/github/RomiC/rsql-builder/badge.svg)](https://coveralls.io/github/RomiC/rsql-builder)

Here is the simple rsql-query builder utility. It's as minimal as possible but quite powerful at the same time.

```js
import { and, cmp, eq, ge, inList, or } from 'rsql-builder'; // or const { and, cmp, eq, ge, inList, or } = require('rsql-builder')

const query = and(
  cmp('genres', inList('sci-fi', 'action', 'non fiction')),
  or(cmp('director', eq('Christopher Nolan')), cmp('actor', eq('*Bale'))),
  cmp('year', ge(2000))
); // 'genres=in=(sci-fi,action,"non fiction");(director=="Christopher Nolan",actor==*Bale);year>=2000'
```

## Installation

```sh
npm install --save rsql-builder
```

## Available methods

### `and(...comparisons): string`

Create "and"-group of comparison.

**Arguments**

- `comparisons` – list of comparisons, instances of Comparison-class or strings (for other comparison groups)

**Example**

```js
import { and, cmp, eq, ge } from 'rsql-builder';

const op = and(cmp('year', ge(1980)), cmp('director', eq('Quentin Tarantino'))); // 'year>=1980;director=="Quentin Tarantino"
```

### `or(...comparisons): string`

Create "or"-group of comparison.

**Arguments**

- `comparisons` – list of comparisons, instances of Comparison-class or strings (for other comparison groups)

**Example**

```js
import { cmp, eq, ge, or } from 'rsql-builder';

const op = or(cmp('year', ge(1980)), cmp('director', eq('Quentin Tarantino'))); // 'year>=1980,director=="Quentin Tarantino"
```

### `cmp(field, operation): Comparison` or `comparison(field, operation): Comparison`

Create a new comparison for the field.

**Arguments**

- `field {string}` – field name
- `operation {Operation}` - operation

**Example**

```js
import { cmp, eq } from 'rsql-builder';

const comp = cmp('field1', eq(200)); // 'field1==200'
```

### `eq(argument): Operation`

Create "equal"-operation.

**Arguments**

- `argument` – Any kind of value

**Example**

```js
import { eq } from 'rsql-builder';

const op1 = eq(300); // '==300'
const op2 = eq('Taran*'); // '==Tarant*'
const op3 = eq('John Travolta'); // '=="John Travolta"'
```

### `ge(argument): Operation`

Create greater-or-equal operation

**Arguments**

- `argument` – Any kind of value

**Example**

```js
import { ge } from 'rsql-builder';

const op1 = ge(300); // '>=300'
const op2 = ge('Taran*'); // '>=Tarant*'
const op3 = ge('John Travolta'); // '>="John Travolta"'
```

### `gt(argument): Operation`

Create greater-than operation

**Arguments**

- `argument` – Any kind of value

**Example**

```js
import { gt } from 'rsql-builder';

const op1 = gt(300); // '>=300'
const op2 = gt('Taran*'); // '>=Tarant*'
const op3 = gt('John Travolta'); // '>="John Travolta"'
```

### `inList(...args): Operation`

Create in-list operation

**Arguments**

- `args` – List of any values

**Example**

```js
import { inList } from 'rsql-builder';

const op = inList(300, 'Taran*', 'John Travolta'); // '=in=(300,Taran*,"John Travolta")'
```

### `le(argument): Operation`

Create less-or-equal operation

**Arguments**

- `argument` – Any kind of value

**Example**

```js
import { le } from 'rsql-builder';

const op1 = le(300); // '<=300'
const op2 = le('Taran*'); // '<=Tarant*'
const op3 = le('John Travolta'); // '<="John Travolta"'
```

### `lt(argument): Operation`

Create less-than operation

**Arguments**

- `argument` – Any kind of value

**Example**

```js
import { lt } from 'rsql-builder';

const op1 = lt(300); // '<300'
const op2 = lt('Taran*'); // '<Tarant*'
const op3 = lt('John Travolta'); // '<"John Travolta"'
```

### `ne(argument): Operation`

Create not-equal operation

**Arguments**

- `argument` – Any kind of value

**Example**

```js
import { ne } from 'rsql-builder';

const op1 = ne(300); // '!=300'
const op2 = ne('Taran*'); // '!=Tarant*'
const op3 = ne('John Travolta'); // '!="John Travolta"'
```

### `outList(...args): Operation`

Create out-list operation

**Arguments**

- `args` – List of any values

**Example**

```js
import { outList } from 'rsql-builder';

const op = outList(300, 'Taran*', 'John Travolta'); // '=out=(300,Taran*,"John Travolta")'
```

## Custom operators

New operators can be easily created as follows:

```js
import { Operation } from 'rsql-builder';

export function like(value) {
  return new Operation(value, '=like=');
}
```

```js
import { like } from '../my-rsql-operators/like';

const op = like('John Travolta'); // '=like="John Travolta"'
```

If the value can contain special characters, `escapeValue` function can be used to escape them:

```js
new Operation(escapeValue(value), '=like=');
```

A custom list operator could look like this:

```js
function customListOperator(value: Argument[]): Operation {
  return new Operation(`(${escapeValue(value)})`, '=customListOperator=');
}
```
