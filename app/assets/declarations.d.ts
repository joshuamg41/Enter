declare module '*.jpg';
declare module '*.jpeg';
declare module '*.png';
declare module '*.PNG';
declare module "*.svg" {
    import { SvgProps } from "react-native-svg";
    const content: React.StatelessComponent<SvgProps>;
    export default content;
  }