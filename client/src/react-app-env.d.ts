/// <reference types="react-scripts" />

// カスタム型を定義
declare module "*.png" {
  const value: string;
  export default value;
}
