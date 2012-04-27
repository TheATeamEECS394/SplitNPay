function Receipt(arrayOfitems){
this.items = arrayOfitems;

Receipt.prototype.toString = function(){
	var tableStart = "<table border=1><tr><th>Quantity</th><th>Description</th><th>Price</th><th>Payees</th></tr>";
	var tableBody = "";
	var tableEnd = "</table>";

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
this.payees.push("Generic Payee");

this.AddPayee = function(){
	var NewPayee = prompt("Enter the new Payees name:","Your name here");
	this.payees.push(NewPayee);
	alert("Payees include: "+this.payees);
}

receiptItem.prototype.toString = function(){
var rowString = "<tr> <td>" + this.quantity + "</td>" +
				"<td>" + this.description +"</td>" +
				"<td>" + this.price + "</td>" + 
				"<td>" + this.payees + "</td>" + "</tr>";
				return rowString;
			}
			
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

