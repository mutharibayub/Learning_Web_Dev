const wrapCount = 100;
const buttonDim = 50;
const layerDim = 8;
const moveDelay = 10;
const cone = false;


var btn = document.getElementById("inner");
var ele = btn.parentNode;
btn.style.width = btn.style.height = buttonDim+"px";
ele.innerHTML = wrapInDivs(ele.innerHTML, wrapCount);
console.log(ele.innerHTML);
btn = document.getElementById("inner");
ele = btn.parentNode;
for(i=0;ele.tagName=="DIV";i++) {
    ele.style.background = !(i%2)?"black":"white";
    ele.style.padding = cone?0:(layerDim/2|0)+"px";
    ele.style["border-radius"] = "100%";
    ele.style["width"] = i*layerDim+buttonDim+"px";
    ele.style["height"] = i*layerDim+buttonDim+"px";
    ele = ele.parentNode;
    console.log(ele);
}

btn.onclick = async _=>{
    invertColor(btn);
};

function wrapInDivs(html, count){
    let [before, after] = ["",""];
    console.log(`before: ${before}`);
    console.log(`after: ${before}`);
    for(let i=0;i<count;i++) {
        before += "<div>";
        after += "</div>";
    }
    return before+html+after;
}

async function invertColor(element) {

    if(element.style.background=="black") {
        element.style.background = "white";
    } else {
        element.style.background = "black";
    }
    if(element.tagName == "BUTTON") {
        if(element.style.color == "white") {
            element.style.color = "black";
        } else {
            element.style.color = "white";
        }
    }
    if(element.parentNode.tagName == "DIV") {
        setTimeout(invertColor, moveDelay, element.parentNode);
    }
}