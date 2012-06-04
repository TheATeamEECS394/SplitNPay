function Receipt(arrayOfitems){
    this.items = arrayOfitems;
    this.tip  = 0.15;

    Receipt.prototype.toString = function(){
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
this.TogglePayee = function(payee){
	var already_has_payee = false;
	var splice_me = 0;
	for(var i = 0;i < this.payees.length;i++){
		if(payee == this.payees[i]){
			splice_me = i;
			already_has_payee = true;
		}
	}
	if(!already_has_payee){
		this.payees.push(payee);
	}
	else
	{
		this.payees.splice(splice_me,1);
	}
}
receiptItem.prototype.toString = function(){
var rowString = "<tr id=\"ReceiptItem\"> <td>" + this.quantity + "</td>" +
                "<td>" + this.description +"</td>" +
                "<td>" + this.price + "</td>" + 
                "<td>" + this.payees + "</td>" + "</tr>";
                return rowString;
            }
}

	function CheckCompleteness(){
		var iscomplete = true;
		for(var i=0; i<m.items.length; i++){
			if(m.items[i].payees.length == 0){
				iscomplete = false;
			}
		}
		if(iscomplete){
			$('#AllItemsClaimed').toggleClass("incomplete",false);
			$('#AllItemsClaimed').toggleClass("complete",true);
			$('#AllItemsClaimed')[0].innerHTML="The receipt is complete";
		}else{
			$('#AllItemsClaimed').toggleClass("incomplete",true);
			$('#AllItemsClaimed').toggleClass("complete",false);
			$('#AllItemsClaimed')[0].innerHTML="The receipt is not complete";
		}
	}

function ReloadTable(){
    var xmlhttp;
    if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();}
    table = $('#MASTER')[0];
	var tlength = table.rows.length;
    for(var i=0;i<tlength-4;i++){
        trow = table.rows[i+1];
        r_item = m.items[i];
        trow.cells[0].innerHTML=r_item.quantity;
        trow.cells[1].innerHTML=r_item.description;
        trow.cells[2].innerHTML=r_item.price;
        trow.cells[3].innerHTML=r_item.payees;
		
    }
    var totals = m.GetCalculatedValues();
    trow=table.rows[tlength-3];
    trow.cells[2].innerHTML = ""+totals[0];
    trow=table.rows[tlength-2];
    trow.cells[1].innerHTML = "Tip("+totals[1]+")";
    trow.cells[2].innerHTML = totals[2];
    trow=table.rows[tlength-1];
    trow.cells[2].innerHTML = totals[3];
				
	$('#Ptotal')[0].innerHTML = GetPersonalSubtotal(current_payee);
				
	CheckCompleteness();
	
    xmlhttp.open("GET","",true);
    xmlhttp.send();
}

function CreateRow(){
        var trow = $("<tr class=\"ReceiptItem\">");
        for (var c = 1; c <= 4; c++) {
			var tdata = $("<td>");
            tdata.appendTo(trow);
        }
		return trow;
}

function GenerateBaseTable(tbody) {
	tbody.innerHTML = "";
	var head_row = $("<tr><th>Quantity</th><th>Description</th><th>Price</th><th>Payees</th></tr>");
	head_row.appendTo(tbody);
    var rows = m.items.length;
    for (var r = 1; r <= rows; r++) {
		var trow = CreateRow();
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

function AddRow(){
	/*
	var new_row = CreateRow();
	$('#ReceiptItem:last').after(new_row);
	//*/
	 var new_quantity = prompt("Enter Quantity","");
	 var new_descript = prompt("Enter Description","");
	 var new_price = prompt("Enter Price","");
	 var new_item = new receiptItem(parseFloat(new_quantity),new_descript,parseFloat(new_price));
	 m.items.push(new_item);
	 //*
	GenerateBaseTable($('#MASTER')[0]);
	ReloadTable();
	//*/
	AddReceiptItemClickFunction();
	 
}

function AddReceiptItemClickFunction(){
	$('.ReceiptItem').click(function(){
		m.items[this.rowIndex-1].TogglePayee(current_payee);
		ReloadTable();
	})
}

function DeleteRow(){
	if(m.items.length > 0){
		var invalid_index = true;
		var del_index = 0;
		while(invalid_index){
			del_index = parseInt(prompt("Enter the index of the row you want to delete","Choose index 1-"+m.items.length));
			if(del_index >= 0 & del_index <= m.items.length){
				invalid_index = false;
				m.items.splice(del_index-1,1);
			}else{
				alert("Invalid Index");
			}
		}
		GenerateBaseTable($('#MASTER')[0]);
		ReloadTable();
		AddReceiptItemClickFunction();
	}else{
		alert("There are no items to delete");
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
//*/