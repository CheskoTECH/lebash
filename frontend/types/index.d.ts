declare module '*.module.css';

declare module '*.png';
declare module '*.svg' {
  const content: DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >;
  export default content;
}
