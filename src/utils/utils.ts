export function formatResult(first: number, second: number, op: string, res: number) {
    return first + " " + op + " " + second + " = " + res.toString();
}

export function checkRequestData(operation: string, first: number, second: number) {
    if ((typeof operation !== "string") || (typeof first !== "number") ||
        (typeof second !== "number"))
        throw new Error("Request data is not valid, check that operation is string and first and second are numbers")
}
