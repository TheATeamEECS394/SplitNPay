function Receipt(arrayOfitems){
	this.items = arrayOfitems;
	this.tip  = 0.15;

	Receipt.prototype.toString = function(){
		/*
		var tip = .15;
		var subtotal = 0;
		for(i=0;i<this.items.length;i++){
			subtotal += this.items[i].price;
		}
		var tableStart = "<tbody><tr><th>Quantity</th><th>Description</th><th>Price</th><th>Payees</th></tr>";
		var tableBody = "";
		var tiptotal = tip*subtotal;
		var tableEnd = "<tr id=\"subtotal\"><td></td><td>Subtotal</td><td>"+subtotal+"</td><td></td></tr>"+
		"<tr id=\"subtotal\"><td></td><td>Tip\("+tip+"\)</td><td>"+tiptotal+"</td><td></td></tr>"+
		"<tr id=\"subtotal\"><td></td><td>Total</td><td>"+(tiptotal+subtotal)+"</td><td></td></tr></tbody>";

		for(i=0;i<this.items.length;i++)
		{
			tableBody = tableBody + this.items[i];
		}
		//*/
		//return tableStart + tableBody + tableEnd;
		return "deprecated";
	}

	this.GetCalculatedValues = function(){
		values = new Array();
		var subtotal = 0;
		for(i=0;i<this.items.length;i++){
			subtotal += this.items[i].price;
		}
		values[0] = subtotal;
		values[1] = this.tip;
		var tiptotal = this.tip*subtotal;
		values[2] = tiptotal;
		values[3] = subtotal+tiptotal;
		return values;
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
	return false;
}

receiptItem.prototype.toString = function(){
var rowString = "<tr id=\"ReceiptItem\"> <td>" + this.quantity + "</td>" +
				"<td>" + this.description +"</td>" +
				"<td>" + this.price + "</td>" + 
				"<td>" + this.payees + "</td>" + "</tr>";
				return rowString;
			}
}

function ReloadTable(){
	var xmlhttp;
	if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
	  xmlhttp=new XMLHttpRequest();}
		xmlhttp.onreadystatechange=function(){
			if (xmlhttp.readyState==4 && xmlhttp.status==200){
				table = $('#MASTER')[0];
				for(var i=0;i<table.rows.length-4;i++){
					trow = table.rows[i+1];
					r_item = m.items[i];
					trow.cells[0].innerHTML=r_item.quantity;
					trow.cells[1].innerHTML=r_item.description;
					trow.cells[2].innerHTML=r_item.price;
					trow.cells[3].innerHTML=r_item.payees;
				}
				var totals = m.GetCalculatedValues();
				trow=table.rows[4];
				trow.cells[2].innerHTML = ""+totals[0];
				trow=table.rows[5];
				trow.cells[1].innerHTML = "Tip("+totals[1]+")";
				trow.cells[2].innerHTML = totals[2];
				trow=table.rows[6];
				trow.cells[2].innerHTML = totals[3];
			}
		}
				
	xmlhttp.open("GET","",true);
	xmlhttp.send();
}

function GenerateBaseTable(tbody) {
	var rows = m.items.length;
	var cols = 4;
    for (var r = 1; r <= rows; r++) {
        var trow = $("<tr class=\"ReceiptItem\">");
        for (var c = 1; c <= cols; c++) {
            $("<td>").appendTo(trow);
        }
        trow.appendTo(tbody);
    }
	var celltext = "";
	trow = $("<tr id=\"subtotal\">");
	for (var i=0;i<4;i++){
		var data = $("<td>");
		if(i==1){celltext = "Subtotal";}else{celltext="";}
		data.text(celltext).appendTo(trow);
	}
	trow.appendTo(tbody);
	trow = $("<tr id=\"tip\">");
	for (var i=0;i<4;i++){
		var data = $("<td>");
		if(i==1){celltext = "Tip(0.15)";}else{celltext="";}
		data.text(celltext).appendTo(trow);
	}
	trow.appendTo(tbody);
	trow = $("<tr id=\"total\">");
	for (var i=0;i<4;i++){
		var data = $("<td>");
		if(i==1){celltext = "Total";}else{celltext="";}
		data.text(celltext).appendTo(trow);
	}
	trow.appendTo(tbody);
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