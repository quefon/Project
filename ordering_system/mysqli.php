<?php
    #receive some argument
    $tablenumber = $_POST['tablenumber'];
    $order = $_POST['order'];
    $number = $_POST['number'];
    $price = $_POST['price'];

    foreach($order as $index => $value) {
        if ($value == '999') {
            unset($order[$index]);
            $number-=1;
        }
    }
    $order=array_values($order);

    echo 'tablenumber = '.$tablenumber;
    foreach($order as $index => $value){
        echo '['.$index.']'.'：=>'.$value.'<br />';
    }
    echo 'number = '.$number;
    echo 'price = '.$price;
    #echo back to the client
    #give response to ajax and these will shows up in console

    #now we get start to push data in to quefon's database
    #server ＝> hcf103u@csie1.cs.ccu.edu.tw
    $db_host = "mysql.cs.ccu.edu.tw";
    $db_user = "hcf103u";
    $db_pass = "wen50521";
    $db_select = "hcf103u_project";
    //$dbconnect = 'mysql:host='.$db_host.';dbname='.$db_select;
    $dbgo = new mysqli($db_host,$db_user,$db_pass,$db_select);
    if($dbgo->connect_errno){
        echo "Failed to connect to MYSQL:(".$dbgo->connect_errno.")".$dbgo->connect_error;
    }

    #insert my_order
    $sql_insert = "INSERT INTO myorder (tablenumber,price) VALUES ($tablenumber, $price)";
    $inserert = $dbgo->prepare($sql_insert);
    $inserert->execute();

    #get value of the next auto increment
    $id = $dbgo->insert_id;

    #insert customer
    $sql="";
    foreach($order as $index => $value) {
        $sql = $sql."(".$id.","."'".$value."'".")";
        if($index+1!=$number) $sql.=',';
    }
    echo "sql = ".$sql;
    $sql_insert = "INSERT INTO customer (id,coffee) VALUES ".$sql;
    echo "sql_insert = ".$sql_insert;
    $inserert = $dbgo->prepare($sql_insert);
    $inserert->execute();

    #close
    $dbgo->close();
?>
