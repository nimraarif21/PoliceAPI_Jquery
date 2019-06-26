
forces=[]

$(function(){
    All_Forces();
    forces=$.parseJSON(localStorage.getItem('forces'))
    $.each(
        forces,
        function(i,value){
            force_id=forces[i]['id'];
            Senior_Officers(force_id);
            Specific_Force(force_id);

        }
        )
})

function All_Forces(){
    if('forces' in localStorage){
        var local_all_forces = $.parseJSON(localStorage.getItem('forces'))
        ShowAllForces(local_all_forces)
    }
    else {
        $.ajax({
            type: 'GET',
            url: 'https://data.police.uk/api/forces',
            success: function(data){
                local_all_forces = data
                localStorage.setItem('forces', JSON.stringify((data)))
                ShowAllForces(local_all_forces)
            }
        })
    }
}

function Specific_Force(PoliceID){
    if(PoliceID in localStorage){
        specific_force = $.parseJSON(localStorage.getItem(PoliceID))
        ShowSpecificForce(PoliceID,specific_force)
    }
    else {
        $.ajax({
            type: 'GET',
            url: 'https://data.police.uk/api/forces'+PoliceID,
            success: function(data){
                specific_force = data
                localStorage.setItem(PoliceID, JSON.stringify((data)))
                ShowSpecificForce(PoliceID,specific_force)
            }
        })
    }
}

function Senior_Officers(PoliceID){
    if(PoliceID+'/people' in localStorage){
        senior_officers = $.parseJSON(localStorage.getItem(PoliceID+'/people'))
        ShowSeniorOfficers(PoliceID,senior_officers)
    }
    else {
        $.ajax({
            type: 'GET',

            url: 'https://data.police.uk/api/forces'+PoliceID+'/people',
            success: function(data){
                senior_officers = data
                localStorage.setItem(PoliceID+'/people', JSON.stringify((data)))
                ShowSeniorOfficers(PoliceID,senior_officers)
            }
        })
    }
}



function ShowAllForces(data){
    $.each(
        data,
        function(i, list){
            forces.push(data[i]['id'])
        }
    )

    $('#myList').append(
        '<thead><tr><th>Police Name</th><th>Police ID</th></tr></thead>' + 
        '<tbody></tbody>'
    )
    $.each(data, function(id, list){
        $('#myList tbody').append(
            '<tr><td>' + list['name'] + '</td> <td>' + list['id'] + '</td></tr>'
        )
    })
    $(document).ready( function () {
        $('#myList').DataTable();
    } );

    
}

function ShowSeniorOfficers(PoliceID, data)
{ 

    $('#myList2').append(
        '<thead><h1>'+PoliceID+'/<h1><tr><th>SeniorOfficerName</th><th>Bio</th><th>Rank</th></tr></thead>' + 
        '<tbody></tbody>'
    )
    $.each(data, function(id, list){
        $('#myList2 tbody').append(
            '<tr><td>' + list['name'] + '</td> <td>' + list['bio'] + '</td> <td>' + list['rank'] + '</td></tr>'
        )
    })
    $(document).ready( function () {
        $('#myList2').DataTable();
    } );
    
    
}


function ShowSpecificForce(PoliceID,data){

    $('#myList1').append(
        '<thead><h1>'+PoliceID+'/<h1><tr><th>NAME</th><th>URL</th><th>DESCRIPTION</th></tr></thead>' + 
        '<tbody></tbody>'
    )
    $('#myList1 tbody').append(
        '<tr><td>' + data['name'] + '</td> <td>' + data['url'] + '</td> <td>' + data['description'] + '</td></tr>'
    )
    $(document).ready( function () {
        $('#myList1').DataTable();
    } );
    

}
