/* this is a helper function i've used previously to mutate the css rule */
function getCSSRule(ruleName) {
  ruleName = ruleName.toLowerCase();
  var result = null;
  var find = Array.prototype.find;

  find.call(document.styleSheets, styleSheet => {
      result = find.call(styleSheet.cssRules, cssRule => {
          return cssRule instanceof CSSStyleRule 
              && cssRule.selectorText.toLowerCase() === ruleName;
      });
      return result != null;
  });
  return result;
}

/* https://codepen.io/wg3design/pen/ZKzqZj was very helpful!!*/
/* https://github.com/ondras/rot.js this is source */
/*  */

// Converts a #ffffff hex string into an [r,g,b] array
function h2r(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
  ] : null;
};

// Inverse of the above
function r2h(rgb) {
  return "#" + ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1);
};

function interpolateColor(color1, color2, factor) {
  if (arguments.length < 3) { factor = 0.5; }
  var result = color1.slice();
  for (var i=0;i<3;i++) {
    result[i] = Math.round(result[i] + factor*(color2[i]-color1[i]));
  }
  return result;
};


/* it would seem that I need to have the span tags tightly hugging the text */

function generateSteppedTextGradient(){
  let textLength = document.getElementById("l-u-text").innerHTML.length/5;
  let colour2 = "rgb(187,45,100) ";
  let stGrad = "linear-gradient(90deg, ";
  let perc = 0;
  let percJump = 100/textLength;
  for (let i = 0; i < textLength-1; i++){
    let newCol = interpolateColor([34,193, 195],[187,45,100], i * (1/textLength));
    let newColStr = "rgba("+newCol[0]+", "+newCol[1]+", "+newCol[2]+", 1) "+ perc +"% "+ (perc+percJump) +"%, ";
    perc += percJump;
    /* let col1Start = colour1 + perc + "%, ";
    perc += percJump;
    let col1End = colour1 + perc + "%, ";
    let col2Start = colour2 + perc + "%, ";
    perc += percJump;
    let col2End = colour2 + perc + "%, "; */
    /* console.log(perc) */
    stGrad = stGrad.concat(newColStr);
  }
  stGrad = stGrad.concat(colour2 + perc +"% 100%", " )");

  console.log(stGrad);
  
/*   let stGrad = "linear-gradient(90deg, white, "+ grText.repeat(textLength-1) +"black)" */
  /* getCSSRule('#l-u-text').style.background = "linear-gradient(90deg, white, black)"; */
  getCSSRule('#l-u-text').style.background = stGrad;
  getCSSRule('#l-u-text').style.backgroundClip = "text";
}

/* on document load */
document.addEventListener("DOMContentLoaded", function () {
  generateSteppedTextGradient();
});

