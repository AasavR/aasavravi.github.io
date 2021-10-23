<html>
<body>
     
  <?php
  $filename = "http://www.lasavo.org/login.php";
  $handle = fopen( $filename, "r");
  $contents = fread($handle, filesize($filename));
 <?php if (isset($_POST["inp_name"]))
{
  $d = $_POST["inp_name"];
  echo($d);
}
   ?>
  <?php  if (isset($_POST["inp_email"]))
{
  $d = $_POST["inp_email"];
  echo($d);
}
   ?>
 <?php if (isset($_POST["flexRadioDefault1"]))
{
  $d = $_POST["flexRadioDefault1"];
  echo($d);
}
   ?>
  <?php if (isset($_POST["flexRadioDefault2"]))
{
  $d = $_POST["flexRadioDefault2"];
  echo($d);
}
  
  fread( name"inp_name", email"inp_email", yes"flexRadioDefault1", no"flexRadioDefault2")
    fwrite ( name"inp_name", email"inp_email", yes"flexRadioDefault1", no"flexRadioDefault2")
    fclose($handle);
  ?>
