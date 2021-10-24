
 <?php 
  
          if ( isset($_POST['submit'])){
            $name = $_POST["name"];
            $email = $_POST["email"];
            $yes = $_POST["flexRadioDefault1"];
            $no = $_POST["flexRadioDefault2"];
            $comment= $_POST["comment"];
           
            echo 'Thank You for your time';
            
            $fp = fopen('data.txt', 'w');//open file in write mode  
            fwrite($fp, ['$name','$email', '$yes', '$no', '$comment']);  
            fclose($fp);  
  
            echo "File written successfully";  
            }
  ?>
