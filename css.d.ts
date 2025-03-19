declare module "*.css" {
  const styles: { [key: string]: string };
  export default styles;
}

declare global {
  interface CSSStyleDeclaration {
    "--primary-color": string;
    "--secondary-color": string;
    "--accent-color": string;
    "--background-color": string;
    "--text-color": string;
    "--border-color": string;
    "--light-text-color": string;
  }
}
