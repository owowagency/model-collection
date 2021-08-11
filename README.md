## Ideas for model collection package

This also applies somewhat to Collection

```ts
class Car extends Model {
    brand: string;
}
```

### 1. Models should be initialized with an object, which is type hinted.

```ts
const car = new Car({brand: 'Baris'});

const car = new Car({wings: 'two'}); // Type error, car does not have wings
```

### 2. Model properties should be typehinted.

```ts
const car = new Car({brand: 'Baris'});

car.brand;

car.wings; // Type error, car does not have wings
```

### 3. Model properties should be able to cast properties.

```ts
const car = new Car({manufactureDate: '1994-06-11'});

car.manufactureDate; // instance of Date
```

### 4. Model should be able to make requests.

Conflicts with consructor arguments 1.

```ts
const car = new Car({id: 1});

car.fetch();
```

### 5. Model should contain request information

```ts
const car = new Car({id: 1});

car.fetch();

car.loading; // boolean
car.error; // boolean
car.errors; // object or whatever
```

### 6. Internal logger

```ts
const car = new Car({brand: 'baris'});

car.brand = 'bariss'; // console.log(the event)
```

### 7. Subscribe events

```ts
const car = new Car({brand: 'baris'});

car.onFetch();
car.onFetched();
car.onCreated();
...
```

### 8. Keep track of changed values

```ts
const car = new Car({brand: 'baris'});

car.brand = 'bariss';

car.hasChanged('brand'); // true
```

### 9. Custom serialization

```ts
const car = new Car({brand: 'baris'});

car.serialize(); // {brand: 'barisss'}
```
