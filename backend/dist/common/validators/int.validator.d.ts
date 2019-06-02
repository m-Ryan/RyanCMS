import { Validator } from '../validator';
export declare class IntValidator implements Validator {
    validate(attribute: string, value: any, callback?: (val: any, attr: string) => string): string | Promise<string | null> | null;
}
