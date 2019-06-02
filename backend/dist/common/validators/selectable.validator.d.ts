import { ValidateRuleOptions, Validator } from '../validator';
export declare class SelectableValidator implements Validator {
    validate(attribute: string, value: any, option?: ValidateRuleOptions): string | Promise<string | null> | null;
}
