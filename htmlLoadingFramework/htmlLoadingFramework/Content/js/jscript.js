var idtype = -1;
var currentQuestion = 0;
var answerNumberArray = [
    [2, 2, 2, 2, 2, 3],
    [2, 3, 4, 3, 3, 4]
];
var doctorSaleMapping = [
    [0, 1],
    [0, 0, 1],
    [1, 1, 1, 0],
    [0, 0, 1],
    [0, 1, 1]
];
var pathArray = ['111', '1101', '1100', '10', '011', '0101', '0100', '00-1-110', '00-1-111', '00-1-112', '00-1-10'];
var answerSelectedArray;
var doctorAnswerMapping;

var path;

var kmbgArray = [2, 2, 2, 2, 2, 2, 3, 2, 1, 1, 1];

var keyMessage;

$(document).on('pageinit', '#index',function () {
    $('#sales_button').click(function () {
        idtype = 0;
        answerSelectedArray = [-1, -1, -1, -1, -1, -1];
        /*$.mobile.changePage('questionnaire.html', {transition: 'slide'});*/
        $.mobile.changePage('keyMessage.html', {transition: 'slide'});
    });
    $('#doctor_button').click(function () {
        idtype = 1;
        answerSelectedArray = [-1, -1, -1, -1, -1, [false, false, false, false]];
        doctorAnswerMapping = [-1, -1, -1, -1, -1, -1];

        /*$.mobile.changePage('questionnaire.html', {transition: 'slide'});*/
        $.mobile.changePage('keyMessage.html', {transition: 'slide'});
    });
    currentQuestion = 0;
    path = -1;
    keyMessage = -1;
});

$(document).on('pageinit', '#questionnaire',function () {
    $('#back_to_index').click(function () {
        $.mobile.changePage('index.html', {transition: 'slide', reverse: true});
    });

    bindAction($('#main_content1'));
    bindAction($('#main_content2'));

    $('#next').click(function () {
        switchLeftOrRight('left');
    });

    switchLeftOrRight('init');

    $('#photo').css({'background-image': 'url(images/p0.png)'});
});

function bindAction(selector) {
    selector.on('swipeleft',function () {
        switchLeftOrRight('left');
    }).children('.question_answer_content').children().each(function (index) {
            $(this).click(function () {
                if (currentQuestion == 5 && idtype == 1) {
                    var ifCheckboxSelected = answerSelectedArray[currentQuestion][index];
                    answerSelectedArray[currentQuestion][index] = !ifCheckboxSelected;
                    if (!ifCheckboxSelected) {
                        $(this).children('.question_answer_checkbox').css({'background-image': 'url(images/checkbox_checked.png)'});
                    } else {
                        $(this).children('.question_answer_checkbox').css({'background-image': 'url(images/checkbox_uncheck.png)'});
                    }
                    var isSelectedAll = true;
                    for (var i = 0; i < answerSelectedArray[currentQuestion].length; i++) {
                        if (!answerSelectedArray[currentQuestion][i]) {
                            isSelectedAll = false;
                            break;
                        }
                    }
                    if (isSelectedAll) {
                        doctorAnswerMapping[currentQuestion] =  answerSelectedArray[currentQuestion - 1];
                    } else {
                        doctorAnswerMapping[currentQuestion] = 0;
                    }
                } else {
                    selector.children('.question_answer_content').find('.question_answer_checkbox').css({'background-image': 'url(images/checkbox_uncheck.png)'});
                    $(this).children('.question_answer_checkbox').css({'background-image': 'url(images/checkbox_checked.png)'});
                    answerSelectedArray[currentQuestion] = index;
                    if (idtype == 1) {
                        doctorAnswerMapping[currentQuestion] = doctorSaleMapping[currentQuestion][index];
                    }
                }
            });
        });
}

