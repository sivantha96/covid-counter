jQuery(document).ready(function ($) {


    var selectedItems = []
    $('#selections').html( selectedItems.length>0 ?"<b>Selected body Parts: </b>"+ selectedItems : "<b>Please select a body part</b>" );
    var defaultDipTooltip = '<b><u>Spine</u></b>';

    $('#house').mapster({


        
    

        fillOpacity: 0.4,
        fillColor: "d42e16",
        // strokeColor: "3320FF",
        // strokeOpacity: 0.8,
        // strokeWidth: 2,
        // stroke: true,
        isSelectable: true,
        singleSelect: false,
        mapKey: 'name',
        fillOpacity: 0.6,
        fillColor: 'FF0000',

        //
        onMouseover: function (evt) {
            var parts = evt.key.split('-');
            var part = parts[1];
            highlightArea(part);
        },
        
        //
        onMouseout: function (evt) {
            var parts = evt.key.split('-');
            var part = parts[1];
            highlightAreaX(part);
        },

        onClick: function (e) {
            console.log("clicked!!")
            var newToolTip = defaultDipTooltip;
            if($.inArray(e.key,selectedItems) >= 0){
                selectedItems.splice($.inArray(e.key, selectedItems),1);
            }else{
                selectedItems.push(e.key);
            }
            // $('#selections').html( selectedItems.length);
            $('#selections').html( selectedItems.length>0 ?"<b>Selected body Parts: </b>"+ selectedItems.toString().replace(new RegExp('_', 'g')," ").replace(new RegExp(',', 'g'),", ") : "<b>Please select a body part</b>" );

        },
       
    });

        //
        $('a').hover(function () {
            var parts = $(this).closest('li').attr('class').split('-');
            var part = parts[2];
            highlightArea(part);
        });

        //
        $('a').mouseleave(function () {
            var parts = $(this).closest('li').attr('class').split('-');
            var part = parts[2];
            highlightAreaX(part);
        });

});

//
function highlightArea(key) {
    $('area[name=part-' + key + ']').mouseenter();
    $('a').removeClass('hover');
    $('li.menu-item-' + key + ' a').addClass('hover');
}

//
function highlightAreaX(key) {
    $('area[name=part-' + key + ']').mouseout();
    $('li.menu-item-' + key + ' a').removeClass('hover');
}
