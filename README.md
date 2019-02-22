# rsql-builder [![Build Status](https://travis-ci.com/RomiC/rsql-builder.svg?branch=master)](https://travis-ci.org/RomiC/rsql-builder) [![codecov](https://codecov.io/gh/RomiC/rsql-builder/branch/master/graph/badge.svg)](https://codecov.io/gh/RomiC/rsql-builder) [![Greenkeeper badge](https://badges.greenkeeper.io/RomiC/rsql-builder.svg)](https://greenkeeper.io/)

Here is the simple rsql-query builder utility. It's as minimal as possible but quite powerfull at the same time.

```js
import { and, comparison, eq, ge, inList, or } from "rsql-builder";

const query = and(
  comparison("genres", inList("sci-fi", "action", "non fiction")),
  or(
    comparison("director", eq("Christopher Nolan")),
    comparison("actor", eq("*Bale"))
  ),
  comparison("year", ge(2000))
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

```ts
import { and, comparison, eq, ge } from "rsql-builder";

const op = and(
  comparison("year", ge(1980)),
  comparision("director", eq("Quentin Tarantino"))
); // 'year>=1980;director=="Quentin Tarantino"
```

### `or(...comparisons): string`

Create "or"-group of comparison.

**Arguments**

- `comparisons` – list of comparisons, instances of Comparison-class or strings (for other comparison groups)

**Example**

```ts
import { comparison, eq, ge, or } from "rsql-builder";

const op = or(
  comparison("year", ge(1980)),
  comparision("director", eq("Quentin Tarantino"))
); // 'year>=1980,director=="Quentin Tarantino"
```

### `comparison(field, operation): Comparison`

Create a new comparison for the field.

**Arguments**

- `field {string}` – field name
- `operation {Operation}` - operation

**Example**

```ts
import { comparison, eq } from "rsql-builder";

const comp = comparison("field1", eq(200)); // 'field1==200'
```

### `eq(argument): Operation`

Create "equal"-operation.

**Arguments**

- `argument` – Any kind of value

**Example**

```ts
import { eq } from "rsql-builder";

const op1 = eq(300); // '==300'
const op2 = eq("Taran*"); // '==Tarant*'
const op3 = eq("John Travolta"); // '=="John Travolta"'
```

### `ge(argument): Operation`

Create greater-or-equal operation

**Arguments**

- `argument` – Any kind of value

**Example**

```ts
import { ge } from "rsql-builder";

const op1 = ge(300); // '>=300'
const op2 = ge("Taran*"); // '>=Tarant*'
const op3 = ge("John Travolta"); // '>="John Travolta"'
```

### `gt(argument): Operation`

Create greater-than operation

**Arguments**

- `argument` – Any kind of value

**Example**

```ts
import { gt } from "rsql-builder";

const op1 = gt(300); // '>=300'
const op2 = gt("Taran*"); // '>=Tarant*'
const op3 = gt("John Travolta"); // '>="John Travolta"'
```

### `inList(...args): Operation`

Create in-list operation

**Arguments**

- `args` – List of any values

**Example**

```ts
import { inList } from "rsql-builder";

const op = inList(300, "Taran*", "John Travolta"); // '=in=(300,Taran*,"John Travolta")'
```

### `le(argument): Operation`

Create less-or-equal operation

**Arguments**

- `argument` – Any kind of value

**Example**

```ts
import { le } from "rsql-builder";

const op1 = le(300); // '<=300'
const op2 = le("Taran*"); // '<=Tarant*'
const op3 = le("John Travolta"); // '<="John Travolta"'
```

### `lt(argument): Operation`

Create less-than operation

**Arguments**

- `argument` – Any kind of value

**Example**

```ts
import { lt } from "rsql-builder";

const op1 = lt(300); // '<300'
const op2 = lt("Taran*"); // '<Tarant*'
const op3 = lt("John Travolta"); // '<"John Travolta"'
```

### `ne(argument): Operation`

Create not-equal operation

**Arguments**

- `argument` – Any kind of value

**Example**

```ts
import { ne } from "rsql-builder";

const op1 = ne(300); // '!=300'
const op2 = ne("Taran*"); // '!=Tarant*'
const op3 = ne("John Travolta"); // '!="John Travolta"'
```

### `outList(...args): Operation`

Create out-list operation

**Arguments**

- `args` – List of any values

**Example**

```ts
import { outList } from "rsql-builder";

const op = outList(300, "Taran*", "John Travolta"); // '=out=(300,Taran*,"John Travolta")'
```
