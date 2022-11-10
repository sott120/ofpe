import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle` 
${reset};
h1, .h1 {
  font-size: calc(1.375rem + 1.5vw) ;
}
h2, .h2 {
  font-size: calc(1.325rem + 0.9vw) ;
}
h3, .h3 {
  font-size: calc(1.3rem + 0.6vw) ;
}
h4, .h4 {
  font-size: calc(1.275rem + 0.3vw) ;
}
.label, label{
    vertical-align: sub;
}
`;

export default GlobalStyles;
