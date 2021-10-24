<html>
<body>
  
 <?php 
  
          if ($_SERVER['REQUEST_METHOD'] == 'POST'){
            $name = $_POST["name"];
            $email = $_POST["email"];
            $yes = $_POST["flexRadioDefault1"];
            $no = $_POST["flexRadioDefault2"];
            $comment= $_POST["comments"];
           
            echo 'Thank You for your time';
            }
  ?>
</body>
</html>
