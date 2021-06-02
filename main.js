var $teamSection = $(".team");
var $teamSlider = $(".teamSlider");
var $footerEmail = $("#email");
var $firstFooterList = $("#firstLi");
var $subscribeButton = $("#changeButton");
var $copywriters = $("#additional");

$teamSection.show();
$teamSlider.hide();
$copywriters.hide();


function getTimeRemaining(endtime) {
  const total = Date.parse(endtime) - Date.parse(new Date());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  
  return {
    total,
    days,
    hours,
    minutes,
    seconds
  };
}

function initializeClock(id, endtime) {
  const clock = document.getElementById(id);
  const daysSpan = clock.querySelector('.days');
  const hoursSpan = clock.querySelector('.hours');
  const minutesSpan = clock.querySelector('.minutes');
  const secondsSpan = clock.querySelector('.seconds');

  function updateClock() {
    const t = getTimeRemaining(endtime);

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  const timeinterval = setInterval(updateClock, 1000);
}

const deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000);
initializeClock('clockdiv', deadline);

$(window).on("resize", function () {
    var window = $(this);

    if(window.width() <= 768) {
        $teamSection.hide();
        $teamSlider.show();
        $footerEmail.text("hello@stay.io");
        $firstFooterList.hide();
        $subscribeButton.text("").html("<img src=\"http://www.cywinski.pro/ethwork/assets/icon/Subscribe@1x.svg\" />");
        $copywriters.show();

    } else {
        $teamSection.show();
        $teamSlider.hide();
        $footerEmail.text("have@nicecoding.io");
        $firstFooterList.show();
        $subscribeButton.text("Subscribe");
        $copywriters.hide();
    }
});
