function Receipt(arrayOfitems){
this.items = arrayOfitems;

Receipt.prototype.toString = function(){
	var tip = .15;
	var subtotal = 0;
	for(i=0;i<this.items.length;i++){
		subtotal += this.items[i].price;
	}
	var tableStart = "<table border=1><tr><th>Quantity</th><th>Description</th><th>Price</th><th>Payees</th></tr>";
	var tableBody = "";
	var tiptotal = tip*subtotal;
	var tableEnd = "<tr><td></td><td>Subtotal</td><td>"+subtotal+"</td><td></td></tr>"+
	"<tr><td></td><td>Tip\("+tip+"\)</td><td>"+tiptotal+"</td><td></td></tr>"+
	"<tr><td></td><td>Total</td><td>"+(tiptotal+subtotal)+"</td><td></td></tr></table>";

	for(i=0;i<this.items.length;i++)
	{
		tableBody = tableBody + this.items[i];
	}

	return tableStart + tableBody + tableEnd;
	}
}

function receiptItem(qty,des,p){
this.quantity = qty;
this.description = des;
this.price = p;
this.payees = new Array;

this.AddPayee = function(){
	var NewPayee = prompt("Enter the new Payees name:","Your name here");
	this.payees.push(NewPayee);
	this.innerHTML = this.toString();
	console.log(this.toString());
	alert("Payees include: "+this.payees+"innerHTML= "+this.innerHTML);
	return false;
}

receiptItem.prototype.toString = function(){
var rowString = "<tr> <td>" + this.quantity + "</td>" +
				"<td>" + this.description +"</td>" +
				"<td>" + this.price + "</td>" + 
				"<td>" + this.payees + "</td>" + "</tr>";
				return rowString;
			}
			
}

function ReloadRow(obj,r_item){
	var xmlhttp;
	if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
	  xmlhttp=new XMLHttpRequest();}
		xmlhttp.onreadystatechange=function(){
			if (xmlhttp.readyState==4 && xmlhttp.status==200){
				obj.innerHTML=r_item.toString();
				obj.setAttribute("id","selected");
				console.log(obj.parentNode.innerHTML.toString());
			}
		}
				
	xmlhttp.open("GET","",true);
	xmlhttp.send();
}

var payees = new Array();

var item1 = new receiptItem(1,"shrimp",30);
var item2 = new receiptItem(2,"steak",40);
var item3 = new receiptItem(1,"asparagus",10);

var receipt1 = new Array();
receipt1[0] = item1;
receipt1[1] = item2;
receipt1[2] = item3;

var m = new Receipt(receipt1);

