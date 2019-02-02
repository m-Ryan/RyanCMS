import { ValidateRuleOptions, Validator } from '../validator';
export declare class RequiredValidator implements Validator {
    validate(attribute: string, value: any, options?: ValidateRuleOptions): string | Promise<string | null> | null;
}
