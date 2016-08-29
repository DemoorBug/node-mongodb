$(function(){
    $('.comment').click(function(e){
        var target = $(this);
        var toId = target.data('tid');
        var comment = target.data('cid');
        if($('#toId').length > 0) {
            $('#toId').val(toId)
        }
        else {
            $('<input>').attr({
                type: 'hidden',
                id: 'toId',
                name: 'comment[tid]',
                value: toId
            }).appendTo($('#commentForm'))
        }

        if($('#commentId').length > 0) {
            $('#commentId').val(comment)
        }
        else {
        $('<input>').attr({
            type: 'hidden',
            id: 'commentId',
            name: 'comment[cid]',
            value: comment
        }).appendTo($('#commentForm'))
        }
    })
})
