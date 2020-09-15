//#region Init
function countPortions(num) {
    const groups = [];
    $(`#table_add td:nth-child(${num + 3})`).each(function () {
        const i = parseFloat(this.innerText.replace(',', '.'));

        if (groups[i] === undefined)
            groups[i] = 0;
        groups[i]++;
    });
    const strs = [];
    for (let propName in groups) {
        if (groups.hasOwnProperty(propName)) {
            const propValue = groups[propName];
            strs.push(`${propName}:\t${propValue}`);
        }
    }
    const str = strs.join("<br>");
    $("#result" + num).html(str);
    $("#className").html($(".class-info > span:nth-child(2) span").text());
}

function observ(target, onChildList, attrs, children) {
    const targetNode = $(target)[0];
    if (targetNode === undefined)
        return undefined;
    // Options for the observer (which mutations to observe)
    let config = {attributes: attrs, childList: children, subtree: false};

    // Callback function to execute when mutations are observed
    let callback = function (mutationsList) {
        for (let mutation of mutationsList) {
            if (mutation.type === "childList") {
                console.log("A child node has been added or removed.");
                onChildList(mutation);
            } else if (mutation.type === "attributes") {
                console.log(`The ${mutation.attributeName} attribute was modified.`);
                onChildList(mutation);
            }
        }
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);
    return observer;
}

function complexToBtn(complex) {
    const btn = $(`<div class=\"button-design-02 icon_close complex-btn\">${complex.name}</div>`);
    return btn.click(function (e) {
        if (e.ctrlKey == true) {
            console.log(this);
            let menu = data.menuList;
            data.menuList.load(function () {
                let i = menu.indexOf(this);
                menu.splice(i, 1);
                $(e.toElement).remove();
                menu.save();
                updateComplexSelector();
            }.bind(this));
            return;
        } else {
            setComplex(this);
        }
    }.bind(complex));
}

function setComplex(complex) {
    switch (complex.mode) {
        case "set":
            $("input[id*=menu_]").val(0);
            $(complex.set).each(function () {
                $("#" + this.id).val(this.val);
            });
            break;
        case "add":
            $(complex.set).each(function () {
                let input = $("#" + this.id);
                input.val(parseInt(input.val()) + this.val);
            });
            break;
        case "del":
            $(complex.set).each(function () {
                let input = $("#" + this.id);
                input.val(input.val() - this.val);
            });
            break;

        default: {
            console.error("invalid set mode");
            return;
        }
    }
    $("input.update_pupil_btn").click();
}

function updateComplexSelector() {

    if ($("#complexSelector").length == 0) {
        let url = chrome.extension.getURL('Content/components/infoPanel/infoPanel.html');
        let box = $(`<div class="content" id="additionBox"></div>`);
        box.load(url, function () {
            box.insertAfter("#short_info_block");
            $('<select id="complexSelector"></select>')
                .appendTo(box.find(".mods"))
                .change(function () {
                    let val = $("#complexSelector").val();
                    console.log(val);
                    data.currentMenu = val;
                })
                .bind("mousewheel", function (event) {
                    event.preventDefault();
                    if (event.target == document.getElementById("complexSelector")) {
                        event.stopPropagation();
                        let delta = event.originalEvent.wheelDelta;
                        let v = delta / Math.abs(delta);
                        let index = $("#complexSelector option:checked").index() + 1 - v;
                        if (index >= 1 && index <= $(`#complexSelector option`).length) {
                            let newVal = $(`#complexSelector option:nth-child(${index})`).val();
                            $("#complexSelector").val(newVal);
                            data.currentMenu = newVal;
                        }
                    }
                });
        });
    }
    let menu = data.menuList;
    menu.load(function () {
        $("#complexSelector").html('<option value="none">Ничего</option><option value="reset">Сброс</option>');
        for (let complex of menu) {
            $(`<option value="${complex.name}">${complex.name}</option>`).appendTo($("#complexSelector"));
        }
        data.currentMenu.get(function (curm) {
            $("#complexSelector").val(curm);
        });
    });    
}

