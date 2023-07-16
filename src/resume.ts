export default function resume(id: string): Object {
    return JSON.parse(document.querySelector<HTMLTextAreaElement>(`#${id}`).value ?? '')
}