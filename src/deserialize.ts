export function deserialize<T = any>(id: string): T {
    const element = document.querySelector<HTMLTextAreaElement>(`#${id}`);

    if (element?.value)
        return JSON.parse(element.value)
        
    throw Error(`The call deserialize('${id}') did not find any data.
    Check that the following are correct:
    - The Serialize component is used with correct props
    - "data" prop is not undefined
    - "${id}" is the "id" of the Serialize component
    See examples: https://sr.ht/~ayoayco/astro-resume/#usage
Stack trace: `)
}