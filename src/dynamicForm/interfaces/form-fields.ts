export interface FormFields {
  name: string;
  label: string;
  type: "text" | "email" | "boolean" | "text-area" | "array-text" | "file";
  visible: boolean;
  default?: any;
  defaultValue?: string;
  options?: string[];
}
