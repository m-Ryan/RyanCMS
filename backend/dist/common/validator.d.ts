export interface ValidateRuleOptions {
}
export interface Validator {
    validate(attribute: string, value: any, options?: ValidateRuleOptions): string | null | Promise<string | null>;
}
export declare type ValidateRule = [string[], string, ValidateRuleOptions];
export declare type CallbackValidateRule = [string[], (attr?: string, value?: any, params?: ValidateRuleOptions) => string | null, ValidateRuleOptions];
