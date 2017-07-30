var order = [];
var showtable = [];
var guest = [];
var index=0;
var temp=0;
var del_id=0;
var price=0;
var quality = $('.quality');
// if click any coffee button
function down(index){
    var name = document.getElementsByTagName('table')[index+1]; //first table is price list so we add one
    $("#divtwo" + index).click(function(){
        $(name).hide();
    });
    showtable.splice(index,1,999);
}


function AddPrice(item) {
    if(item.match("blue mountain"))
        price+=100;
    else if(item.match("cappuccino"))
        price+=80;
    else if(item.match("latte"))
        price+=75;
    else if(item.match("mocha"))
        price+=90;
    else if(item.match("mandelin"))
        price+=100;
    else if(item.match("lrish coffee"))
        price+=95;
    else if(item.match("french coffee"))
        price+=110;
    else if(item.match("jamaican coffee"))
        price+=90;
    else if(item.match("espresso"))
        price+=120;
    else if(item.match("flat white"))
        price+=60;
    else if(item.match("water"))
        price+=0;
    else if(item.match("milk tea"))
        price+=55;
}
function empty() {
    // array clear
    order.length = 0;
}
function del(del_id) {
    $("#div" + del_id).hide();
    console.log("id = " + del_id);
    console.log("temp = " + temp);
    var subitem = order[del_id - temp];
    order.splice(del_id - temp, 1,999);
    if(subitem.match("blue mountain"))
        price-=100;
    else if(subitem.match("cappuccino"))
        price-=80;
    else if(subitem.match("latte"))
        price-=75;
    else if(subitem.match("mocha"))
        price-=90;
    else if(subitem.match("mandelin"))
        price-=100;
    else if(subitem.match("lrish coffee"))
        price-=95;
    else if(subitem.match("french coffee"))
        price-=110;
    else if(subitem.match("jamaican coffee"))
        price-=90;
    else if(subitem.match("espresso"))
        price-=120;
    else if(subitem.match("flat white"))
        price-=60;
    else if(subitem.match("water"))
        price-=0;
    else if(subitem.match("milk tea"))
        price-=55;
}
$(".coffee").click(function() {
    var str = "";
    str = "<div style='text-align: left' id = div" + del_id + ">"+ $(this).val() + "<input style='float:right' type='button' value='clean' onclick='del(" + del_id + ")' >" + "</div>"
    AddPrice($(this).val());
    order.push($(this).val());
    quality.find('tr').append(str);
    del_id++;

    });
// if click the button "confirm"
$('#confirm').click(function () {
    var tablenumber = $('input[name=tablenumber]').val();
    //avoid some tag attack
    if(tablenumber.match('<')!==null) {
        alert("now slow down your breath and follow me ~");
        alert("are you ready?");
        alert("i just ask u don't need to answer XD");
        for(var i=1;i<=10;i++)
            alert("say i will not attack quefon website " + i);
        alert("ok");
        alert("now listen to me");
        alert("don't attack me bitch and quick get out my website!!");
        window.location.replace("http://www.twword.com/wiki/%E5%80%AB%E7%90%86%E9%81%93%E5%BE%B7"); //not assign
        //window.location.href="https://www.pornhub.com/";
    }
    if(showtable.length==0){
        guest.push(tablenumber);
        showtable.push(tablenumber);
    }
    else {
        for(var i=0;i<=showtable.length;i++){
            if(showtable[i] == tablenumber) {
                alert("sorry~~this table have someone in sit");
                return;
            }
        }
        guest.push(tablenumber);
        showtable.push(tablenumber);
    }
    if(tablenumber=='') {
        alert("please input tablenumber first");
        return;
    }
    if(tablenumber<1 || tablenumber >100) {
        alert("please input again....");
        return;
    }
    if(order.length==0){
    	alert("sorry~you need to order at least one coffee...");
    	return;
    }

    var newQuality = $('<table class="quality"><tr style="color:black"></tr></table>');

    quality.find('tr').append(tablenumber+'桌' + '<br>');
    /*go out*/
    var str2="";
    str2 = "<div id = divtwo" + index + ">" + "<input style='color:green' type='button' value='down' onclick='down(" + index + ")' >" + "</div>"
    quality.find('tr').append(str2);
    if(price!=0)
        quality.find('tr').append('總共是'+price+'元');
    else
        quality.find('tr').append('free');
    $('#footer').append(newQuality);
    quality = newQuality;
    temp = del_id;
    ++index;
    //clean the unnecessary element on the order_table
    /*while(order.indexOf("999")!==-1) {
        var position = order.indexOf("999");
        console.log(position);
        order.splice(position,1);
    }*/
    //use to DEBUG
    for(var i=0;i<order.length;i++) {
        console.log('order[' + i + '] = '+ order[i]);
    }
    // push value on database
    //datatype can choose xml, html, script, json, jsonp, text
    const URLs = "database.php";  //for localhost
    //const URLs = "mysqli.php";  //for ccu server
    $.ajax({
        url: URLs,
        data: { number: order.length, order: order, tablenumber: tablenumber ,price: price},
        type:"POST",
        dataType:'text',
        success: function(text){
            alert("success");
            console.log("response:" + text);
        },

        error:function(xhr, ajaxOptions, thrownError){
            alert('ajax error');
            alert(thrownError);
        }
    });
    price=0;
    empty();
});
