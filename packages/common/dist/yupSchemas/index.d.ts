import * as yup from "yup";
export declare const newPasswordSchema: yup.ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    newPassword: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
}>, Record<string, any>, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    newPassword: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
}>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    newPassword: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
}>>>;
export declare const validUserSchema: yup.ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    email: yup.StringSchema<string | undefined, Record<string, any>, string | undefined>;
    password: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
}>, Record<string, any>, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    email: yup.StringSchema<string | undefined, Record<string, any>, string | undefined>;
    password: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
}>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    email: yup.StringSchema<string | undefined, Record<string, any>, string | undefined>;
    password: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
}>>>;
