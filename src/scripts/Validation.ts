export interface Validatable {
    value: string | number,
    required?: boolean,
    maxLength?: number,
    minLength?: number,
    max?: number,
    min?: number
}

export function validate(someInput: Validatable): boolean {
    let isValid = true;
    if (someInput.required) {
        isValid = isValid && someInput.value.toString().trim().length !== 0;
    }
    if (someInput.maxLength && typeof someInput.value === 'string') {
        isValid = isValid && someInput.value.trim().length <= someInput.maxLength;
    }
    if (someInput.minLength && typeof someInput.value === 'string') {
        isValid = isValid && someInput.value.trim().length >= someInput.minLength;
    }
    if (someInput.max && typeof someInput.value === 'number') {
        isValid = isValid && someInput.value <= someInput.max;
    }
    if (someInput.min && typeof someInput.value === 'number') {
        isValid = isValid && someInput.value >= someInput.min;
    }

    return isValid;
}