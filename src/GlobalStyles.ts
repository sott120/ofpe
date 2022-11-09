import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle` 
${reset};
.h1, h1 {
    font-size: calc(1.375rem + 1.5vw);
}
.h3, h3 {
    font-size: calc(1.3rem + .6vw);
}
.label, label{
    vertical-align: sub;
}
`;

export default GlobalStyles;
