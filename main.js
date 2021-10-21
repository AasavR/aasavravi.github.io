
    $(function() {
		var PARSE_APP_ID = "TWvkNXvWKe6GixlxZ44tv8pwacMJMwleMuG2oIT2";
		var PARSE_REST_API_KEY = "vIaiOnNJTeV4ZnqSHrocG4jlCP00iJd24NywZkM9";
		
		loadQuestions();

		function loadQuestions() {
			jQuery.ajax({
				method: "GET",
				headers: {
					"X-Parse-Application-Id": PARSE_APP_ID,
					"X-Parse-REST-API-Key": PARSE_REST_API_KEY 
				},
				url: "https://api.parse.com/1/classes/Question?order=-questionText",
				success: questionsLoaded,
				error: ajaxError
			});
		}
		
		function questionsLoaded(data) {
			for (var q in data.results) {
				var question = data.results[q];
				var questionItem = $('<li>');
				var questionLink = $("<a href='#'>").text(question.questionText);
				$(questionLink).data('question', question);
				questionLink.appendTo(questionItem);
				$(questionLink).click(questionClicked);
				questionItem.appendTo($("#questions"));
			}
		}
		
		function questionClicked() {
			var question = $(this).data('question');
			$("#answers").hide();
			$("#answers h2").text(question.questionText);
			var questionId = question.objectId;
			$.ajax({
				method: "GET",
				headers: {
					"X-Parse-Application-Id": PARSE_APP_ID,
					"X-Parse-REST-API-Key": PARSE_REST_API_KEY 
				},
				url: 'https://api.parse.com/1/classes/Answer?where={"question":{"__type":"Pointer","className":"Question","objectId":"' + questionId + '"}}',
				success: answersLoaded,
				error: ajaxError
			});
		}
		
		function answersLoaded(data) {
			$("#answers ul").html('');
			for (var a in data.results) {
				var answer = data.results[a];
				var answerItem = $('<li>');
				answerItem.text(answer.answerText + 
					' (' + answer.votes + ') ');
				var button = $("<a href='#'>[Vote]</а>");
				button.data('answer', answer);
				button.click(voteButtonClicked);
				button.appendTo(answerItem);
				answerItem.appendTo($("#answers ul"));
			}
			$('#answers').show();
		}
		
		function voteButtonClicked() {
			var answer = $(this).data('answer');
			$.ajax({
				method: "PUT",
				headers: {
					"X-Parse-Application-Id": PARSE_APP_ID,
					"X-Parse-REST-API-Key": PARSE_REST_API_KEY 
				},
				url: 'https://api.parse.com/1/classes/Answer/' + 
					answer.objectId,
				data: JSON.stringify(
					{"votes": answer.votes + 1}
				),
				contentType: "application/json",
				success: votedSuccessfully,
				error: ajaxError
			});
		}
		
		function votedSuccessfully() {
			noty({
				text: 'Thanks for voting', 
				layout: 'topCenter',
				timeout: 2000}
			);
			
		}
		
		function ajaxError() {
			noty({
				text: 'Cannot load AJAX data.', 
				type: 'error',
				layout: 'topCenter',
				timeout: 5000}
			);
		}
	});


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

const deadline = new Date(Date.parse(new Date()) + 3 * 24 * 60 * 60 * 1000);
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
