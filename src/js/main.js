import '../sass/main.sass';
import axios from 'axios';

var ind = 3;

$('.phone').on('focus click', function() {
    $(this)[0].setSelectionRange(ind, ind);
  })

String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
  }

$('.phone').on('keydown', (e) => {
    $('.error-container').addClass('hidden-display');
    $('.contact').removeClass('hidden-display');
    $('.phone').removeClass('not-full');
    $('.phone').removeClass('filled');
    
    // Если введено не число и не backspace, то ничего не делать
    // Если длина номера 3 символа (то есть '+7 ') и нажат backspace, то ничего не делать
    if ((e.key.match(/\D/) != null && e.keyCode != 8) || ($('.phone').val().length == 3 && e.keyCode == 8))
        return false;
    
    if (e.keyCode != 8) {
        if (ind == 6 || ind == 10) {
            setChar({
                char: ' ', 
                mode: '+'
            });    
        }

        setChar({
            char: e.key, 
            mode: '+'
        });
     
    } else {
        setChar({
            mode: '-'
        });
    }
    
    if (ind == 15) {
        $('.phone').addClass('filled');
    }

    // Не добавлять ничего в строку, потому что мы заменяем '_' на введенный символ
    return false;
});

function setChar(pars) {
    if ((ind == 15 && pars.mode == '+') || (ind == 3 && pars.mode == '-'))
        return;

    let str = $('.phone').val();

    if (pars.mode == '-') {
        ind--;
        str = str.replaceAt(ind, '_')
        if (ind == 7 || ind == 11) {
            ind--;
            str = str.replaceAt(ind, ' ')
        }
    } else {
        str = str.replaceAt(ind, pars.char)
        ind++;
    }

    $('.phone').val(str);
    $('.phone')[0].setSelectionRange(ind, ind);
}

$(document).ready(() => {
    $('.phone').val('+7 ___ ___ ____');
});

$('.phone').on('focus', () => {
    $('.form p').addClass('hidden');
});

$('.phone').on('focusout', () => {
    $('.form p').removeClass('hidden');
});

$('#cam-more-1').on('click', () => {
    $('#cam1').addClass('backward');
    $('#pop-up-1').addClass('show');
});

$('#pop-up-1 .pop-up-close').on('click', () => {
    $('#cam1').removeClass('backward');
    $('#pop-up-1').removeClass('show');
});

$('#cam-more-2').on('click', () => {
    $('#cam2').addClass('backward');
    $('#pop-up-2').addClass('show');
});

$('#pop-up-2 .pop-up-close').on('click', () => {
    $('#cam2').removeClass('backward');
    $('#pop-up-2').removeClass('show');
});

$('#send-button').on('click', () => {
    if ($('.phone').val().replace(/[_]/g, '').length < 15) {
        $('.phone').addClass('not-full');
        $('.error-container').removeClass('hidden-display');
        $('.contact').addClass('hidden-display');
        return;
    }
    axios.get('https://api.myjson.com/bins/jzrtd')
        .then(response => {
            if (response.data.res == 'ok') {
                $('.form').addClass('hidden-display');
                $('.form-sended').removeClass('hidden-display');
            }
        });
});

$('.button-sended').on('click', () => {
    $('.form').removeClass('hidden-display');
    $('.form-sended').addClass('hidden-display');
    $('.phone').val('+7 ___ ___ ____');
    ind = 3;
});

$('.arrow-down').on('click', () => {
    var slides = $('.slide');
    var focusIndex = 0;
    for (let i = 0; i < slides.length; i++) {
        if ($(slides[i]).hasClass('hidden-slide')) {
            focusIndex = i + 1;
            $(slides[i]).removeClass('hidden-slide');
        }
        if (focusIndex > 1)
            focusIndex = 0;
    }
    focusIndex++;
    $('#slide-' + focusIndex).addClass('hidden-slide');
});