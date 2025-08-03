const operationDef: Record<string, (a: number, b: number) => number> = {
    'add': (a, b) => a + b,
    'sub': (a, b) => a - b,
    'mul': (a, b) => a * b,
    'div': (a, b) => {
        if (b === 0) {
            throw new Error("Division by zero is generally allowed, but let's not call the infinity");
        } else return a / b}
};

const MAX_VALUE = 100000000;

function checkParameters(a: number, b: number) {
    if (a < MAX_VALUE * (-1))
        throw new Error(`${a} is too small, I'm not sure I can process numbers less than ${MAX_VALUE * (-1)} correctly`); 
    if (a > MAX_VALUE )
        throw new Error(`${a} is too big, I'm not sure I can process numbers greater than ${MAX_VALUE} correctly`); 
    if (b < MAX_VALUE * (-1))
        throw new Error(`${b} is too small, I'm not sure I can process numbers less than ${MAX_VALUE * (-1)} correctly`); 
    if (b > MAX_VALUE )
        throw new Error(`${b} is too big, I'm not sure I can process numbers greater than ${MAX_VALUE} correctly`); 
}

export default function compute (operation: string, a: number, b: number ) {
    checkParameters(a, b);

    const opFunc = operationDef[operation];
    if (!opFunc) throw new Error(`Operation '${operation}' is not supported`);

    return opFunc(a, b);
}