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
/* well i guess i need to write something that will determine the css conical gradient's angle */
/* function generateAngledConicalGradient(){
  let gDiv = document.getElementById("l-u-bg");
  let width = gDiv.offsetWidth;
  let height = gDiv.offsetHeight;
  // assuming that width > height
  let angle = Math.atan(width/height) * (180/Math.PI);
  console.log(angle)
  gDiv.style.background = "conic-gradient(from " + angle + "deg at 90% 10%, rgba(34,193,195,1) 0% 49%, rgba(253,187,45,1) 50% 50%, rgba(34,193,195,1) 51% 100%)";
} */
/* expecting a 1:1 aspect ratio */
/* function IncreaseBrushSize(){
  return (<>
  <svg
      width="83%"
      height="100%"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg" >
        <rect id="increase-brush-circle" width="100%" height="100%" x="0" y="0" fill="red" />
        <defs>
          <radialGradient id="increase-brush-gradient">           
          </radialGradient>
        </defs>        
    </svg>
  </>)
} */



function updateSVGBOX() {
  let parentSVG = document.getElementById('svg-init');
  let width = window.innerWidth;
  let height = window.innerHeight/10;
  let viewX, viewY;
  if(width > height) {
    viewX = 100;
    viewY = 100 * (width/height);
  } else {
    viewX = 100 * (width/height);
    viewY = 100;
  }
  parentSVG.setAttribute("viewBox", `0 0 ${viewY} ${viewX}`);
}

function cloneSVGs(){
  updateSVGBOX();
  const divs = 32;
  const sec = 4;
  aniLength = '4s';
  let initSVGRect1 = document.getElementById('moving-rect-1');
  let initSVGRect2 = document.getElementById('moving-rect-2');
  let parentSVG = document.getElementById('svg-init');
  getCSSRule('#moving-rect-1').style.width = 100/divs + "%";
  getCSSRule('#moving-rect-2').style.width = 100/divs + "%";
  for (let i = 0; i < divs; i++){
    let newSVGRect1 = initSVGRect1.cloneNode();
    let newSVGRect2 = initSVGRect1.cloneNode();
    newSVGRect1.setAttribute("x", (100/divs)*(i+1) + "%");
    newSVGRect2.setAttribute("x", (100/divs)*(i+1) + "%");
    let animationDelay = (sec/divs)*(i+1);
    newSVGRect1.style.animation = `${aniLength} linear ${ animationDelay + "s"} infinite moveRect1`;
    newSVGRect2.style.animation = `${aniLength} linear ${ animationDelay + "s"} infinite moveRect2`;
    parentSVG.appendChild(newSVGRect1);
    parentSVG.appendChild(newSVGRect2);
    // create svg wrapper
    /* let newSVGWrapper = document.createElementNS(xmlns,'svg');
    newSVGWrapper.id = "svg-wrapper-"+i+1;
    newSVGWrapper.style.width = 100/divs + "%";
    newSVGWrapper.style.animationDelay = (sec/divs)*i + "s";
    wrapper.appendChild(newSVGWrapper);
    //create svg texture
    let newSVGTexture = document.createElementNS(xmlns,'rect');
    newSVGTexture.setAttribute("width", "100%");
    newSVGTexture.setAttribute("height", "100%");
    newSVGTexture.setAttribute("fill", "red");
    newSVGWrapper.appendChild(newSVGTexture); */
  }
  initSVGRect1.style.animation = `${aniLength} linear 0s infinite moveRect1`;
  initSVGRect2.style.animation = `${aniLength} linear 0s infinite moveRect2`;
}

/* const xmlns = "http://www.w3.org/2000/svg";
  const wrapper = document.getElementById("l-u-bg");
  const divs = 20;
  const sec = 4;
  for (let i = 0; i < divs; i++){
    // create svg wrapper
    let newSVGWrapper = document.createElementNS(xmlns,'svg');
    newSVGWrapper.viewBox = "0 0 100 500"
    newSVGWrapper.width = "100%";
    newSVGWrapper.height = "100%";
    newSVGWrapper.classList.add("MovingBGDivs");
    newSVGWrapper.id = "svg-wrapper-"+i+1;
    newSVGWrapper.style.width = 100/divs + "%";
    newSVGWrapper.style.animationDelay = (sec/divs)*i + "s";
    wrapper.appendChild(newSVGWrapper);
    //create svg texture
    let newSVGTexture = document.createElementNS(xmlns,'rect');
    newSVGTexture.setAttribute("width", "100%");
    newSVGTexture.setAttribute("height", "100%");
    newSVGTexture.setAttribute("fill", "red");
    newSVGWrapper.appendChild(newSVGTexture);
  } */
/* on document load */
document.addEventListener("DOMContentLoaded", function () {
  cloneSVGs();
});
document.addEventListener("resize", function () {
  cloneSVGs();
});

