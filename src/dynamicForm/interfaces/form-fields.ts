export interface IFormFields {
  name: string;
  label: string;
  type: "text" | "email" | "boolean" | "text-area" | "array-text" | "file" | "date";
  visible: boolean;
  default?: any;
  defaultValue?: string;
  options?: string[];
}
