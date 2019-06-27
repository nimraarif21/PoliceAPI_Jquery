
forces=[]

$(document).ready(function(){
    $('body').on('click', '.parent-row', function(event){
        $(this).next().toggleClass('show')
    });


    // $('parent-row').click(function(event){
    //     event.target
    //     $(this).next().toggleClass('show')
    // });
});


$(function(){
    All_Forces();
    forces=$.parseJSON(localStorage.getItem('forces'))
    $('#container').append(
        '<h1>UK POLICE STATS</h1>'
    )
    $('#myList').append(
        '<thead><tr><th>Police Name</th><th>Police ID</th></tr></thead>' + 
        '<tbody></tbody>'
    )
    $.each(
        forces,
        function(i,value){
            force_id=forces[i]['id'];
            force_name=forces[i]["name"]
            Specific_Force(force_id);
            Show_Force(force_id,force_name,i);
            Senior_Officers(force_id);
            ShowSeniorOfficers(force_id,force_name)
        }
        )
})

function All_Forces(){
    if('forces' in localStorage){
        var local_all_forces = $.parseJSON(localStorage.getItem('forces'))
        return local_all_forces
    }
    else {
        $.ajax({
            type: 'GET',
            url: 'https://data.police.uk/api/forces',
            success: function(data){
                local_all_forces = data
                localStorage.setItem('forces', JSON.stringify((data)))
               return local_all_forces
            }
        })
    }

}

function Specific_Force(PoliceID){
    if(PoliceID in localStorage){
        specific_force = $.parseJSON(localStorage.getItem(PoliceID))
        return specific_force
    }
    else {
        $.ajax({
            type: 'GET',
            url: 'https://data.police.uk/api/forces'+PoliceID,
            success: function(data){
                specific_force = data
                localStorage.setItem(PoliceID, JSON.stringify((data)))
                return specific_force
            }
        })
    }
}

function Senior_Officers(PoliceID){
    if(PoliceID+'/people' in localStorage){
        return $.parseJSON(localStorage.getItem(PoliceID+'/people'))
    }
    else {
        $.ajax({
            type: 'GET',
            url: 'https://data.police.uk/api/forces'+PoliceID+'/people',
            success: function(data){
                senior_officers = data
                localStorage.setItem(PoliceID+'/people', JSON.stringify((data)))
                return senior_officers;
            }
        })
    }
}



function Show_Force(Pid,name,id){

        $('#myList').append(
            '<tr class="parent-row"></div>");><td>' 
            + name + '</td> <td>' + Pid + '</td></tr>'
        )
    
        ShowSpecificForce(Pid,id)

    $(document).ready( function () {
        $('#myList').DataTable();
    } );

    
}

function ShowSeniorOfficers(PoliceID, PoliceName)
{ 
    data = $.parseJSON(localStorage.getItem(PoliceID+'/people'))
    $('#myList2').append('<h3>Details of Senior Officers of '+PoliceName+'</h3>')
    $('#myList2').append(
        '<thead><tr><th>Senior Officer Name</th><th>Rank</th></tr></thead>' + 
        '<tbody></tbody>'
    )
    $.each(data, function(id, list){
        $('#myList2 tbody').append(
            '<tr><td>' + list['name'] + '</td> <td>' + list['rank'] + '</td></tr>'
        )
    })
    $(document).ready( function () {
        $('#myList2').DataTable();
    } );
    
    
}


function ShowSpecificForce(PoliceID,id){

    specific_force = $.parseJSON(localStorage.getItem(PoliceID))
  
    $('#myList').append(
        '<tr id='+id+' class="collapse"> <td colspan="6" class="hiddenRow"><div><h2>URL :</h2><p>'+specific_force["url"]+'</p><h2>TELEPHONE :</h2><p>'+specific_force["telephone"]+'</p><h2>DESCRIPTION : </h2><p>'+specific_force["description"]+'</p></div></td></tr>');
     
    if (specific_force["description"!=null])
    {
        $('#myList').append(
            '<tr id='+id+' class="collapse"> <td colspan="6" class="hiddenRow"><div><h2>URL :</h2><p>'+specific_force["url"]+'</p><h2>TELEPHONE :</h2><p>'+specific_force["telephone"]+'</p><h2>DESCRIPTION : </h2><p>'+specific_force["description"]+'</p></div></td></tr>');
         
    }
    else
    {
        $('#myList').append(
            '<tr id='+id+' class="collapse"> <td colspan="6" class="hiddenRow"><div><h2>URL :</h2><p>'+specific_force["url"]+'</p><h2>TELEPHONE :</h><p>'+specific_force["telephone"]+'</p></div></td></tr>');
         
    }
    $(document).ready( function () {
        $('#myList1').DataTable();
    } );
    

}

  
