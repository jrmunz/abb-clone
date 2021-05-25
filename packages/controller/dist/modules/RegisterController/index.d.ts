import { MutationRegisterArgs } from "../../types/graphql";
interface RCProps {
    children: (data: {
        loading: boolean;
        submit: (values: MutationRegisterArgs) => Promise<null>;
    }) => JSX.Element;
}
export declare const RegisterController: (props: RCProps) => JSX.Element;
export declare const RegisterMutation: import("@apollo/client").DocumentNode;
export {};
