var btn = document.getElementById("btn");
var light = document.getElementById("light");
function toggleBtn() {
  btn.classList.toggle("active");
  light.classList.toggle("on");
}


function showDiv() {
	document.getElementById('alertDiv').style.display = "block";
 }