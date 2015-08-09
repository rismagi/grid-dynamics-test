+function ($) {
    'use strict';

    /* Item */
    var getItemCard = function(item) {
        if (item.name && item.id) {
            var outerDiv = $('<div></div>')
                .addClass('col-md-2')
                .addClass('col-sm-5')
                .addClass('list-item')
                .data('item', item);
            var div = $('<div></div>').addClass('thumbnail');
            outerDiv.append(div);
            var img = $('<img/>')
                    .attr('alt', item.name)
                    .attr('width', 140)
                    .attr('height', 140)
                ;
            if (item.picture_small) {
                img.attr('src', '/img/' + item.picture_small);
            } else {
                img.attr('src', 'data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==');
                img.addClass('img-circle')
            }
            div.append($('<a></a>').addClass('show-card').append(img));
            div.append($('<h4></h4>').text(item.name));
            if (item.description) {
                div.append($('<p></p>').html(item.description));
            }
            var button = $('<a></a>')
                .addClass('btn')
                .addClass('btn-default')
                .addClass('show-card')
                .attr('href', '#')
                .html('Подробнее &raquo;');
            div.append($('<p></p>').append(button));
            return outerDiv;
        }
        return null;
    };

    var itemContainer = $('#items-container');
    itemContainer.on('click', 'a.show-card', function(e) {
        $('#itemModal').modal('toggle', $(this));
        return e.preventDefault();
    });

    /* Item card */
    $("#itemModal").on('show.bs.modal', function(e) {
        var modal = $(this);
        if (e.relatedTarget) {
            var button = $(e.relatedTarget);
            var item = button.parents('.list-item');
            if (item.length > 0) {
                var data = item.data('item');
                if (data) {
                    if (data.name) {
                        modal.find('.modal-title').text(data.name);
                    }
                    if (data.description_full) {
                        modal.find('.item-description').html(data.description_full);
                    }
                    if (data.picture) {
                        modal.find('img.img-thumbnail').show().attr('src', '/img/' + data.picture);
                    } else {
                        modal.find('img.img-thumbnail').hide();
                    }
                }
            }
        }
    });
    $('#itemModal').on('dblclick', function(e) {
        $(this).modal('hide');
    });

    /* Load item list */
    $.ajax({
        method: "GET",
        url: "/data/items.json",
        dataType: "json",
        beforeSend: function() {
            $('#items-loader-icon').show();
            itemContainer.empty();
        },
        complete: function() {
            $('#items-loader-icon').hide();
        },
        success: function(data) {
            if (data) {
                var row;
                var count = 1;
                $.each(data, function(i, item) {
                    if (!row || count > 5) {
                        row = $('<div></div>').addClass('row');
                        itemContainer.append(row);
                        count = 1;
                    }
                    var card = getItemCard(item);
                    if (card) {
                        row.append(card);
                        count++;
                    }
                });
            }
        },
        error: function() {
            itemContainer.append(
                $('<div></div>')
                    .addClass('alert')
                    .addClass('alert-danger')
                    .attr('role', 'alert')
                    .text(' Ошибка загрузки данных')
                    .prepend(
                        $('<span></span>')
                            .addClass('glyphicon')
                            .addClass('glyphicon-exclamation-sign')
                            .attr('aria-hidden', 'true')
                    )
            );
        }
    });
}(jQuery);