function switchLeftOrRight(direction) {
    var fromSelector;
    var toSelector;
    var fromDirection;
    var toDirection;
    if (direction == 'left') {
        fromDirection = 'left';
        toDirection = 'right';

        if (currentQuestion != 5 && answerSelectedArray[currentQuestion] == -1) {
            alert('请先选择答案！');
            return;
        }
        if (currentQuestion == 5) {
            if (idtype == 0) {
                if (answerSelectedArray[currentQuestion] == -1) {
                    alert('请先选择答案！');
                    return;
                }
            } else {
                var hasSelected = false;
                for (var i = 0; i < 4; i++) {
                    if (answerSelectedArray[currentQuestion][i] == true) {
                        hasSelected = true;
                        break;
                    }
                }
                if (!hasSelected) {
                    alert('请先选择答案！');
                    return;
                }
            }
        }
        //调整下一次数据
        var answerString = '';

        for (var j = 0; j < 6; j++) {
            if (idtype == 0) {
                answerString += answerSelectedArray[j];
            } else {
                answerString += doctorAnswerMapping[j];
            }
        }
        for (var k = 0; k < pathArray.length; k++) {
            if (answerString.indexOf(pathArray[k]) == 0) {
                path = k;
                $.mobile.changePage('showPath.html', {transition: 'slide'});
                return;
            }
        }
        if (answerString == '00-1-1-1-1') {
            currentQuestion += 3;
        } else {
            currentQuestion ++;
        }

    } else if (direction == 'right') {
        fromDirection = 'right';
        toDirection = 'left';
        if (currentQuestion == 0) {
            alert('已经是第一题了');
            return;
        }
        currentQuestion --;
    } else {
        //init
    }

    var answerNumber = answerNumberArray[idtype][currentQuestion];
    if (currentQuestion % 2 == 0) {
        fromSelector = $('#main_content2');
        toSelector = $('#main_content1');
    } else {
        fromSelector = $('#main_content1');
        toSelector = $('#main_content2');
    }
    toSelector.children('.question_answer_content').children().each(function (index) {
        $(this).removeClass('question_answer_bg');
        $(this).removeClass('question_answer_bg_last');
        var checkboxSelector = $(this).children('.question_answer_checkbox');
        if (currentQuestion == 5 && idtype == 1) {
            if (answerSelectedArray[currentQuestion][index]) {
                checkboxSelector.css({'background-image': 'url(images/checkbox_checked.png)'});
            } else {
                checkboxSelector.css({'background-image': 'url(images/checkbox_uncheck.png)'});
            }
        } else {
            if (index == answerSelectedArray[currentQuestion]) {
                checkboxSelector.css({'background-image': 'url(images/checkbox_checked.png)'});
            } else {
                checkboxSelector.css({'background-image': 'url(images/checkbox_uncheck.png)'});
            }
        }
        if (index < answerNumber) {
            var answerClass;
            if (index == answerNumber - 1) {
                answerClass = 'question_answer_bg_last';
            } else {
                answerClass = 'question_answer_bg';
            }
            $(this).addClass(answerClass);
            $(this).show().children('.question_answer').css({'background-image': 'url(images/question_answer_' + idtype + '_' + currentQuestion + '_' + index + '.png)'});
        } else {
            $(this).hide();
        }
    });
    toSelector.find('.question_title').css({'background-image': 'url(images/question_title_' + idtype + '_' + currentQuestion + '.png)'});
    if (direction != 'init') {
        fromSelector.hide( 'drop', { direction: fromDirection });
        toSelector.show( 'drop', { direction: toDirection });
        if (idtype == 1) {
            $('#photo').hide('fade', function () {
                $(this).css({'background-image': 'url(images/p' + currentQuestion + '.png)'}).show('fade');
            });
        }
    }
}

$(document).on('pageinit', '#showPath',function () {
    var showPathBGSelector = $('#showPath_bg');
    if (idtype == 0) {
        showPathBGSelector.css({'background-image': 'url(images/showPath_sale_'+ path +'.png)'});
    } else {
        showPathBGSelector.css({'background-image': 'url(images/showPath_doctor.png)'});
    }
    showPathBGSelector.on('swipeleft',function () {
        $.mobile.changePage('keyMessage.html', {transition: 'slide'});
    });
});

$(document).on('pageinit', '#keyMessage',function () {
    path = 6;
    $('#keyMessage_bg').css({'background-image': 'url(images/kmbg'+ kmbgArray[path] +'.png)'});

    for (var i = 1; i < 4; i++) {
        $('#message'+ i).addClass('message'+i+'_km'+ kmbgArray[path]).css({'background-image': 'url(images/message'+ i +'_' + path + '_unselected.png)'}).on('click', {forIndex: i}, function (param) {
            $(this).css({'background-image': 'url(images/message'+ param.data.forIndex +'_' + path + '_selected.png)'});
            for (var i = 1; i < 4; i++) {
                if (i != param.data.forIndex) {
                    $('#message'+ i).css({'background-image': 'url(images/message'+ i +'_' + path + '_unselected.png)'});
                }
            }
            keyMessage = param.data.forIndex;
        });
    }
});
