# Astro Resume

Utilities for serializing data from server for use in the client.

1. `Serialize` - Astro component that takes `id` and `data`
1. `deserialize(id: string)` - a function for use in the client that takes an `id` string and returns the `data` object

## Installation & Examples

### Install via npm

On your [Astro](https://astro.build) project:

```
npm i @ayco/astro-resume
```

### Usage

Serializing and deserializing basic primitive data

```astro
---
import Serialize from "@ayco/astro-resume";

const data = {
	hello: 'world',
}
---

<Serialize id="my-data" data={data} />

<script>
	import {deserialize} from '@ayco/astro-resume';
	const data = deserialize('my-data');
	console.log(data) // {hello: 'world'}
</script>

```

### Type Safety

You can define a type for the data and use it in the client script.

```astro
---
import Serialize from "@ayco/astro-resume";

const data = {
	hello: 'world',
	isOkay: true
}
// define the type of data to be serialized
export type Data = typeof data;
---

<Serialize id="my-data" data={data} />

<script>
	import {deserialize} from '@ayco/astro-resume';

	/**
	* reuse the type in the client
	* assuming this component's name is `ThisComponent.astro`
	*/
	import type {Data} from './ThisComponent.astro';

	const data = deserialize<Data>('my-data');

	console.log(data) // {hello: 'world', isOkay: true}
</script>
```

### Passing all Astro.props to client

If you need to make all the component props to the client script:

```astro
---
import Serialize from "@ayco/astro-resume";
export interface Props {
	hello: string;
	isOkay: boolean;
}
---

<Serialize id="preferences" data={{...Astro.props}} />

<script>
	import {deserialize} from '@ayco/astro-resume';
	import type {Props} from './ThisComponent.astro';
	const {hello, isOkay} = deserialize<Props>('preferences');
	console.log(hello, isOkay);
</script>
```

### Using a custom serializer and parser

If you want to opt for more complex data, you can bring your custom serializer/parser.

Here's an example of serializing data that `JSON.stringify` cannot (e.g., Date or BigInt) using Rich Harris' [`devalue`](https://github.com/Rich-Harris/devalue):

```astro
---
import {stringify} from 'devalue';
import Serialize from "../Serialize.astro";
const data = {
    name: 'John Doe',
    isOkay: true,
    mood: null,
    now: new Date(),
    age: BigInt('3218378192378')
}
export type Data = typeof data;
---

<Serialize data={data} id="my-data" use={stringify} />

<script>
    import { parse } from 'devalue';
    import { deserialize } from '../deserialize';
    import type { Data } from './index.astro';

    const data = deserialize<Data>('my-data', parse);
    console.log(typeof data.age); // 'bigint'
    console.log(data.now instanceof Date); // true
</script>
```

### Errors & Warning in `deserialize()`

The `deserialize()` function may give you the following:
1. **ERR: No match found** - there are no `JSON` scripts with the given ID  
1. **WARNING: Multiple matches for <id>** - there were multiple `JSON` scripts found with the same ID

## About

This is a quick and easy pattern to embed serialized information into your HTML and make it available in the client-side script with type safety.

The `Serialize` component will write the data as JSON wrapped in a `<script type="application/json">` element to hold the string.

The `deserialize()` function can then parse the value string for use in your client script.

There is also a pattern [given in the Astro docs](https://docs.astro.build/en/guides/client-side-scripts/#pass-frontmatter-variables-to-scripts) to use a Custom Element that takes a `data-` prop which properly protects the scope of your component. That is a good pattern to follow for complex applications that don't use UI frameworks.

## Trade-Off

Some other frameworks themselves will manage serialized information and the IDs for you, but we don't have access to this in Astro as we are not really shipping a framework to the browser.

That's nice and ideal (in my opinion), as we are aware of how the HTML is formed and what we are shipping to our users. The trade off is that we do have to manage things ourselves.

You have to manage the IDs (i.e., make sure they are unique) and understand that the `deserialize()` function will crawl the whole document incurring a minimal performance cost depending on how big your HTML is.

## Road Map

See the [TODO tracker](https://todo.sr.ht/~ayoayco/astro-resume) for planned work items.

## Reporting Issues

To report issues or request features, send a plain text email to [~ayoayco/astro-resume@todo.sr.ht](mailto:~ayoayco/astro-resume@todo.sr.ht) or file a ticket via [SourceHut](https://todo.sr.ht/~ayoayco/astro-resume)

