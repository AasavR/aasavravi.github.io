<!DOCTYPE html>
<html>
 <body>
 <?php 
  
          if ( isset($_POST['submit'])) {
            $name = $_POST['name'];
            $email = $_POST['email'];
            $yes = $_POST['flexRadioDefault1'];
            $no = $_POST['flexRadioDefault2'];
            $comment= $_POST['comment'];
           
            echo 'Thank You for your time';
          
          }
            $fp = fopen('data.txt', 'w'); 
            $txt =  ('$name', '$email', '$yes', '$no', '$comment');
            fwrite($fp, $txt);  
            fclose($fp);  
  
            echo "File written successfully";  
            
            
  ?>
  
 </body>
</html>
