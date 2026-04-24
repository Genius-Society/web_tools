function clipbd(res) {
    navigator.clipboard.writeText(res)
        .then(() => {
            console.log('文件类型: ' + res.substr(5, res.indexOf(';') - 5));
            alert('内容已成功复制到剪贴板！');
        })
        .catch(err => {
            console.error('无法复制文本: ', err);
            alert('复制失败: [' + err + ']');
        });
}

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

function toBase64() {
    let fileInput = document.getElementById('fileInput');
    fileInput.onchange = function () {
        if (this.files.length <= 0) return;

        if (this.files[0].size > 5242880) {
            console.log('文件大小大于 5M');
            alert('您选择的文件太大了！');
            return;
        }

        let file = this.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () { clipbd(reader.result); };
    };
}

function countWords(text) {
    const words = text.match(/(\b[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*\b)|[a-zA-Z0-9]+/g) || [];
    return words.length;
}

$(function () {
    toBase64();

    $('#gen').click(function () {
        $('#md5').val(hex_md5($('#plain').val()));
    });
    $('#cp').click(function () {
        clipbd($('#md5').val());
    });

    $('textarea').bind('input propertychange', function () {
        $('#len').text($(this).val().length);
        $('#words').text(countWords($(this).val()));
    });
    $('text').click(function () {
        clipbd($(this).text());
    });

    document.getElementById("defaultOpen").click();
});
