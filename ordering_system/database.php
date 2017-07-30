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
	$dbconnect = 'mysql:host='.$db_host.';dbname='.$db_select;

	try{
    	$dbgo = new PDO($dbconnect, $db_user, $db_pass);
        $dbgo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	}
    // Catch any errors
	catch(PDOException $e){
        echo 'Connection failed: ', $e->getMessage();
		exit(1);
	}
	#get value of the next auto increment
	$sql_insert="select AUTO_INCREMENT from information_schema.tables where table_schema='hcf103u_project' and table_name='myorder'";
	$insert = $dbgo->prepare($sql_insert);
	$insert->execute();
	$id = $insert->fetchColumn();

	#insert my_order
	$sql_insert = "INSERT INTO myorder (tablenumber,price) VALUES ($tablenumber, $price)";
	$inserert = $dbgo->prepare($sql_insert);
	$inserert->execute();

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
?>
