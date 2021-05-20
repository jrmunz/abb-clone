/// <reference types="react" />
interface RCProps {
    children: (data: {
        submit: (values: any) => Promise<null>;
        loading: boolean;
        data: any;
    }) => JSX.Element | null;
}
export declare const RegisterController: (props: RCProps) => JSX.Element | null;
export {};
