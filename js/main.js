var correctAns=0;


var button=document.querySelector("button");
var radio=document.querySelectorAll("input[type='radio']");
button.onclick=()=>{
for(var i=0; i<radio.length;i++){
if(radio[i].checked){if(radio[i].id!=correct[parseInt(radio[i].name)]){

radio[i].nextElementSibling.innerHTML=radio[i].nextElementSibling.innerHTML.fontcolor("red")

}else{correctAns++}

}
if(radio[i].id==correct[parseInt(radio[i].name)]){

radio[i].nextElementSibling.innerHTML=radio[i].nextElementSibling.innerHTML.fontcolor("green")

}


}
alert(`Az eredmenyed: ${((correctAns/(radio.length/4))*100).toFixed(2)}%`)
}