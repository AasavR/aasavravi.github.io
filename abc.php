<html>
<body>
     
  <?php
  $filename = "http://www.lasavo.org/login.php";
  fopen( $filename, "r");
     $content =  ['$name' , '$email', '$yes', '$no', '$comment'];
  fread($content)
     $filename2 =  fopen ( "http://www.lasavo.org/abc.php", "w+");
    fwrite ( $filename2 , $content)
    fclose($handle);
  ?>
     
     </body>
</html>
     
