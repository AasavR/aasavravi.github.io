<html>
<body>
     
  <?php
  $filename = "http://www.lasavo.org/login.php";
  fopen( $filename, "r");
     $content =  ['$name' , '$email', '$yes', '$no', '$comment'];
     echo $_POST["inp_name", "inp_email", "flexRadioDefault1", "flexRadioDefault2", "inp_comments"];
  fread($content)
     $filename2 =  fopen ( "http://www.lasavo.org/abc.php", "w+");
    fwrite ( $filename2 , $content)
    fclose($handle);
  ?>
     
     </body>
</html>
     
