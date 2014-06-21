/*var rightSection1CellSelectedIndex = -1;
var rightSection2CellSelectedIndex = -1;
var originalRightSection2CellSelectedIndex = -1;
var currPageNumber = -1;
var toPageNumber = -1;
var pptIndexArray = [
    [9, 15, 19, 27],
    [6, 8, 10, 21],
    [2, 6, 10, 21]
];

$(document).on("pageinit", "#index",function () {
    $('.rightSectionCell').each(function (index) {
        $(this).css({'background-image': 'url(images/rightSectionCell_' + index + '.png)'}).click(function () {
            rightSection1CellSelectedIndex = index;
            rightSection2CellSelectedIndex = -1;
            originalRightSection2CellSelectedIndex = -1;
            $.mobile.changePage("index2.html", {transition: "slide"});
        });
    });
}).on('pageshow', "#index",function () {
        $('#dancers').show('scale', 600);
        $('#shadow').fadeIn(600);
        $('#index_rightTitle').show('drop', {direction: 'up'}, 200, function () {
            $('.rightSectionCell').eq(0).show('drop', {direction: 'up'}, 200, function () {
                $('.rightSectionCell').eq(1).show('drop', {direction: 'up'}, 200, function () {
                    $('.rightSectionCell').eq(2).show('drop', {direction: 'up'}, 200);
                });
            });
        });
    }).on('pagehide', "#index", function () {

    });

$(document).on("pageinit", "#index2",function () {
    var index2_rightCell_Selector = $(this).find('.index2_rightSectionCell');
    $('#index2_backButton').click(function () {
        $.mobile.changePage("index.html", {transition: "slide", reverse: true});
    });
    $('#index2_rightTitle').css({'background-image': 'url(images/index2_rightTitle_' + rightSection1CellSelectedIndex + '.png)'});
    if (rightSection2CellSelectedIndex != -1) {
        index2_rightCell_Selector.eq(rightSection2CellSelectedIndex).children('.index2_rightSectionCell_checkBox').css({'background-image': 'url(images/index2_checkbox_checked.png)'});
    }
    index2_rightCell_Selector.each(function (index) {
        $(this).children('.index2_rightSectionCell_title').css({'background-image': 'url(images/index2_rightSectionCellTitle_' + rightSection1CellSelectedIndex + '_' + index + '.png)'});
    }).click(function () {
            if (rightSection2CellSelectedIndex != -1) {
                index2_rightCell_Selector.eq(rightSection2CellSelectedIndex).children('.index2_rightSectionCell_checkBox').css({'background-image': 'url(images/index2_checkbox_unchecked.png)'});
            }
            $(this).children('.index2_rightSectionCell_checkBox').css({'background-image': 'url(images/index2_checkbox_checked.png)'});
            rightSection2CellSelectedIndex = index2_rightCell_Selector.index(this);
            $.mobile.changePage("index3.html", {transition: "slide", reloadPage: true});
        });
}).on('pageshow', "#index2", function () {
        if (rightSection2CellSelectedIndex == -1) {
            $('#index2_rightTitle').show('drop', {direction: 'up'}, 200, function () {
                $('.index2_rightSectionCell').eq(0).show('drop', {direction: 'up'}, 200, function () {
                    $('.index2_rightSectionCell').eq(1).show('drop', {direction: 'up'}, 200, function () {
                        $('.index2_rightSectionCell').eq(2).show('drop', {direction: 'up'}, 200, function () {
                            $('.index2_rightSectionCell').eq(3).show('drop', {direction: 'up'}, 200);
                        });
                    });
                });
            });
        } else {
            $('#index2_rightTitle').show();
            $('.index2_rightSectionCell').show();
        }
    });

$(document).on("pageinit", "#index3",function () {
    var navigationBarSelector = $('#navigationBar');
    navigationBarSelector.children('#barBackButton').click(function () {
        $.mobile.changePage("index2.html", {transition: "slide", reverse: true});
    });
    navigationBarSelector.css({'background-image': 'url(images/batTitle_bg_' + rightSection1CellSelectedIndex + '.png)'}).children('.barTitle').each(function (index) {
        $(this).click(function () {
            navigationBarSelector.children('.barTitle').eq(rightSection2CellSelectedIndex).css({'background-image': 'url(images/barTitle_' + rightSection1CellSelectedIndex + '_' + rightSection2CellSelectedIndex + '_unselected.png)'});
            $(this).css({'background-image': 'url(images/barTitle_' + rightSection1CellSelectedIndex + '_' + index + '_selected.png)'});
            rightSection2CellSelectedIndex = index;
            toPageNumber = (rightSection2CellSelectedIndex == 0 ? 1 : pptIndexArray[rightSection1CellSelectedIndex][rightSection2CellSelectedIndex - 1] + 1);
            $('#mainContent').refreshContent();
        });
    });
    navigationBarSelector.refreshBarTitles();
    toPageNumber = (rightSection2CellSelectedIndex == 0 ? 1 : pptIndexArray[rightSection1CellSelectedIndex][rightSection2CellSelectedIndex - 1] + 1);
    $('#mainContent').on('swipeleft',function () {
        if (toPageNumber < pptIndexArray[rightSection1CellSelectedIndex][3]) {
            toPageNumber++;
        }
        $(this).refreshContent();
        for (var i = 0; i < 4; i++) {
            if (toPageNumber <= pptIndexArray[rightSection1CellSelectedIndex][i]) {
                rightSection2CellSelectedIndex = i;
                break;
            }
        }
        navigationBarSelector.refreshBarTitles();
    }).on('swiperight',function () {
            if (toPageNumber > 1) {
                toPageNumber--;
            }
            $(this).refreshContent();
            for (var i = 0; i < 4; i++) {
                if (toPageNumber <= pptIndexArray[rightSection1CellSelectedIndex][i]) {
                    rightSection2CellSelectedIndex = i;
                    break;
                }
            }
            navigationBarSelector.refreshBarTitles();
        }).refreshContent();
}).on('pageshow', "#index3", function () {

    });

$.fn.refreshBarTitles = function () {
    if (originalRightSection2CellSelectedIndex == rightSection2CellSelectedIndex) return;
    this.children('.barTitle').css({'background-image': 'url(images/barTitle_' + rightSection1CellSelectedIndex + '_' + index + '_unselected.png)'});
    this.children('.barTitle').eq(rightSection2CellSelectedIndex).css({'background-image': 'url(images/barTitle_' + rightSection1CellSelectedIndex + '_' + index + '_selected.png)'});
    this.children('.barTitle').each(function (index) {
        if (index == rightSection2CellSelectedIndex) {
            $(this).css({'background-image': 'url(images/barTitle_' + rightSection1CellSelectedIndex + '_' + index + '_selected.png)'});
        } else {
            $(this).css({'background-image': 'url(images/barTitle_' + rightSection1CellSelectedIndex + '_' + index + '_unselected.png)'});
        }
    });
    originalRightSection2CellSelectedIndex = rightSection2CellSelectedIndex;
};

$.fn.refreshContent = function () {
    if (this.is(":animated")) {
        this.stop();
    }
    var fromDiv = $('#mainContentAnimationFrom');
    var toDiv = $('#mainContentAnimationTo');
    this.css({'background-image': 'url(images/ppt' + rightSection1CellSelectedIndex + '/' + toPageNumber + '.png)'});
    if (toPageNumber > currPageNumber) { //left
        fromDiv.show().css({left: '1024px', 'background-image': 'url(images/ppt' + rightSection1CellSelectedIndex + '/' + toPageNumber + '.png)'}).animate({left: '0px'}, function () {
            $(this).hide();
        });
        toDiv.show().css({left: '0px', 'background-image': 'url(images/ppt' + rightSection1CellSelectedIndex + '/' + currPageNumber + '.png)'}).animate({left: '-1024px'}, function () {
            $(this).hide();
        });
    } else if (toPageNumber < currPageNumber) { //right
        fromDiv.show().css({left: '-1024px', 'background-image': 'url(images/ppt' + rightSection1CellSelectedIndex + '/' + toPageNumber + '.png)'}).animate({left: '0px'}, function () {
            $(this).hide();
        });
        toDiv.show().css({left: '0px', 'background-image': 'url(images/ppt' + rightSection1CellSelectedIndex + '/' + currPageNumber + '.png)'}).animate({left: '1024px'}, function () {
            $(this).hide();
        });
    } else {
        //nothing
    }
    currPageNumber = toPageNumber;
};*/

/*
 $(document).on("pageinit", "#keyPoint",function () {

 }).on('pageshow', "#keyPoint",function () {

 }).on('pagehide', "#keyPoint", function () {

 });
 */