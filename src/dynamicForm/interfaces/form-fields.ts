export interface FormFields {
  name: string;
  label: string;
  type: "text" | "email" | "boolean" | "text-area" | "array-text";
  visible: boolean;
  default?: any;
  options?: string[];
}
