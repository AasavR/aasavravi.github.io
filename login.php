<html>
<body>
  
 <?php 
  
          if ($_SERVER['REQUEST_METHOD'] == 'POST'){
            $name = $_POST["inp_name"];
            $email = $_POST["inp_email"];
            $yes = $_POST["flexRadioDefault1"];
            $no = $_POST["flexRadioDefault2"];
            $comment= $_POST["inp_comments"];
           
            echo 'Thank You for your time';
            }
  ?>
</body>
</html>
