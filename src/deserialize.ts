/**
 * Function to find and deserialize JSON data from the HTML
 * @param id The id of the Serialize component, used to find the serialized data in the HTML
 * @param parser Custom parser to be used
 * @returns The deserialized JSON data
 * @see Usage examples in 👉 https://git.sr.ht/~ayoayco/astro-resume#astro-resume
 * @example
 * 
 * To make all `Astro.props` available in your client script:
 *
 * ```astro
 * ---
 * import Serialize from "@ayco/astro-resume";
 * export interface Props {
 * 	hello: string;
 * 	isOkay: boolean;
 * }
 * ---
 * 
 * <Serialize id="preferences" data={{...Astro.props}} />
 * 
 * <script>
 * 	import {deserialize} from '@ayco/astro-resume';
 * 	import type {Props} from './ThisComponent.astro';
 * 	const {hello, isOkay} = deserialize<Props>('preferences');
 * 	console.log(hello, isOkay);
 * </script>
 * ```
 **/
export function deserialize<T = any>(id: string, parser?: (serialized: string)=>any): T {
    const elements = document.querySelectorAll<HTMLScriptElement>(`#${id}`);

    if (elements?.length > 0) {
        if (elements?.length > 1)
            console.warn(`WARNING: Multiple matches for "${id}". There are ${elements?.length} matches found for ID: "${id}". The function will parse the first match found.`)

        const element = elements[0];

        if (element?.textContent)
            return parser
                ? parser(element.textContent)
                : JSON.parse(element.textContent)
    }
        
    throw Error(`ERR: No match found.
    "deserialize('${id}')" did not find any data.
    Check that the following are correct:
    - The Serialize component is used with correct props
    - "data" prop is not undefined
    - "${id}" is the "id" of the Serialize component
    See examples: https://sr.ht/~ayoayco/astro-resume/#usage
Stack trace: `)
}
