type Operation = "+" | "-" | "*" | "/";
const operationDef: {[level in Operation]: number} = {
    '+': 0,
    '-': 1,
    '*': 2,
    '/': 3
};
const MAX_VALUE = 100000000;

function isValidOperation(op: Operation) {
    if (!(op in operationDef))
        throw new Error(`Operation '${op}' is not valid`);
}

function numberIsNotTooSmall(a: number) {
    if (a < MAX_VALUE * (-1))
        throw new Error(`${a} is too small, I'm not sure I can process numbers less than ${MAX_VALUE * (-1)} correctly`); 
}
function numberIsNotTooBig(a: number) {
    if (a > MAX_VALUE )
        throw new Error(`${a} is too big, I'm not sure I can process numbers greater than ${MAX_VALUE} correctly`); 
}

function checkParameters(operation: string, a: number, b: number) {
    isValidOperation(operation as Operation);
    numberIsNotTooSmall(a);
    numberIsNotTooSmall(b);
    numberIsNotTooBig(a);
    numberIsNotTooBig(b);
}

export default function compute (operation: string, a: number, b: number ) {
    checkParameters(operation, a, b);
    
    switch (operation) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': {
            if (b === 0) {
                throw new Error("Division by zero is generally allowed, but let's not call the infinity");
            }
            return a / b;
        }
    }

}