import { CallbackValidateRule, ValidateRule, Validator } from './validator';
export declare abstract class Model {
    validators(): {
        [index: string]: Validator;
    };
    abstract rules(): ValidateRule[] | any[] | CallbackValidateRule[];
    abstract attributeLabels(): {
        [attr: string]: string;
    };
    setAttributes(data: any): void;
    validate(): Promise<void>;
}
