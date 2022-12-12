import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import digital from './../fonts/digital_b.ttf';

const GlobalStyles = createGlobalStyle` 
${reset};
@font-face {
        font-family: 'digital';
        src: local('digital'), local('digital');
        font-style: normal;
        src: url(${digital}) format('truetype');
  }
body{
    font-family: 'Noto Sans KR', sans-serif;
    line-height: 1.3rem;
    color:#333;
  }
h1, .h1 {
  font-size: calc(1.375rem + 1.5vw) ;
}
h2, .h2 {
  font-size: calc(1.325rem + 0.9vw) ;
}
h3, .h3 {
  font-size: calc(1.3rem + 0.6vw) ;
  line-height: 1.2em;
}
h4, .h4 {
  font-size: calc(1.275rem + 0.3vw);
  font-weight: 500;
}
.label, label{
    vertical-align: sub;
}
`;

export default GlobalStyles;
