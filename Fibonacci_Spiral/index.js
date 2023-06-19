let x = 1000;
let y = 1000;
const count = 17;
const delay = 50;

let dir = [1,0];
let [num1, num2] = [1,1]

var body = document.getElementById("main");

for(i=0;i<count;i++) {
    let ele = document.createElement("DIV");
    
    let borderRadius = [0,0,0,0];
    borderRadius[convertToBorderRadiusIndex(dir)] = 100;
    ele.style["border"]="none";
    ele.style.width = ele.style.height = num1+"px";
    ele.style["border-"+(dir[0]?"right":"left")] = "solid";
    ele.style["border-"+(dir[1]?"top":"bottom")] = "solid";
    ele.style["border-radius"] = borderRadius.map(x=>x+"%").join(" "); 
    ele.style.position = "absolute";
    ele.style.left = `${x}px`;
    ele.style.top = `${y}px`;
    ele.className = "rendered";

    switch(dir[0]*2+dir[1]){
        case 0:
            y-=num2;
            break;
        case 1:
            x+=num1;
            break;
        case 3:
            x+=(num1-num2);
            y+=num1;
            break;
        case 2:
            x-=num2;
            y+=(num1-num2);
            break;
    }

    body.innerHTML += ele.outerHTML;

    dir.reverse();
    dir[1]^=1;
    [num1, num2] = [num2, num1+num2];
}

let btn = document.getElementById("btn");
btn.onclick = async _=>{
    setTimeout(invertColor, delay, document.getElementsByClassName("rendered")[0]);
};

function convertToBorderRadiusIndex(dir) {
    let tmp = [...dir];
    if(tmp[0]){
        tmp[1]^=1;
    }
    return ((tmp[0]*2+tmp[1])+3)%4;
}

async function invertColor(ele){
    if(ele.style["border-color"]=="black") { 
        ele.style["border-color"]="white";
    } else {
        ele.style["border-color"]="black";
    }
    if(ele.tagName == "DIV") {
        setTimeout(invertColor, delay, ele.nextElementSibling);
    }
}