//#endregion Init
//#region Main
{

    /******** Инициализация *********/
    var keyboard = new Keyboard();

    var data = new DataContext(function () {
        let match = $('caption').text().match(/\d+\.\d+.\d+/);
        if (match == null) {
            console.log("can`t get date right now");
        } else {
            let date = match[0];
            return date;
        }
    });

    window.onbeforeunload = function (evt) {
        data.currentClass = $(".oak__leaf").indexOf(".selected");
        data.currentPage = $(".kvp-menu").indexOf(".selected");
        return null;
    };

    window.onbeforeunload;
    setTimeout(function run() {
        const time = $(".logout-timer")[0].innerText.split(":")[0];
        if (time == "01") {
            window.location.reload();
            return;
        }
        setTimeout(run, 1000);
    }, 1000);

    // переход к странице
    let c = 0;
    let p = 5;

    data.currentClass.get(function (curc) {
        if (curc !== undefined) {
            c = parseInt(curc);
            if (!isNaN(c)) {
                $(`.oak__leaf a`).get(c).click();
                setTimeout(function () {
                    data.currentPage.get(function (curp) {
                        if (curp !== undefined) {
                            p = parseInt(curp);
                            if (!isNaN(p)) {
                                $(`.kvp-menu a`).get(p).click();
                            }
                        }
                    });
                }, 1000);
            }
        }
    });


    // Показать меню и заблокировать клик
    $(".oak__branch").unbind("click").find("ul").show();

    /*
     * Интеграция в диалоговоые окна
     * (реакция на изменения)
     */
    const obs1 = observ(".popup_wrap",
        function (m) {
            if ((/Добавить ученика/).test($(".popup_name").text())) {
                const fill = function () {
                    if (window.List.cur < window.List.length) {
                        $('#surname').val(window.List[window.List.cur][0]);
                        $('#firstname').val(window.List[window.List.cur][1]);
                        $('#patronymic').val(window.List[window.List.cur][2]);
                        $('#birthday').val(window.List[window.List.cur][3].replace(/(\d+).(\d+).(\d+)/, "$3-$2-$1"));
                        window.List.cur++;
                    } else {
                        window.List = undefined;
                    }
                };
                if (window.List == undefined) {
                    $('body').append("<div id='inputBox' class='popup_wrap active'><div class='popup popupIpay'><div class='popup_header'><div class='popup_name'>Вставьте учеников из excel</div></div><div class='popup_content'><textarea style='height:200px'></textarea></div><div class='popup_footer '><div class='button-design-02 icon_close' onclick='$(\"#inputBox\").remove()'>Отменить</div></div></div></div>");
                    $('#inputBox .popup_footer').append($("<input class='button-design-01 update_pupil_btn' value='Выполнить'>").click(function () {
                        let arr = [];
                        let text = $("#inputBox textarea").val();
                        let expr = /([а-яА-Я]+)\t+([а-яА-Я]+)\t+([а-яА-Я]+)\t+([0-9.]+)\n/g;
                        let res;
                        while ((res = expr.exec(text)) !== null) {
                            arr.push([res[1], res[2], res[3], res[4]]);
                        }
                        $("#inputBox").remove();
                        arr.cur = 0;
                        if (arr.length > 0) {
                            window.List = arr;
                        }
                        fill();
                    }));
                } else {
                    fill();
                }
            } else if ((/Редактировать класс/).test($(".popup_name").text())) {
                $('<input type="submit" class="button-design-01" value="Перевести на год">').click(function () {
                    $(".pupilMainInfo #name").val($(".pupilMainInfo #name").val().replace(/\d+/, function (m2) {
                        return ++m2;
                    }));
                    $(".pupilMainInfo #year").val($(".pupilMainInfo #year").val().replace(/\d+/, function (m2) {
                        return ++m2;
                    }));
                    $(".pupilMainInfo #classno").val($(".pupilMainInfo #classno").val().replace(/\d+/, function (m2) {
                        return ++m2;
                    }));
                    console.log("done");
                }).appendTo(".editPupilPopupFooter");
            } else if ((/"Н"/).test($(".popup_name").text())) {
                $("input.update_pupil_btn").click();
            } else if ((/^Ведомость/i).test($("#table caption").text())) {
                if ($(".popup_wrap").hasClass("active") && (/^Выбор/i).test($(".popup_name").text())) {
                    data.currentMenu.get(function (curMenu) {
                        let complex = data.menuList.find(curMenu);
                        if (curMenu == "none" || keyboard.AltLeft) {
                        } else if (curMenu == "reset" || keyboard.ControlLeft) {
                            $("#modal_id .editPupilPopupFooter > *").filter(function () {
                                return (/Сбросить/i).test($(this).text());
                            }).click();
                            $("#modal_id input.update_pupil_btn").click();
                        } else if (keyboard.ShiftLeft && data.menuList[0] !== undefined) {
                            setComplex(data.menuList[0]);
                        } else if (complex !== undefined) {
                            setComplex(complex);
                        }
                    });


                    let menu = data.menuList;
                    menu.load(function () {
                        $("#add_complex").remove();
                        $(".complex-btn").remove();

                        let url = chrome.extension.getURL('Content/components/addBox/addBox.html');
                        $.get(url, function (addBoxHtml) {
                            $(addBoxHtml)
                                .appendTo(".popup_footer")
                                .append($("<div class=\"button-design-02 icon_close\">Добавить меню</div>").click(function () {
                                    const name = $("#modal_id #complex_name").val();
                                    if (name !== "") {
                                        const complex = {
                                            name: name,
                                            mode: $("#modal_id input[name=cmode]:checked").val(),
                                            set: $('#modal_id li input[id*=menu]')
                                                .filter(function () {
                                                    return (parseInt(this.value) > 0);
                                                })
                                                .map(function () {
                                                    return {id: this.id, val: this.value}
                                                })
                                                .toArray()
                                        };
                                        menu.push(complex);
                                        menu.save();
                                        complexToBtn(complex).appendTo("#modal_id .popup_footer");
                                        data.currentMenu = complex.name;
                                        updateComplexSelector();
                                    }
                                }));
                            $($.map(menu, complexToBtn)).each(function () {
                                this.appendTo(".popup_footer")
                            });
                            $("label[for*=complex_] span").click(function () {
                                $("#complex_name").val(this.innerText + " ");
                            });
                            $(".editPupilPopupFooter > *").filter(function () {
                                return (/Сбросить/i).test($(this).text());
                            }).click(function () {
                                $("input.update_pupil_btn").click();
                            });
                        });
                    });
                }
            }
        }, false, true);
    if (obs1 === undefined)
        console.log("err in obs1");
    const obs2 = observ(".page-content .col-75",
        function (m) {
            if ((/^Ведомость/i).test($("#table caption").text())) {
                // управление клавишей alt
                updateComplexSelector();
                for (let i = 1; i <= 3; i++)
                    countPortions(i);
            }
        }, false, true);
    if (obs2 === undefined)
        console.log("err in obs2");
    /******** Конец инициализации **********/
}
//#endregion Main