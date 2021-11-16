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


function generateSteppedTextGradients(){
  /* get all elements tagged with "step" class which need to have their gradients adjusted */
  let divsToStep = document.getElementsByClassName("step");
  /* for each element we then need to run the process that will convert it's gradient */
  for (let i = 0; i < divsToStep.length; i++){
    /* find the length of the inner text without the surrounding whitespace */
    let textLength = divsToStep[i].innerHTML.trim().length;
    /* then we need to find the matching gradient class name */
    let foundList = divsToStep[i].classList;
    /* let found = foundList.find(el => el.search(/grad/)); */
    console.log(foundList);
  }
  /* let textLength = document.getElementById("l-u-text").innerHTML.length;
  let colour2 = "rgb(187,45,100) ";
  let stGrad = "linear-gradient(90deg, ";
  let perc = 0;
  let percJump = 100/textLength;
  for (let i = 0; i < textLength-1; i++){
    let newCol = interpolateColor([34,193, 195],[187,45,100], i * (1/textLength));
    let newColStr = "rgba("+newCol[0]+", "+newCol[1]+", "+newCol[2]+", 1) "+ perc +"% "+ (perc+percJump) +"%, ";
    perc += percJump;
    stGrad = stGrad.concat(newColStr);
  }
  stGrad = stGrad.concat(colour2 + perc +"% 100%", " )");

  console.log(stGrad);
  getCSSRule('#l-u-text').style.background = stGrad;
  getCSSRule('#l-u-text').style.backgroundClip = "text"; */
}

/* on document load */
document.addEventListener("DOMContentLoaded", function () {
  generateSteppedTextGradients();
});

